import axios from "axios";
import { serviceUrl } from "../../shared/service/url";
import { authService } from "./authService";

interface UserService {
  login(email: string, password: string): Promise<boolean>;
}

export const userService: UserService = {
  async login(email: string, password: string) {
    return axios
      .post(`${serviceUrl.usersServiceApiUrl}/login`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          authService.setToken(res.data.token);
          authService.setIsLoggedIn(true);
          return true;
        }

        return false;
      })
      .catch(() => {
        return false;
      });
  },
};
