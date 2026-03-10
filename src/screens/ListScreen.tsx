import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import apiClient from "../services/api.service";
import { DisneyCharacter, ApiResponse } from "../types/api.types";
import CharacterCard from "../components/CharacterCard";

export default function ListScreen({ navigation }: any) {
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get<ApiResponse<DisneyCharacter>>("/character");
        setCharacters(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <CharacterCard item={item} navigation={navigation} />}
      />
    </View>
  );
}