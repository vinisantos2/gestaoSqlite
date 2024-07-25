import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Financa } from '../dados/Financa';
//import ModalApp from './Modal';

export default function Item({ financa, onDelete, editar }) {
  return (
    <View style={styles.item}>
      <View style={styles.viewTexto}>
        <Text style={styles.title}>{financa.NOME}</Text>
        <Text style={styles.subtitle}>{financa.VALOR}</Text>
        <Text style={styles.subtitle}>{financa.DATA}</Text>

      </View>

      <View style={styles.viewIcons}>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Ionicons name="trash-sharp" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={editar}>
          <Ionicons name="pencil-outline" size={30}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    marginLeft: 5
  },

  viewIcons: {

    alignItems: 'center',

    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '100%',


  },
  viewTexto: {
    alignContent: 'center',
    borderColor: 'white',
    width: '80%',
    padding: 5,
  },
  item: {
    padding: 5,
    display: 'flex',
    width: "100%",
    flexDirection: 'row',
    backgroundColor: '#00BFFF',
    marginVertical: 5,
  },
  title: {

    fontSize: 30,
  },

  subtitle: {

    fontSize: 20,
  },
});
