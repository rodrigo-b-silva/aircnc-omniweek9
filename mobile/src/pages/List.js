import React, { useState, useEffect } from 'react';
import { View, Alert, Text, ScrollView, AsyncStorage, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default ({ navigation }) => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        async function getTechs(){
            AsyncStorage.getItem('techs').then(storageTechs => {
                const techsArrays = storageTechs.split(',').map(tech => tech.trim());
                setTechs(techsArrays);
            })
        };
        getTechs();
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = io('http://10.0.2.2:3333', {
                query: { user_id }
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`);
            })
        })
    }, []);

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>

            <ScrollView style={styles.scroll}>
                { techs.map(tech => <SpotList key={tech} tech={tech} />) }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: "center",
        alignSelf: "center",
        marginTop: 50
    },
    scroll: {
        marginBottom: 20
    }
})