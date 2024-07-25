import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Button,
    Alert
} from 'react-native';
import Item from './Item';
import Cadastro from './Cadastro';
import GestorDados from '../dados/GestorDados';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';



export default function Lista({ navigation }) {


    const gestor = new GestorDados();
    const meses = [

        { label: 'Mês', value: '00' },
        { label: 'Janeiro', value: '01' },
        { label: 'fevereio', value: '02' },
        { label: 'março', value: '03' },
        { label: 'abril', value: '04' },
        { label: 'maio', value: '05' },
        { label: 'junho', value: '06' },
        { label: 'julho', value: '07' },
        { label: 'agosto', value: '08' },
        { label: 'setembro', value: '09' },
        { label: 'outubro', value: '10' },
        { label: 'novembro', value: '11' },
        { label: 'dezembro', value: '12' },
    ]

    const [selectedStartDate, setDataSelect] = useState("");
    const [financasAll, setFinancasAll] = useState([]);
    const [financas, setFinancas] = useState([]);
    const [anos, setAnos] = useState([]);
    const [filtroAno, setFiltroAno] = useState('0000');
    const [filtroMes, setFiltroMes] = useState('00');
    const isFocused = useIsFocused();
    useEffect(() => {
        gestor.criarBanco()
        getData();

    }, [isFocused]);

    function filtro({ ano, mes }) {
        const arrayTemp = []
        const ano1 = ano !== undefined ? ano : filtroAno;
        const mes1 = mes !== undefined ? mes : filtroMes;
        if (ano1 == '0000') {
            setFinancas(financasAll)
            return
        }

        console.log("ano: " + ano1)
        console.log("mes: " + mes1)

        if (ano1 != "0000" && mes1 != "00") {

            financasAll.forEach(item => {
                const data = item.DATA.split('/')
                const strMesAno = mes1 + "/" + ano1
                if (strMesAno === data[1] + '/' + data[2]) {
                    arrayTemp.push(item)
                }
            })

            setFinancas(arrayTemp)
            return
        }

        financasAll.map(item => {
            const data = item.DATA.split('/')

            if (ano1 === data[2]) {
                arrayTemp.push(item)
            }
        })



        setFinancas(arrayTemp)
    }

    // function onDateChange(date) {
    //     console.log(date)
    //     setDataSelect(date)
    // }


    const anosF = async (f) => {
        let arrayTemp = []
        let array = []
        array.push({ label: 'Anos', value: '0000' })

        f.map((item, i) => {
            const str = item.DATA.split('/')

            if (!arrayTemp.includes(str[2])) {
                arrayTemp.push(str[2])
            }

        })

        arrayTemp.map((item) => {
            array.push({ value: item, label: item })

        })

        setAnos(array)

    }


    // const Calendar = () => {

    //     const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    //     return (
    //         <View style={styles.container}>
    //             <CalendarPicker

    //                 previousTitle="Anterior"
    //                 nextTitle="Próximo" s
    //                 onDateChange={onDateChange}



    //             />

    //             <View>
    //                 <Text>SELECTED DATE:{startDate}</Text>
    //             </View>
    //         </View>

    //     )
    // }


    const getData = async () => {

        const array = await gestor.obterTodos();
        setFinancasAll(array)
        setFinancas(array)
        anosF(array)
    };

    function editar(financa) {
        console.log("passou aqui")
        navigation.navigate("Cadastro", { financa: financa })
    }


    const Dropdown = ({ placeHolder, array, click, valor }) => {

        return (
            <RNPickerSelect

                value={valor}
                placeholder={{ label: placeHolder }}
                onValueChange={click}
                items={array}
                style={{
                    viewContainer: {

                        borderRadius: 15,

                        width: "45%",
                        alignContent: 'space-between'
                    }
                }}

            />
        );

    };
    const deletarItem = async (key) => {
        Alert.alert("Deseja deletar: "+ key, "Mensagem", "ok" )
        let array = []
        await gestor.remover(key)
        financas.map((item) => {
            if (!(item.ID == key))
                array.push(item)
        })

        setFinancas(array)
        anosF(array)


    };



    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.viewDrop}>
                {/* <Calendar /> */}


                <Dropdown placeHolder={"Mês"} array={meses} valor={filtroMes} click={(e) => { setFiltroMes(e); filtro({ mes: e }) }} />
                <Dropdown placeHolder={"Anos"} array={anos} valor={filtroAno} click={(e) => { setFiltroAno(e); filtro({ ano: e }) }} />

            </View>

            <FlatList
                data={financas}

                renderItem={({ item }) =>


                (<Item
                    editar={() => editar(item)}
                    financa={item}
                    onDelete={() => deletarItem(item.ID)}

                />)


                }
                keyExtractor={(item) => item.ID}

            />



        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    viewDrop: {
        // backgroundColor: "#fffaaa",

        justifyContent: 'space-around',
        flexDirection: 'row',


    },

    inputDrop: {
        height: "50px",
        borderColor: 'green',
        backgroundColor: "#aaff22"
    },
    container: {
        width: "100%",

    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})
