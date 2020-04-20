import React, { useCallback, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { authService } from "../modules/user/authService";
import { userService } from "../modules/user/userService";
import { setIsSignedIn } from "../modules/user/userStore";
import { colors } from "../res/colors";

export function SignInScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignin = useCallback(async () => {
    const loginSuccess = await userService.login(email, password);
    if (loginSuccess) {
      console.log("success");
      authService.setIsLoggedIn(true);
      dispatch(setIsSignedIn(true));
    } else {
      console.log("nem jo");
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoFocus={true}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title="Sign in" onPress={handleSignin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    marginTop: 12,
    marginBottom: 6,
    width: "80%",
    backgroundColor: colors.lightBlue,
    height: 50,
    padding: 10,
  },
});
