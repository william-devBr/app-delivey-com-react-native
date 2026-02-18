import { View, Text,
     TouchableOpacity, 
     Modal, Pressable, 
     StyleSheet,
     TextInput
    } from "react-native";
import {useState, useEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import  server  from '../server';

export default function TaskScreen({route}: any) {
    const {tarefa, setUpdate} = route.params;
    const [tarefaAtualizada, setTarefaAtualizada] = useState<boolean>(tarefa.complete);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>(tarefa.title);
    const [descricao, setDescricao] = useState<string>(tarefa.description);
   
    const marcarComoCompleta = async() => {

            await fetch(`http://${server.host}:${server.port}/tasks/s/${tarefa.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ complete: !tarefa.complete }),
            });
            setTarefaAtualizada(!tarefaAtualizada);
            setUpdate((prev: boolean) => !prev);

            alert('Tarefa atualizada com sucesso!');
    }
    
    const editarTarefa = async ({id}: any) => {
     

      await fetch(`http://${server.host}:${server.port}/tasks/e/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: titulo, description: descricao }),
      });

      setUpdate((prev: boolean) => !prev);

      alert('Tarefa editada com sucesso!');
      setModalVisible(false);

    }
    
    useEffect(()=> {
        setTarefaAtualizada(tarefa.complete);
    },[tarefa.complete])
 
    return(
        <>
        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center',marginTop: 100}}>
            <Text>TarefaID: {tarefa.id}</Text>
            <Text>Título: {titulo}</Text>
            <Text>Descrição: {descricao}</Text>
            <Text>Completa: {tarefaAtualizada ? 'Sim' : 'Não'}</Text>

         
        </View>

        <View style={{ flex: 1,gap: 20, justifyContent: 'center', padding: 20, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
           <TouchableOpacity onPress={() => marcarComoCompleta()} style={{backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 20}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" /> Marcar como Completa</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor: '#ffc107', padding: 10, borderRadius: 5, marginTop: 20}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                    <Ionicons name="create-outline" size={20} color="#fff" /> Editar Tarefa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Tarefa excluída!')} style={{backgroundColor: '#dc3545', padding: 10, borderRadius: 5, marginTop: 20}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                    <Ionicons name="trash-outline" size={20} color="#fff" /> Excluir Tarefa
                </Text>
            </TouchableOpacity>
            </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={styles.modalText}>Editar Tarefa</Text>
              <TextInput 
              value={titulo}
              placeholder="Título"
              style={{borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', marginBottom: 10}}
              onChangeText={setTitulo}
               />
              <TextInput 
              value={descricao}
              multiline = {true}
              numberOfLines = {4}
              placeholder="Descrição" 
              style={{borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', marginBottom: 10}} 
              onChangeText={setDescricao}
              />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => editarTarefa(tarefa)}>
                <Text style={styles.textStyle}>Gravar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </>
        
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
        modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0, 
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
        },
        button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
        },
       
        buttonClose: {
        backgroundColor: "#2196F3",
        },
        textStyle: {
        color: "white", 
        fontWeight: "bold",
        textAlign: "center"
        },
        modalText: {
        marginBottom: 15,
        textAlign: "center"
        },
        buttonSave: {
        backgroundColor: "#28a745",

        }

})