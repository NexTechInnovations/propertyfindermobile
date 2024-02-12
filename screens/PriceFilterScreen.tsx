import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

const PriceFilterScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        index={0}
        snapPoints={["25%"]}
        enableOverDrag
        enablePanDownToClose
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            Bottom Modal 😎
          </Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default PriceFilterScreen;

const styles = StyleSheet.create({});
