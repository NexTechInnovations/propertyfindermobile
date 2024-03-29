import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { ImageCarousel } from "../components/ImageCarousel";
import { Divider, Text } from "@ui-kitten/components";
import { useQuery } from "react-query";
import axios from "axios";

import { PropertyHeaderSection } from "../components/propertyDetailsSections/PropertyHeaderSection";
import { Screen } from "../components/Screen";
import { properties } from "../data/properties";
import { theme } from "../theme";
import { PricingAndFloorPlanSection } from "../components/propertyDetailsSections/PricingAndFloorPlanSection";
import { AboutSection } from "../components/propertyDetailsSections/AboutSection";
import { ContactSection } from "../components/propertyDetailsSections/ContactSection";
import { AmentitiesSection } from "../components/propertyDetailsSections/AmenitiesSection";
import { LeaseAndFeesSection } from "../components/propertyDetailsSections/LeaseAndFeesSection";
import { LocationSection } from "../components/propertyDetailsSections/LocationSection";
import { ReviewSection } from "../components/propertyDetailsSections/ReviewSection";
import { endpoints, queryKeys } from "../constants";
import { useSelectedPropertyQuery } from "../hooks/queries/useSelectedPropertyQuery";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const PropertyDetailsScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const property = useSelectedPropertyQuery(route.params.propertyID);

  if (!property.data)
    return <Text style={{ margin: 12 }}>Trying to fetch your property...</Text>;

  return (
    <Screen>
      <FlatList
        data={[property.data]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            {item.coverPhoto ? (
              <ImageCarousel
                images={item.photos.map((photo) => photo.url)}
                indexShown
                imageStyle={styles.image}
              />
            ) : null}

            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item} />
              <Divider style={styles.divider} />
              <PricingAndFloorPlanSection property={item} />
              <Divider style={styles.divider} />
              <AboutSection property={item} />
              <Divider style={styles.divider} />
              <ContactSection property={item} />
              <Divider style={styles.divider} />
              <ReviewSection property={item} />
              <Divider style={styles.divider} />
              <LocationSection property={item} />
              <Divider style={styles.divider} />
              {/* 
                <AmentitiesSection property={item} />
                <Divider style={styles.divider} />
                <LeaseAndFeesSection property={item} />
                <Divider style={styles.divider} />
               
              */}
            </View>
          </>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 10,
  },
});
