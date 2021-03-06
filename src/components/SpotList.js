import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";

import api from '../services/api';

function SpotList({ cat, navigation }) {
    const [spots, setSpots] = useState([]);
    
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { cat }
            })
            console.log(response.data);
            setSpots(response.data);
            //console.log(response.data);

        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        //console.log({ url });
        navigation.navigate('Book', { id });
    }

    //<Image style={{width: 400, height: 400}} source={{ uri: 'https://reactjs.org/logo-og.png'}}/>
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Salas para <Text style={styles.bold}>{cat}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url.replace('localhost','10.0.2.2')}}/>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id,item.thumbnail_url)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>   
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
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

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default withNavigation(SpotList);