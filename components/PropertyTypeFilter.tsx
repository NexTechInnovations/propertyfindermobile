import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import { Button, Divider, Input } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { selectProperties, setFilters } from "../features/propertiesSlice";
import { getFormattedNumber } from "../utils/getFormattedNumber";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";
import { setPropertyTypeBottomSheet } from "../features/bottomSheetsSlice";

const propertyTypes = [
  { text: "Apartment", value: 4 },
  { text: "Townhouses", value: 16 },
];

const Card = ({
  text,
  onClick,
  active,
}: {
  text: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[CardStyles.container, active && CardStyles.active]}
    >
      <Text style={{ color: active ? "white" : theme["color-primary-500"] }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const CardStyles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: theme["color-primary-500"],
    borderWidth: 2,
  },
  active: {
    backgroundColor: theme["color-primary-500"],
    borderColor: theme["color-primary-500"],
  },
});
const PropertyTypeFilter = () => {
  const [activeType, setActiveType] = useState(4);
  const { filters } = useSelector(selectProperties);

  const dispatch = useDispatch();

  const searchProperties = useSearchPropertiesQuery({
    ...filters,
    proeprtyType: activeType,
  });

  const handleSubmit = (newValue: any) => {
    dispatch(
      setFilters({
        categoryExternalID: activeType,
      })
    );
    dispatch(setPropertyTypeBottomSheet(false));
    searchProperties.refetch();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator>
        <View style={styles.contentContainer}>
          {propertyTypes.map((type) => (
            <Card
              text={type.text}
              active={type.value === activeType}
              onClick={() => setActiveType(type.value)}
            />
          ))}
        </View>
      </ScrollView>
      <View>
        <Divider style={{ marginTop: 12 }} />
        <Button onPress={handleSubmit} style={styles.button}>
          Show Results
        </Button>
      </View>
    </View>
  );
};

export default PropertyTypeFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
