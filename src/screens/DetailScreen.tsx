import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import apiClient from "../services/api.service";
import { DisneyCharacter, ApiResponse } from "../types/api.types";

export default function DetailScreen({ route }: any) {
  const { id } = route.params;

  const [character, setCharacter] = useState<DisneyCharacter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await apiClient.get<ApiResponse<DisneyCharacter>>(`/character/${id}`);
        setCharacter(response.data.data[0]); // L’API Disney renvoie "data"
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!character) return <Text style={{ marginTop: 50 }}>Personnage introuvable</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>

      <Text style={styles.section}>Films :</Text>
      {character.films.map((film, idx) => (
        <Text key={idx}>{film}</Text>
      ))}

      <Text style={styles.section}>Short Films :</Text>
      {character.shortFilms.map((film, idx) => (
        <Text key={idx}>{film}</Text>
      ))}

      <Text style={styles.section}>TV Shows :</Text>
      {character.tvShows.map((show, idx) => (
        <Text key={idx}>{show}</Text>
      ))}

      <Text style={styles.section}>Video Games :</Text>
      {character.videoGames.map((game, idx) => (
        <Text key={idx}>{game}</Text>
      ))}

      <Text style={styles.section}>Source :</Text>
      <Text>{character.sourceUrl}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: 200, height: 200, alignSelf: "center" },
  name: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  section: { marginTop: 10, fontWeight: "bold" },
});