import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { FacebookButton } from "../components/FacebookButton";
import { AppleButton } from "../components/AppleButton";
import { OrDivider } from "../components/OrDivider";
import { PasswordInput } from "../components/PasswordInput";
import { useAuth } from "../hooks/useAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useUser } from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";

export const SignUpScreen = () => {
  const { googleAuth } = useAuth();
  const navigation = useNavigation();

  const { login } = useUser();
  const auth = FIREBASE_AUTH;

  const signup = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = response.user;

      login({
        ID: userData.uid,
        firstName: "Saif",
        lastName: "Mohamed",
        email: userData.email,
        allowsNotifications: true,
        accessToken: userData.stsTokenManager.accessToken,
        refreshToken: userData.refreshToken,
      });

      navigation.navigate("Search");
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <View style={styles.container}>
          <Text category={"h5"} style={styles.header}>
            Sign Up
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required("Your email is required."),
              password: yup
                .string()
                .required("A password is required.")
                .matches(
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                  "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                ),
            })}
            onSubmit={(values) => signup(values.email, values.password)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => {
              return (
                <>
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Your Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoCorrect={false}
                    label="Email"
                    onBlur={() => setFieldTouched("email")}
                    caption={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    status={touched.email && errors.email ? "danger" : "basic"}
                  />
                  <PasswordInput
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Your Password"
                    label="Password"
                    onBlur={() => setFieldTouched("password")}
                    caption={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                    status={
                      touched.password && errors.password ? "danger" : "basic"
                    }
                  />

                  <Button
                    style={styles.signUpButton}
                    onPress={() => handleSubmit()}
                  >
                    Sign Up
                  </Button>

                  <OrDivider style={styles.orContainer} />

                  <GoogleButton
                    text="Sign up with Google"
                    style={styles.button}
                    onPress={async () => await googleAuth()}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { textAlign: "center", marginVertical: 20 },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: { alignItems: "flex-end", marginTop: 5 },
  signUpButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
});
