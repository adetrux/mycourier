import axios, { AxiosResponse } from "axios";
import { service } from "../../../shared/service/service";
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
      .get(`${service.deliverablesServiceApiUrl}`)
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
      .post(`${service.deliverablesServiceApiUrl}/create`, deliverable, {
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
