import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useCallback } from "react";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "./modules/user/authService";
import { setIsSignedIn } from "./modules/user/userStore";
import { HomeScreen } from "./screens/HomeScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { RootState } from "./shared/store/rootReducer";

const Stack = createStackNavigator();

export function Root() {
  const dispatch = useDispatch();

  const isSignedIn = useSelector(
    (state: RootState) => state.userReducer.isSignedIn
  );

  const handleLogout = useCallback(async () => {
    authService.setIsLoggedIn(false);
    authService.logout();
    dispatch(setIsSignedIn(false));
  }, [authService, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <Button title="Sign out" onPress={handleLogout} />
              ),
            }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: "Sign in" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
