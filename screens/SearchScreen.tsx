import { Animated, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../components/Screen";
import { endpoints, HEADERHEIGHT, queryKeys } from "../constants";
import { Card } from "../components/Card";
import { AnimatedListHeader } from "../components/AnimatedListHeader";
import { getPropertiesInArea } from "../data/properties";
import { Map } from "../components/Map";
import { SearchScreenParams } from "../types";
import { Property } from "../types/property";
import { Text } from "@ui-kitten/components";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";
import axios from "axios";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

export const SearchScreen = ({
  route,
}: {
  route: { params: SearchScreenParams };
}) => {
  const properties = useSelector((state: any) => state.properties);
  const navigation = useNavigation();
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));
  const [location, setLocation] = useState<string | undefined>(undefined);
  const mapRef = useRef<MapView | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<
    Property[] | undefined
  >([]);

  console.log(properties);

  let externalIDs: string[] = [];
  if (route.params?.externalIDs) {
    externalIDs = route.params.externalIDs;
  }

  const searchProperties = useSearchPropertiesQuery({
    externalIDs,
  });

  const sortPropertiesByPrice = (type = "default") => {
    if (type === "default") setFilteredProperties(searchProperties.data);
    else
      setFilteredProperties(
        searchProperties.data?.sort((a, b) =>
          type === "asc" ? a.price - b.price : b.price - a.price
        )
      );
  };

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);
      searchProperties.refetch();

      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon),
        },
      });
    }
  }, [route]);

  if (searchProperties.isLoading) {
    return (
      <Screen
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
        location={location ? location : "Find a Location"}
        availableProperties={
          searchProperties.data ? searchProperties.data.length : undefined
        }
      />
      {/* <BottomSheet index={-1} snapPoints={[200, 500]}>
        <View>
          <Text>Awesome Bottom Sheet 🎉</Text>
        </View>
      </BottomSheet> */}
      //TODO: bottom sheet
      {mapShown ? (
        <Map
          properties={searchProperties?.data ? searchProperties.data : []}
          mapRef={mapRef}
          location={location ? location : "Find a Location"}
          setLocation={setLocation}
          initialRegion={
            route.params
              ? {
                  latitude: Number(route.params.lat),
                  longitude: Number(route.params.lon),
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }
              : undefined
          }
        />
      ) : (
        <>
          {searchProperties.data && searchProperties.data?.length > 0 ? (
            <Animated.FlatList
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnimation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
              bounces={false}
              scrollEventThrottle={16}
              data={searchProperties?.data}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card
                  style={styles.card}
                  property={item}
                  onPress={() =>
                    navigation.navigate("PropertyDetails", {
                      propertyID: parseInt(item.externalID),
                    })
                  }
                />
              )}
            />
          ) : (
            <>
              {route.params ? (
                <View style={styles.lottieContainer}>
                  <Text category={"h6"}>No Properties Found</Text>
                  <Text appearance={"hint"}>
                    Please search in a different location.
                  </Text>
                </View>
              ) : (
                <View style={styles.lottieContainer}>
                  <LottieView
                    autoPlay
                    loop
                    style={styles.lottie}
                    source={require("../assets/lotties/SearchScreen.json")}
                  />
                  <Text category={"h6"}>Begin Your Search</Text>
                  <Text appearance={"hint"} style={styles.subHeader}>
                    Find apartments anytime and anywhere.
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 5 },
  lottieContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: { height: 200, width: 200 },
  subHeader: {
    marginTop: 10,
  },
});
