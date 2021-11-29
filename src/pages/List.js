import React, { useState, useEffect } from "react";
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Text, StyleSheet, AsyncStorage, Image, Alert } from 'react-native';
//import { SafeAreaView } from "react-navigation";

import SpotList from '../components/SpotList';

import logo from '../assets/logo1.png';

export default function List() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.99:3333' , {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.name} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('cats').then(storageCats => {
            const catsArray = storageCats.split(',').map(cat => cat.trim());
            
            setCats(catsArray);
        })
    }, []);

    

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
            <ScrollView>
                {cats.map(cat =>  <SpotList key={cat} cat={cat} />)}
            </ScrollView>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    
    },

    logo: {
        height: 70,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50
    },
})