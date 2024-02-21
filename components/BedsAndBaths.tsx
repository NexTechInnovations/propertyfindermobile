import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const bedrooms = ["1", "2", "3", "4", "5"];
const bathrooms = ["1", "2", "3", "4", "5"];

const BedsAndBaths = () => {
  const [bedsAndBaths, setBedsAndBaths] = useState({
    baths: [],
    beds: [],
  });

  return (
    <View style={styles.container}>
      <View>
        <Text>Baths</Text>
      </View>
      <View>
        <Text>Beds</Text>
      </View>
    </View>
  );
};

export default BedsAndBaths;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
  },
});
