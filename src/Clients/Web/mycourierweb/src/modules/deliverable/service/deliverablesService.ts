import axios, { AxiosResponse } from "axios";
import { serviceUrl } from "../../../shared/service/url";
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
      .get(`${serviceUrl.deliverablesServiceApiUrl}`)
      .then(res => {
        return res.data as Deliverable[];
      })
      .catch(err => {
        console.log(err);
        return [] as Deliverable[];
      });
  },

  async createDeliverable(deliverable: Deliverable) {
    return axios
      .post(`${serviceUrl.deliverablesServiceApiUrl}/create`, deliverable, {
        headers: {
          Authorization: "token"
        }
      })
      .then(() => {
        console.log("deliverableService: deliverable created");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
