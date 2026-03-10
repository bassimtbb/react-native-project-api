import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { DisneyCharacter } from '../types/api.types';
import { getCharacterById } from '../services/api.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params; // Récupération de l'ID 
  const [character, setCharacter] = useState<DisneyCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getCharacterById(id);
        // L'API Disney renvoie parfois les données sous forme de tableau ou d'objet direct
        // Gérer le cas où if getCharacterById return array or object
        setCharacter(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Erreur détails:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) return <ActivityIndicator style={styles.loader} size="large" />;

  return (
    <ScrollView style={styles.container}>
      {character ? (
        <>
          <Image source={{ uri: character.imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.name}>{character.name}</Text>

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
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1A1A2E' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 15, color: '#4F46E5' },
  item: { fontSize: 16, marginTop: 5, color: '#555' },
  none: { fontStyle: 'italic', color: '#999', marginTop: 5 },
  loader: { flex: 1, justifyContent: 'center' }
});

export default DetailScreen;