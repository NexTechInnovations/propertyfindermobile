import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import { theme } from "../theme";
import { Button, Divider } from "@ui-kitten/components";
import { handleAddRemoveOption } from "../utils/addRemoveOption";
import { selectProperties, setFilters } from "../features/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";
import { setBedsAndBathsBottomSheet } from "../features/bottomSheetsSlice";

const bedrooms = ["1", "2", "3", "4", "5"];
const bathrooms = ["1", "2", "3", "4", "5"];

const BedsAndBaths = () => {
  const [activeBedrooms, setActiveBedrooms] = useState<string[]>([]);
  const [activeBaths, setActiveBaths] = useState<string[]>([]);
  const [bedsAndBaths, setBedsAndBaths] = useState<any>({
    roomsMin: 0,
    roomsMax: 0,
    bathsMin: 0,
  });
  const { filters } = useSelector(selectProperties);
  const searchProperties = useSearchPropertiesQuery({
    ...filters,
  });
  const dispatch = useDispatch();

  const buttonStyle = (active: boolean) => ({
    backgroundColor: active ? theme["color-primary-500"] : "gray",
  });

  const handleSubmit = () => {
    setFilters({ ...bedsAndBaths });
    searchProperties.refetch();
    dispatch(setBedsAndBathsBottomSheet(false));
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Beds</Text>
        <View style={styles.list}>
          {bedrooms.map((room: string) => (
            <TouchableOpacity
              onPress={() =>
                handleAddRemoveOption(
                  room,
                  setActiveBedrooms,
                  activeBedrooms
                ).then((data: any) => {
                  setBedsAndBaths((prev: any) => ({
                    ...prev,
                    roomsMin: Math.min(...data),
                    roomsMax: Math.max(...data),
                  }));
                })
              }
              style={[styles.card, buttonStyle(activeBedrooms.includes(room))]}
            >
              <Text style={styles.cardText}>{room}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Baths</Text>
        <View style={styles.list}>
          {bathrooms.map((bath) => (
            <TouchableOpacity
              onPress={() =>
                handleAddRemoveOption(bath, setActiveBaths, activeBaths).then(
                  (data: any) => {
                    setBedsAndBaths((prev: any) => ({
                      ...prev,
                      bathsMin: Math.min(...data),
                    }));
                  }
                )
              }
              style={[styles.card, buttonStyle(activeBaths.includes(bath))]}
            >
              <Text style={styles.cardText}>{bath}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Divider style={{ marginTop: 12 }} />
        <Button style={styles.button} onPress={handleSubmit}>
          Show Results
        </Button>
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
    gap: 12,
  },
  card: {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
