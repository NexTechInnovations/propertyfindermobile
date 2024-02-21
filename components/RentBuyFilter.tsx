import { StyleSheet, View } from "react-native";
import { Button, Divider, Tab, TabBar } from "@ui-kitten/components";
import { theme } from "../theme";
import { useState } from "react";
import { selectProperties, setFilters } from "../features/propertiesSlice";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryBottomSheet } from "../features/bottomSheetsSlice";

const Categories = [
  { title: "Buy", index: 0, value: "for-sale" },
  { title: "Rent", index: 1, value: "for-rent" },
];

const RentBuyFilter = () => {
  const { filters } = useSelector(selectProperties);
  const [selectedCategory, setSelectedCategory] = useState<any>(Categories[0]);
  const searchProperties = useSearchPropertiesQuery({
    ...filters,
    purpose: selectedCategory.value,
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setFilters({ purpose: selectedCategory.value }));
    searchProperties.refetch();
    dispatch(setCategoryBottomSheet(false));
  };

  return (
    <View>
      <TabBar
        style={styles.tabBar}
        selectedIndex={selectedCategory.index}
        onSelect={(index) =>
          setSelectedCategory(Categories.find((cat) => cat.index === index))
        }
      >
        {Categories.map((category) => (
          <Tab title={category.title} />
        ))}
      </TabBar>

      <View>
        <Divider style={{ marginTop: 12 }} />
        <Button onPress={handleSubmit} style={styles.button}>
          Show Results
        </Button>
      </View>
    </View>
  );
};

export default RentBuyFilter;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme["color-light-gray"],
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    alignSelf: "flex-end",
    margin: 12,
    color: "white !important",
  },
});
