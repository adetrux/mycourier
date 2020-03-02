import axios, { AxiosResponse } from "axios";
import { service } from "../../../shared/service/service";
import { Deliverable, DeliverableToCreate } from "../models/deliverable";

interface DeliverablesService {
  getDeliverables(): Promise<Deliverable[]>;
  createDeliverable(
    deliverable: DeliverableToCreate
  ): Promise<void | AxiosResponse<any>>;
}

export const deliverablesService: DeliverablesService = {
  async getDeliverables() {
    return axios
      .get(`${service.serviceBaseUrl}`)
      .then(res => {
        return res.data as Deliverable[];
      })
      .catch(err => {
        console.log(err);
        return [] as Deliverable[];
      });
  },

  async createDeliverable(deliverable: DeliverableToCreate) {
    return axios
      .post(`${service.serviceBaseUrl}/create`, deliverable, {
        headers: {
          Authorization: "token"
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
