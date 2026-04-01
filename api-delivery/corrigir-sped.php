

<?php
$arquivoOriginal = "SPED000012026020128.TXT";
$arquivoNovo     = "_SPED000012026020128CORRIGIDO.TXT";
$novoValorInventario = 2478525.63;

$linhas = file($arquivoOriginal);
$h005Index = null;
$h010Indices = [];
$totalAtual = 0.0;

/* 1. Localizar H005 e H010 */
foreach ($linhas as $i => $linha) {
    $linhaTrim = trim($linha);
    
    if (strpos($linhaTrim, '|H005|') === 0) {
        $h005Index = $i;
        echo "Encontrado H005 na linha $i\n";
    }

    if (strpos($linhaTrim, '|H010|') === 0) {
        $partes = explode('|', $linhaTrim);
        
        // Verificar se tem campos suficientes (mínimo 12 campos)
        if (count($partes) >= 12) {
            // Índices corretos baseado no seu diagnóstico
            $qtdeStr = isset($partes[4]) ? $partes[4] : '0';      // Campo 4 = Quantidade
            $vlTotalStr = isset($partes[6]) ? $partes[6] : '0';   // Campo 6 = Valor total
            
            $qtde = floatval(str_replace(',', '.', $qtdeStr));
            $vlTotal = floatval(str_replace(',', '.', $vlTotalStr));
            
            // Debug das primeiras linhas
            static $debugCount = 0;
            if ($debugCount < 3) {
                echo "Linha H010 $i: Qtde='$qtdeStr' -> $qtde, VlTotal='$vlTotalStr' -> $vlTotal\n";
                $debugCount++;
            }
            
            if ($qtde > 0 && $vlTotal > 0) {
                $totalAtual += $vlTotal;
                $h010Indices[] = $i;
            }
        }
    }
}

/* 2. Verificar se há itens para processar */
if (empty($h010Indices)) {
    die("\n❌ Nenhum item H010 válido encontrado com quantidade > 0 e valor total > 0.\n");
}

echo "\n========================================\n";
echo "Total atual do inventário: " . number_format($totalAtual, 2, ',', '.') . "\n";
echo "Novo valor desejado: " . number_format($novoValorInventario, 2, ',', '.') . "\n";
echo "Quantidade de itens a processar: " . count($h010Indices) . "\n";
echo "========================================\n\n";

if ($totalAtual <= 0) {
    die("❌ Valor total do inventário é zero ou negativo. Não é possível calcular o fator.\n");
}

/* 3. Fator proporcional */
$fator = $novoValorInventario / $totalAtual;
echo "Fator de correção: " . $fator . "\n\n";

/* 4. Ajustar itens */
$somaNova = 0.0;
$ultimoIndex = null;

foreach ($h010Indices as $i) {
    $partes = explode('|', trim($linhas[$i]));
    
    // Extrair valores usando os índices corretos
    $qtde = floatval(str_replace(',', '.', $partes[4]));      // Campo 4 = Quantidade
    $vlTotalOld = floatval(str_replace(',', '.', $partes[6])); // Campo 6 = Valor total
    
    // Calcular novos valores
    $vlTotalNew = round($vlTotalOld * $fator, 2);
    $vlUnitNew  = round($vlTotalNew / $qtde, 4);
    
    // Atualizar os campos corretos
    $partes[5] = number_format($vlUnitNew, 4, ',', '');  // Campo 5 = Valor unitário
    $partes[6] = number_format($vlTotalNew, 2, ',', ''); // Campo 6 = Valor total
    $partes[11] = number_format($vlTotalNew, 2, ',', ''); // Campo 11 = Valor total repetido
    
    // IMPORTANTE: Campo 10 é o código da conta (1.1.05.01.0001) - NÃO ALTERAR!
    
    $linhas[$i] = implode('|', $partes) . "\n";
    
    echo "Item $i: antigo total=" . number_format($vlTotalOld, 2) . 
         " novo total=" . number_format($vlTotalNew, 2) . 
         " unitário=" . number_format($vlUnitNew, 4) . "\n";
    
    $somaNova += $vlTotalNew;
    $ultimoIndex = $i;
}

/* 5. Ajuste residual no último item */
if ($ultimoIndex !== null) {
    $residuo = round($novoValorInventario - $somaNova, 2);
    
    if (abs($residuo) > 0) {
        echo "\nResíduo a ajustar no último item: " . number_format($residuo, 2) . "\n";
        
        $partes = explode('|', trim($linhas[$ultimoIndex]));
        
        $qtde = floatval(str_replace(',', '.', $partes[4]));
        $vlTotalOld = floatval(str_replace(',', '.', $partes[6]));
        
        $vlTotalCorr = round($vlTotalOld + $residuo, 2);
        $vlUnitCorr = round($vlTotalCorr / $qtde, 4);
        
        $partes[5] = number_format($vlUnitCorr, 4, ',', '');
        $partes[6] = number_format($vlTotalCorr, 2, ',', '');
        $partes[11] = number_format($vlTotalCorr, 2, ',', '');
        
        $linhas[$ultimoIndex] = implode('|', $partes) . "\n";
        
        echo "Último item ajustado: novo total=" . number_format($vlTotalCorr, 2) . "\n";
        $somaNova = $somaNova - $vlTotalOld + $vlTotalCorr;
    }
}

/* 6. Atualizar H005 */
if ($h005Index !== null) {
    $partes = explode('|', trim($linhas[$h005Index]));
    // O campo 4 do H005 é o valor total do inventário
    $partes[4] = number_format($novoValorInventario, 2, ',', '');
    $linhas[$h005Index] = implode('|', $partes) . "\n";
    echo "\n✅ H005 atualizado com novo valor: " . number_format($novoValorInventario, 2, ',', '.') . "\n";
} else {
    echo "\n⚠️ Registro H005 não encontrado.\n";
}

/* 7. Resumo final */
echo "\n========================================\n";
echo "RESUMO FINAL:\n";
echo "Soma dos novos valores dos itens: " . number_format($somaNova, 2, ',', '.') . "\n";
echo "Valor desejado: " . number_format($novoValorInventario, 2, ',', '.') . "\n";
$diferenca = $somaNova - $novoValorInventario;
echo "Diferença: " . number_format($diferenca, 2, ',', '.') . "\n";
echo "========================================\n";

/* 8. Salvar */
if (file_put_contents($arquivoNovo, $linhas)) {
    echo "\n✅ Inventário ajustado corretamente. Arquivo salvo como: $arquivoNovo\n";
} else {
    echo "\n❌ Erro ao salvar o arquivo: $arquivoNovo\n";
}
?>

<?php
/*
$arquivoOriginal = "SPED000012026020128.TXT";
$arquivoNovo     = "_SPED000012026020128CORRIGIDO.TXT";
$novoValorInventario = 2478525.63;

$linhas = file($arquivoOriginal);
$h005Index = null;
$h010Indices = [];
$totalAtual = 0.0;

foreach ($linhas as $i => $linha) {

    if (strpos($linha, '|H005|') === 0) {
        $h005Index = $i;
    }

    if (strpos($linha, '|H010|') === 0) {
        $partes = explode('|', trim($linha));

        if (count($partes) >= 7) {
            $qtde    = floatval(str_replace(',', '.', $partes[4]));
            $vlTotal = floatval(str_replace(',', '.', $partes[6]));


            if ($qtde > 0 && $vlTotal > 0) {
                $totalAtual += $vlTotal;
                $h010Indices[] = $i; 
            }
        }
    }
}


$fator = $novoValorInventario / $totalAtual;


$somaNova = 0.0;
$ultimoIndex = null;

foreach ($h010Indices as $i) {

    $partes = explode('|', trim($linhas[$i]));

    $qtde       = floatval(str_replace(',', '.', $partes[4]));
    $vlTotalOld = floatval(str_replace(',', '.', $partes[6]));

    $vlTotalNew = round($vlTotalOld * $fator, 2);
    $vlUnitNew  = round($vlTotalNew / $qtde, 4);

    $partes[4] = number_format($vlUnitNew, 4, ',', '');
    $partes[6] = number_format($vlTotalNew, 2, ',', '');

    $linhas[$i] = implode('|', $partes) . "\n";

    $somaNova += $vlTotalNew;
    $ultimoIndex = $i;
}


$residuo = round($novoValorInventario - $somaNova, 2);

if ($ultimoIndex !== null && abs($residuo) > 0) {

    $partes = explode('|', trim($linhas[$ultimoIndex]));

    $qtde = floatval(str_replace(',', '.', $partes[4]));
    $vlTotal = floatval(str_replace(',', '.', $partes[6]));
   

    $vlTotalCorr = round($vlTotal + $residuo, 2);
    $vlUnitCorr  = round($vlTotalCorr / $qtde, 4);

    $partes[4] = number_format($vlUnitCorr, 4, ',', '');
    $partes[6] = number_format($vlTotalCorr, 2, ',', '');

    $linhas[$ultimoIndex] = implode('|', $partes) . "\n";
}


if ($h005Index !== null) {
    $partes = explode('|', trim($linhas[$h005Index]));
    $partes[4] = number_format($novoValorInventario, 2, ',', '');
    $linhas[$h005Index] = implode('|', $partes).'|01|'."\n";
}


file_put_contents($arquivoNovo, $linhas);

echo "✅ Inventário ajustado corretamente.\n";
*/
?>