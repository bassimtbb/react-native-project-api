import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function CharacterCard({ item, navigation }: any) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: item._id })}>
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  image: { width: 120, height: 120 },
  name: { marginTop: 10, fontWeight: "bold" },
});