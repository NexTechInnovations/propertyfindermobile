import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { theme } from "../theme";
import { Row } from "./Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, Input } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { selectProperties, setFilters } from "../features/propertiesSlice";
import { getFormattedPrice } from "../utils/getFormattedPrice";
import { getFormattedNumber } from "../utils/getFormattedNumber";

const PriceRangeFilter = () => {
  const dispatch = useDispatch();
  const {
    filters: { priceMin, priceMax },
  } = useSelector(selectProperties);

  const handleChangeMinPrice = (newValue: any) => {
    dispatch(
      setFilters({
        priceMin: getFormattedNumber(newValue),
      })
    );
  };
  const handleChangeMaxPrice = (newValue: any) => {
    dispatch(
      setFilters({
        priceMax: getFormattedNumber(newValue),
      })
    );
  };

  console.log(priceMin, priceMax);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        onChangeText={handleChangeMinPrice}
        value={priceMin}
        placeholder="Min. Price"
        autoCapitalize="none"
        keyboardType="numeric"
        autoCorrect={false}
      />
      <Divider style={{ width: 12, backgroundColor: theme['color-gray'] }} />
      <Input
        style={styles.input}
        value={priceMax}
        onChangeText={handleChangeMaxPrice}
        placeholder="Max. Price"
        autoCapitalize="none"
        keyboardType="numeric"
        autoCorrect={false}
      />
    </View>
  );
};

export default PriceRangeFilter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  input: {
    flex: 1,
  },
});
