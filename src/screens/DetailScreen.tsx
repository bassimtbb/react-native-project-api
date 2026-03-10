import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation.types';
import { DisneyCharacter } from '../types/api.types';
import { getCharacterById } from '../services/api.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params; // Récupération de l'ID 
  const [character, setCharacter] = useState<DisneyCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getCharacterById(id);
        const fetchedCharacter = Array.isArray(data) ? data[0] : data;
        setCharacter(fetchedCharacter);

        // Verification des favoris
        if (fetchedCharacter) {
          const favoritesJson = await AsyncStorage.getItem('favorites');
          if (favoritesJson) {
            const favorites: DisneyCharacter[] = JSON.parse(favoritesJson);
            const isFav = favorites.some((fav) => fav._id === fetchedCharacter._id);
            setIsFavorite(isFav);
          }
        }
      } catch (error) {
        console.error("Erreur détails:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const saveFavorite = async () => {
    if (!character) return;
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      let favorites: DisneyCharacter[] = favoritesJson ? JSON.parse(favoritesJson) : [];

      if (isFavorite) {
        // Retirer des favoris
        favorites = favorites.filter((fav) => fav._id !== character._id);
        setIsFavorite(false);
      } else {
        // Ajouter aux favoris
        favorites.push(character);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du favori:", error);
    }
  };

  if (isLoading) return <ActivityIndicator style={styles.loader} size="large" />;

  return (
    <ScrollView style={styles.container}>
      {character ? (
        <>
          <Image source={{ uri: character.imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={styles.name}>{character.name}</Text>
              <TouchableOpacity onPress={saveFavorite}>
                <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Films :</Text>
            {character.films && character.films.length > 0 ? (
              character.films.map((film, index) => (
                <Text key={index} style={styles.item}>• {film}</Text>
              ))
            ) : (
              <Text style={styles.none}>Aucun film répertorié</Text>
            )}

            <Text style={styles.sectionTitle}>Séries TV :</Text>
            {character.tvShows && character.tvShows.length > 0 ? (
              character.tvShows.map((show, index) => (
                <Text key={index} style={styles.item}>• {show}</Text>
              ))
            ) : (
              <Text style={styles.none}>Aucune série répertoriée</Text>
            )}
          </View>
        </>
      ) : (
        <View style={styles.content}>
          <Text style={styles.none}>Personnage non trouvé.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  content: { padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: { fontSize: 28, fontWeight: 'bold', color: '#1A1A2E', flex: 1 },
  heartIcon: { fontSize: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 15, color: '#4F46E5' },
  item: { fontSize: 16, marginTop: 5, color: '#555' },
  none: { fontStyle: 'italic', color: '#999', marginTop: 5 },
  loader: { flex: 1, justifyContent: 'center' }
});

export default DetailScreen;