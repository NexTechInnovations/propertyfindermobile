import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { Button, Divider, Input } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { selectProperties, setFilters } from "../features/propertiesSlice";
import { getFormattedNumber } from "../utils/getFormattedNumber";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";

const PriceRangeFilter = () => {
  const [price, setPrice] = useState({
    priceMin: "",
    priceMax: "",
  });

  const dispatch = useDispatch();
  const { filters } = useSelector(selectProperties);

  const searchProperties = useSearchPropertiesQuery({
    ...filters,
    priceMax: price.priceMax.split(",").join(""),
    priceMin: price.priceMin.split(",").join(""),
  });

  const handleSubmit = (newValue: any) => {
    // dispatch(
    //   setFilters({
    //     priceMax: price.priceMax.split(",").join(""),
    //     priceMin: price.priceMin.split(",").join(""),
    //   })
    // );
    searchProperties.refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Input
          style={styles.input}
          onChangeText={(newValue) =>
            setPrice((prev: any) => ({
              ...prev,
              priceMin: getFormattedNumber(newValue),
            }))
          }
          value={price.priceMin}
          placeholder="Min. Price"
          autoCapitalize="none"
          keyboardType="numeric"
          autoCorrect={false}
        />
        <Divider style={{ width: 12, backgroundColor: theme["color-gray"] }} />
        <Input
          style={styles.input}
          value={price.priceMax}
          onChangeText={(newValue) =>
            setPrice((prev: any) => ({
              ...prev,
              priceMax: getFormattedNumber(newValue),
            }))
          }
          placeholder="Max. Price"
          autoCapitalize="none"
          keyboardType="numeric"
          autoCorrect={false}
        />
      </View>
      <View>
        <Divider style={{ marginTop: 12 }} />
        <Button onPress={handleSubmit} style={styles.button}>
          Show Results
        </Button>
      </View>
    </View>
  );
};

export default PriceRangeFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentContainer: {
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
  button: {
    alignSelf: "flex-end",
    margin: 12,
    color: "white !important",
  },
});
