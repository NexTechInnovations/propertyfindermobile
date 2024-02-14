import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Button, Divider } from "@ui-kitten/components";
import { ReactElement, useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

interface CustomBottomSheetProps {
  children: ReactElement;
  renderCloseButton: () => ReactElement;
  onClose: () => void;
}

const CustomBottomSheet = ({
  children,
  renderCloseButton = () => <Text>Show 0000 results</Text>,
  onClose,
}: CustomBottomSheetProps) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClose = () => bottomSheetRef.current?.close();

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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.contentContainer}>
        {children}

        <View style={styles.footer}>
          <Divider style={styles.divider} />
          <Button
            style={styles.button}
            onPress={() => {
              onClose();
              handleClose();
            }}
          >
            {renderCloseButton}
          </Button>
        </View>
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
