import {
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  Platform,
  StatusBar,
  View,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Loading } from "./Loading";
import { useLoading } from "../hooks/useLoading";
import { HEADERHEIGHT } from "../constants";

export const Screen = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle;
}) => {
  const { loading } = useLoading();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, style]}>
        <StatusBar barStyle={"dark-content"} />
        {loading ? <Loading /> : children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADERHEIGHT,
  },
});
