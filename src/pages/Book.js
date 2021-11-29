import React, { useState, useEffect } from "react";
import { SafeAreaView, AsyncStorage, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native';

import api from '../services/api';

export default function Book( { navigation }) {
    const id = navigation.getParam('id');
    const url = navigation.getParam('url');

    const [date, setDate] = useState('');
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get(`/spots/${id}`, {
                _id: id
            })

            setSpots(response.data);
            //console.log(response.data);
 
        }

        loadSpots();
    }, []);

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');

    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>  

            <SafeAreaView style={styles.container}>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url.replace('localhost','10.0.2.2')}}/>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text> 
                        <Text multiline={true} style={styles.multi}>{item.desc}</Text>
                    </View>
                )}
            />


            </SafeAreaView>

            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data deseja reservar"
                placeholderTextColor='#999' 
                keyboardType="email-address"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 30,
        flex: 1
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 60
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,

    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    cancelButton: {
        backgroundColor: '#CCC',
        marginTop: 10
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    thumbnail: {
        width: 350,
        height: 210,
        resizeMode: 'cover',
        borderRadius: 2,
        margin: 0
    },

    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    list: {
        paddingHorizontal: 0,
    },

    listItem: {
        marginRight: 15,
    },

    multi: {
        color: '#444',
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
        
    }

    
});