import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DisneyCharacter } from '../types/api.types';

interface CardProps {
    item: DisneyCharacter;
    onPress: () => void;
}

export default function Card({ item, onPress }: CardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: item.imageUrl || 'https://via.placeholder.com/80' }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 80,
        height: 80,
        backgroundColor: '#eee',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
