
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import {useState, useEffect} from "react";
import server from '../server';

export default function HomeScreen({navigation}: any) {
    
     const [tasks, setTasks] = useState<string[]>([]);
     const [titulo, setTitulo] = useState<string>('');
     const [description, setDescription] = useState<string>('');
     const [update, setUpdate] = useState<boolean>(false);
    
     const carregarTasks = async() => {
          const response = await fetch(`http://${server.host}:${server.port}/tasks`);
    
          const data = await response.json();
          setTasks(data.map((item: any) => item));
    }

    const adicionarTasks = async() => {

         if(titulo.trim().length == 0) {
            setTitulo('');
            return;
         }

        await fetch(`http://${server.host}:${server.port}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                description : description,
                complete : false
            })
        });

        setUpdate(!update);
        setTitulo('');
        setDescription('');
        carregarTasks();
    }


    useEffect(()=>{
        carregarTasks();
    },[update])

    const abrirTarefa = (tarefa: any) => {
        navigation.navigate('Task', {tarefa, setUpdate});
    }

    return(
         <View style={{ padding: 20}}>
             <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Lista de Tarefas</Text>
             <Text style={{fontSize: 16, marginBottom: 10}}>Adicione uma nova tarefa</Text>
             <TextInput style={{borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20,color: '#333', fontWeight:'bold'}}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Preparar o jantar..."
            />
             <Text style={{fontSize: 16, marginBottom: 10}}>Descrição da tarefa</Text>
             <TextInput
             multiline={true}
             numberOfLines={4}
             style={{borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20,color: '#333'}}
             value={description}
             onChangeText={setDescription}
             />
            {/* Botão de adicioonar tarefas */}
             <TouchableOpacity onPress={adicionarTasks} style={{backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginBottom: 20}}>
                 <Text style={{color: '#fff', textAlign: 'center'}}>Adicionar Tarefa</Text>
             </TouchableOpacity>
            {/* Lista as tarefas adicionadas */}
            <FlatList
                data={tasks as any[]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => abrirTarefa(item)}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
         </View>
       

    )

}