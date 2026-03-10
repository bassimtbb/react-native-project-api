import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Nettoyer le timeout précédent s'il existe
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Configurer un nouveau timeout (Debounce de 500ms)
        timeoutRef.current = setTimeout(() => {
            onSearch(query);
        }, 500);

        // Fonction de nettoyage
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [query, onSearch]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher un personnage..."
                value={query}
                onChangeText={setQuery}
                autoCorrect={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
});
