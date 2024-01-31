import { useState, useEffect } from "react";
import { Text, Divider } from "@ui-kitten/components";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import { Property } from "../../types/property";
import { theme } from "../../theme";
import { Row } from "../Row";
import { TabBar } from "../TabBar";

const removeUnnecessaryButtons = (
  array: {
    title: string;
    onPress: () => void;
  }[],
  title: "Studio" | "1 Bedroom" | "2 Bedrooms" | "3+ Bedrooms"
) => {
  array.splice(
    array.findIndex((i) => i.title === title),
    1
  );
};

export const PricingAndFloorPlanSection = ({
  property,
}: {
  property: Property;
}) => {
  const [currentApartments, setCurrentApartments] = useState(
    property.apartments
  );

  // useEffect(() => {
  //   if (property.apartments !== currentApartments) {
  //     setCurrentApartments(property.apartments);
  //   }
  // }, [property]);

  const filterByBedroom = (
    numOfBedrooms: number,
    equalityType: "gt" | "eq"
  ) => {
    if (property.apartments) {
      let filtered;

      if (equalityType === "eq")
        filtered = property.apartments.filter(
          (i) => i.bedrooms === numOfBedrooms
        );
      else
        filtered = property.apartments.filter(
          (i) => i.bedrooms > numOfBedrooms
        );
      setCurrentApartments(filtered);
    }
  };

  const floorPlanOptions = [
    {
      title: "All",
      onPress: () => setCurrentApartments(property.apartments),
    },
    {
      title: "Studio",
      onPress: () => filterByBedroom(0, "eq"),
    },
    {
      title: "1 Bedroom",
      onPress: () => filterByBedroom(1, "eq"),
    },
    {
      title: "2 Bedrooms",
      onPress: () => filterByBedroom(2, "eq"),
    },
    {
      title: "3+ Bedrooms",
      onPress: () => filterByBedroom(2, "gt"),
    },
  ];

  let containsStudio,
    contains1Bed,
    contains2Bed,
    contains3Plus = false;
  if (property.apartments && property.apartments.length > 0) {
    for (let i in property.apartments) {
      if (property.rooms === 0) containsStudio = true;
      if (property.rooms === 1) contains1Bed = true;
      if (property.rooms === 2) contains2Bed = true;
      if (property.rooms >= 3) contains3Plus = true;
    }
    if (!containsStudio) removeUnnecessaryButtons(floorPlanOptions, "Studio");
    if (!contains1Bed) removeUnnecessaryButtons(floorPlanOptions, "1 Bedroom");
    if (!contains2Bed) removeUnnecessaryButtons(floorPlanOptions, "2 Bedrooms");
    if (!contains3Plus)
      removeUnnecessaryButtons(floorPlanOptions, "3+ Bedrooms");
  }

  return (
    <>
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        Pricing & Floor Plans
      </Text>
      <>
        <TabBar tabs={floorPlanOptions} style={styles.defaultMarginVertical} />

        <View style={[styles.container, styles.defaultMarginVertical]}>
          <Row>
            <View style={styles.apartmentLogisticsContainer}>
              <Text style={styles.apartmentLogisticsTitle}>
                {property.rooms === 0 ? "Studio " : property.rooms + " Bed"}{" "}
                {property.baths} Bath
              </Text>
              <Text style={styles.apartmentLogisticsMargin} category={"c1"}>
                ${property.price.toLocaleString("en-US")}
              </Text>
              <Text style={styles.apartmentLogisticsMargin} category={"c1"}>
                {property.rooms === 0 ? "Studio " : property.rooms + " Bed"}{" "}
                {property.baths + "Bath"}{" "}
                {property.area.toLocaleString("en-US") + " sqft"}
              </Text>
            </View>
            {property.photos && property.photos.length > 0 && (
              <Image
                source={{ uri: property.photos[0].url }}
                style={styles.image}
              />
            )}
          </Row>

          <Row style={styles.availableNowContainer}>
            <Text category={"c1"} style={{ fontWeight: "600" }}>
              Available: Now
            </Text>
            <TouchableOpacity
              onPress={() => console.log("navigate to floor plan details")}
            >
              <Text category={"c1"} status="info">
                Floor Plan Details
              </Text>
            </TouchableOpacity>
          </Row>
          <Divider style={styles.divider} />
          <Row style={styles.defaultMarginVertical}>
            <Text category={"c1"} style={styles.layeredText}>
              Unit
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Price
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Sq Ft
            </Text>
            <Text category={"c1"} style={styles.availableText}>
              Availability
            </Text>
          </Row>
          <Divider style={styles.divider} />
          <Row style={styles.defaultMarginVertical}>
            <Text category={"c1"} style={styles.layeredText}>
              {property.externalID}:
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              {property?.price
                ? `$${property?.price.toLocaleString("en-US")}`
                : "N/A"}
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              {property.area.toLocaleString("en-US")}
            </Text>
            <Text category={"c1"} style={styles.availableText}>
              {new Date().toLocaleDateString()}
            </Text>
          </Row>
          <Divider style={styles.divider} />
        </View>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: {
    marginVertical: 10,
  },
  container: {
    padding: 10,
    width: "100%",
    borderColor: theme["color-gray"],
    borderWidth: 1,
    borderRadius: 5,
  },
  apartmentLogisticsContainer: {
    flexShrink: 1,
    width: "90%",
    paddingRight: 10,
    marginTop: -5,
  },
  apartmentLogisticsTitle: { fontSize: 16, fontWeight: "600" },
  apartmentLogisticsMargin: { marginTop: 1 },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
  },
  availableNowContainer: {
    marginTop: 15,
    justifyContent: "space-between",
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 5,
  },
  layeredText: { width: "21%" },
  availableText: { width: "37%" },
});
