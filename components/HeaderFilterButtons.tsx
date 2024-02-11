import {
  FlatList,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";

import { theme } from "../theme";

export const HeaderFilterButtons = ({}: {}) => {
  const filterButtons = [
    // {
    //   iconName: "filter-variant",
    //   onPress: () => console.log("filter all"),
    // },
    {
      label: "Rent/Buy",
      onPress: () => {},
    },
    {
      label: "Property Type",
      onPress: () => console.log("move in date"),
      active: false,
    },
    {
      label: "Price",
      onPress: () => console.log("pets"),
      active: false,
    },
    {
      label: "Beds & Baths",
      onPress: () => console.log("pets"),
      active: false,
    },
    {
      label: "Beds & Baths",
      onPress: () => console.log("pets"),
      active: false,
    },
  ];

  return (
    <FlatList
      data={filterButtons}
      horizontal
      style={{ marginVertical: 10 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <Button
            appearance={"ghost"}
            style={[styles.button]}
            onPress={item.onPress}
          >
            {item.label}
          </Button>
        );
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const buttonBackgroundStyle = (
  active: boolean
): StyleProp<ViewStyle | TextStyle> => {
  return {
    backgroundColor: active ? theme["color-primary-500"] : "white",
  };
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    borderColor: theme["color-gray"],
    marginHorizontal: 3,
  },
});
