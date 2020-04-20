import axios, { AxiosResponse } from "axios";
import { serviceUrl } from "../../../shared/service/url";
import { authService } from "../../user/authService";
import { Deliverable } from "../models/deliverable";

interface DeliverablesService {
  getDeliverables(): Promise<Deliverable[]>;
  createDeliverable(
    deliverable: Deliverable
  ): Promise<void | AxiosResponse<any>>;
}

export const deliverablesService: DeliverablesService = {
  async getDeliverables() {
    return axios
      .get(`${serviceUrl.deliverablesServiceApiUrl}`, {
        headers: {
          Authorization: authService.getAuthString(),
        },
      })
      .then((res) => {
        return res.data as Deliverable[];
      })
      .catch((err) => {
        console.log(err);
        authService.logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        return [] as Deliverable[];
      });
  },

  async createDeliverable(deliverable: Deliverable) {
    return axios
      .post(`${serviceUrl.deliverablesServiceApiUrl}/create`, deliverable, {
        headers: {
          Authorization: "token",
        },
      })
      .then(() => {
        console.log("deliverableService: deliverable created");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
