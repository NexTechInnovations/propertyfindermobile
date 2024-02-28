import { View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { PasswordInput } from "../components/PasswordInput";
import { OrDivider } from "../components/OrDivider";
import { useAuth } from "../hooks/useAuth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useUser } from "../hooks/useUser";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const { googleAuth } = useAuth();
  const { login } = useUser();

  const auth = FIREBASE_AUTH;
  const provider = new GoogleAuthProvider();

  const signin = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
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
            Sign In
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required("Your email is required."),
              password: yup.string().required("A password is required."),
            })}
            onSubmit={(values) => signin(values.email, values.password)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldTouched,
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
                    label="Email"
                    autoCorrect={false}
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

                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text category={"c1"} status={"info"}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>

                  <Button
                    style={styles.signInButton}
                    onPress={() => handleSubmit()}
                  >
                    Sign In
                  </Button>

                  <TouchableOpacity
                    style={styles.dontHaveAccountContainer}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text category={"c1"} status={"info"}>
                      Don't have an account ? Register.
                    </Text>
                  </TouchableOpacity>

                  {/* <OrDivider style={styles.orContainer} />
                  <GoogleButton
                    text="Continue with Google"
                    style={styles.button}
                    onPress={signInWithGoogle}
                  /> */}
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
  dontHaveAccountContainer: { alignItems: "center", marginTop: 12 },

  signInButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
});
