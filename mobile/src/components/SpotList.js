import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

const SpotList = ({ tech, navigation }) => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpot(){
            const response = await api.get('/spots', {
                params: { tech }
            });

            setSpots(response.data)
        }
        loadSpot();
    }, []);

    function handleNavigation(id){
        navigation.navigate('Booking', { id })
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresa que usam <Text style={styles.bold}>{tech}</Text></Text>

            { spots.length > 0 ? (
                <FlatList 
                    style={styles.list}
                    data={spots}
                    keyExtractor={spot => spot._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                            <Text style={styles.company}>{item.company}</Text>
                            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleNavigation(item._id)}>
                                <Text style={styles.buttonText}>Solicitar reserva</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.empty}>Não há spots para esta tecnologia</Text>
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold: {
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 15
    },
    empty: {
        marginHorizontal: 20,
        fontSize: 15,
        color: '#999'
    }
});

export default withNavigation(SpotList);