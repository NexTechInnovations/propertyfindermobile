import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Button, Divider } from "@ui-kitten/components";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

interface CustomBottomSheetProps {
  children: ReactElement;
  renderCloseButton?: () => ReactElement;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
}

const CustomBottomSheet = ({
  children,
  onClose,
  title,
}: CustomBottomSheetProps) => {
  const [snapPoints, setSnapPoints] = useState(["35%"]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setSnapPoints(["65%"]);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setSnapPoints(["35%"]);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BottomSheet
      onClose={onClose}
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      index={0}
      snapPoints={snapPoints}
    >
      <View>
        <Text style={{ padding: 12 }}>{title}</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.contentContainer}>
        <ScrollView style={{ padding: 12, width: "100%", flex: 1 }}>
          {children}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  footer: {
    width: "100%",
  },
  button: {
    alignSelf: "flex-end",
    margin: 12,
    color: "white !important",
  },
  divider: {
    borderWidth: 1,
    width: "100%",
    borderColor: theme["color-light-gray"],
  },
});
