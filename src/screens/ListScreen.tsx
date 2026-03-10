import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import apiClient from '../services/api.service';
import { DisneyCharacter, ApiResponse } from '../types/api.types';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any, 'Home'>;
}

export default function ListScreen({ navigation }: Props) {
  // Gestion des états
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction d'appel API
  const fetchCharacters = async (pageNumber: number, query: string) => {
    if (pageNumber === 1) setLoading(true);
    else setIsFetchingMore(true);

    try {
      let url = `/character?page=${pageNumber}`;
      if (query.trim() !== '') {
        url += `&name=${encodeURIComponent(query)}`;
      }

      const response = await apiClient.get<ApiResponse<DisneyCharacter>>(url);
      const newData = response.data.data;

      // Fusion des données : on remplace si c'est la page 1, on ajoute avec le spread operator sinon
      if (pageNumber === 1) {
        setCharacters(newData);
      } else {
        setCharacters((prev) => [...prev, ...newData]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des personnages :', error);
    } finally {
      if (pageNumber === 1) setLoading(false);
      else setIsFetchingMore(false);
    }
  };

  // Dès que searchQuery change, on remet la page à 1 et on refait l'appel
  useEffect(() => {
    setPage(1);
    fetchCharacters(1, searchQuery);
  }, [searchQuery]);

  // Logique du Scroll Infini
  const loadMore = () => {
    if (!loading && !isFetchingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage, searchQuery);
    }
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={characters}
          // On s'assure de l'unicité de la clé, parfois la Disney API a des doublons accidentels d'ID
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => (
            <Card
              item={item}
              onPress={() => navigation.navigate('Detail', { id: item._id })}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <ActivityIndicator style={styles.footerLoader} /> : null}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucun personnage trouvé.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  }
});