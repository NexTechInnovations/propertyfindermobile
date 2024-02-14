import { useState, useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";

import { Screen } from "../components/Screen";
import { HEADERHEIGHT } from "../constants";
import { Card } from "../components/Card";
import { AnimatedListHeader } from "../components/AnimatedListHeader";
import { Map } from "../components/Map";
import { SearchScreenParams } from "../types";
import { Property } from "../types/property";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";
import { Loading } from "../components/Loading";
import CustomBottomSheet from "../components/CustomBottomSheet";
import {
  selectBottomSheets,
  setPriceBottomSheet,
} from "../features/bottomSheetsSlice";

export const SearchScreen = ({
  route,
}: {
  route: { params: SearchScreenParams };
}) => {
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [filteredProperties, setFilteredProperties] = useState<
    Property[] | undefined
  >([]);

  const properties = useSelector((state: any) => state.properties);
  const { priceFilter: priceFilterShown } = useSelector(
    (state: any) => state.bottomSheets
  );

  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let externalIDs: string[] = [];
  if (route.params?.externalIDs) {
    externalIDs = route.params.externalIDs;
  }

  const searchProperties = useSearchPropertiesQuery({
    externalIDs,
  });

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

  if (searchProperties.isLoading) return <Loading />;

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

      {priceFilterShown && (
        <CustomBottomSheet
          title="Price"
          onClose={() => dispatch(setPriceBottomSheet(false))}
          renderCloseButton={() => <Text>Show Properties</Text>}
        >
          <Text>Awesome bottom sheet ❤️‍🔥</Text>
        </CustomBottomSheet>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
