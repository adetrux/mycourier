interface AuthService {
  getAuthString(): string;
  getToken(): string;
  setToken(token: string): void;
  isLoggedIn(): string;
  setIsLoggedIn(value: boolean): void;
  logout(): void;
}

export const authService: AuthService = {
  getAuthString() {
    return "Bearer ".concat(this.getToken());
  },

  getToken() {
    return localStorage.getItem("token") ? localStorage.getItem("token")! : "";
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  isLoggedIn() {
    return localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")!
      : "false";
  },

  setIsLoggedIn(value: boolean) {
    value
      ? localStorage.setItem("isLoggedIn", "true")
      : localStorage.setItem("isLoggedIn", "false");
  },

  logout() {
    this.setToken("");
    this.setIsLoggedIn(false);
  },
};
