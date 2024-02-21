import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { theme } from "../theme";
import { Button, Divider } from "@ui-kitten/components";

const bedrooms = ["1", "2", "3", "4", "5"];
const bathrooms = ["1", "2", "3", "4", "5"];

const BedsAndBaths = () => {
  const [bedsAndBaths, setBedsAndBaths] = useState({
    baths: [],
    beds: [],
  });

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Baths</Text>
        <View style={styles.list}>
          {bedrooms.map((room) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{room}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Beds</Text>
        <View style={styles.list}>
          {bathrooms.map((bath) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{bath}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Divider style={{ marginTop: 12 }} />
        <Button style={styles.button}>Show Results</Button>
      </View>
    </View>
  );
};

export default BedsAndBaths;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  card: {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme["color-primary-500"],
    borderRadius: 6,
  },
  cardText: {
    color: "white",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-end",
    margin: 12,
    color: "white !important",
  },
});
