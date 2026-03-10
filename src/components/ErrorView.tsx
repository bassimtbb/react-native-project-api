import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorViewProps {
    message: string;
    onRetry: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={onRetry}>
                <Text style={styles.buttonText}>Réessayer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    icon: {
        fontSize: 50,
        marginBottom: 15,
    },
    message: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
