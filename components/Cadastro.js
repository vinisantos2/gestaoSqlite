import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View
} from 'react-native';
import { Financa } from '../dados/Financa';
import MaskInput, { Masks } from 'react-native-mask-input';
import GestorDados from '../dados/GestorDados';
import { useIsFocused } from '@react-navigation/native';


export default function Cadastro({ route, navigation }) {

  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const gestor = new GestorDados()
  const isFocused = useIsFocused();
  const {   financa } = route.params ? route.params : false;
  React.useEffect(() => {
    console.log(route)
    if (!isFocused) {
      limpar()
      route.params = undefined
      return
    }


    if (financa) {
      setData(financa.DATA)
      setNome(financa.NOME)
      setValor(financa.VALOR)
    }


  }, [isFocused]);



  function _cadastrar() {

    if (nome.length < 1) {
      Alert.alert('Alerta', 'Preencher o campo nome')
      return;
    } else if (valor.length < 1) {
      Alert.alert('Alerta', 'Preencher o campo valor')
      return;
    } else if (data.length < 1) {
      Alert.alert('Alerta', 'Preencher o campo data')
      return;
    }



    const financa = new Financa(null, valor, data, nome)



    salvar(financa);
  }


  function limpar() {
    setNome('')
    setData('')
    setValor("")

  }
  async function salvar(obj) {

    if (financa) {
      obj.id = financa.ID
      gestor.update(obj)
      limpar()
      return
    }

    gestor.adicionar(obj)
    limpar()

    Alert.alert("DAdos salva", "Dados salvo com sucesso")


  }


  return (

    <View style={styles.conteiner}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        keyboardType='ascii-capable'
        placeholder='Nome'

      />
      <MaskInput
        style={styles.input}
        value={valor}
        mask={Masks.BRL_CURRENCY}
        onChangeText={(masked, unmasked) => {
          setValor(masked)


        }}

        keyboardType='decimal-pad'
        placeholder='Valor'

      />
      <MaskInput
        style={styles.input}
        value={data}
        mask={Masks.DATE_DDMMYYYY}
        onChangeText={(masked, unmasked) => {
          setData(masked)


        }}

        keyboardType='decimal-pad'
        placeholder='Data'

      />

      <TouchableOpacity onPress={_cadastrar} style={styles.botao} >
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: "#808080",
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },

  input: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "80%",
    padding: 10,
    borderRadius: 15,

  },

  botao: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: 'blue',
    width: "50%",
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "green"
  },

  text: {

    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})