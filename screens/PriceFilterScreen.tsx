import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import CustomBottomSheet from "../components/CustomBottomSheet";

const PriceFilterScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomBottomSheet
        onClose={() => console.log(123)}
        renderCloseButton={() => <Text>Show Me</Text>}
      >
        <Text>Saif Mohamed</Text>
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default PriceFilterScreen;
