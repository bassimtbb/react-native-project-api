import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import apiClient from './src/services/api.service';
import { ApiResponse, DisneyCharacter } from './src/types/api.types';

export default function App() {
  const [character, setCharacter] = useState<DisneyCharacter | null>(null);

  useEffect(() => {
    // Fonction pour tester l'API au démarrage de l'app
    const testApi = async () => {
      try {
        // On récupère la première page de personnages
        const response = await apiClient.get<ApiResponse<DisneyCharacter>>('/character');

        // On enregistre le premier personnage trouvé pour l'afficher
        if (response.data.data.length > 0) {
          setCharacter(response.data.data[0]);
        }
      } catch (error) {
        console.error('Erreur lors du test :', error);
      }
    };

    testApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Test de l'API Disney :</Text>
      {character ? (
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
          Premier personnage : {character.name}
        </Text>
      ) : (
        <Text style={{ marginTop: 10 }}>Chargement en cours...</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
