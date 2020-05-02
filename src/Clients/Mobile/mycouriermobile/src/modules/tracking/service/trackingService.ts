import axios, { AxiosResponse } from "axios";
import { serviceUrl } from "../../../shared/service/url";
import { authService } from "../../user/authService";
import { Location } from "../models/location";

interface TrackingService {
  setLocation(location: Location): Promise<void | AxiosResponse<any>>;
}

export const trackingService: TrackingService = {
  async setLocation(location: Location) {
    const authString = await authService.getAuthString();
    return axios
      .put(`${serviceUrl.trackingServiceApiUrl}`, location, {
        headers: {
          Authorization: authString,
        },
      })
      .catch((err) => console.log(err));
  },
};
