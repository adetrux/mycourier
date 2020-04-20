import { AsyncStorage } from "react-native";

interface AuthService {
  getAuthString(): Promise<string>;
  getToken(): Promise<string>;
  setToken(token: string): void;
  isLoggedIn(): Promise<boolean>;
  setIsLoggedIn(value: boolean): void;
  logout(): void;
}

export const authService: AuthService = {
  async getAuthString() {
    return "Bearer ".concat(await this.getToken());
  },

  async getToken() {
    return await AsyncStorage.getItem("@token")
      .then((token) => {
        if (token !== null) {
          return token;
        } else {
          return "";
        }
      })
      .catch(() => {
        return "";
      });
  },

  async setToken(token: string) {
    await AsyncStorage.setItem("@token", token);
  },

  async isLoggedIn() {
    return await AsyncStorage.getItem("@isLoggedIn")
      .then((value) => {
        if (value !== null) {
          return value === "true" ? true : false;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },

  async setIsLoggedIn(value: boolean) {
    value
      ? await AsyncStorage.setItem("@isLoggedin", "true")
      : await AsyncStorage.setItem("@isLoggedin", "false");
  },

  logout() {
    this.setIsLoggedIn(false);
  },
};
