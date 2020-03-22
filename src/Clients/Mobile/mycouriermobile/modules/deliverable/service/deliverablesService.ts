import axios, { AxiosResponse } from "axios";
import { serviceUrl } from "../../../shared/service/url";
import { Deliverable } from "../models/deliverable";

interface DeliverablesService {
  getDeliverables(): Promise<Deliverable[]>;
  updateDeliverable(
    id: string,
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

  async updateDeliverable(id: string, deliverable: Deliverable) {
    return axios
      .put(`${serviceUrl.deliverablesServiceApiUrl}/${id}`, deliverable)
      .catch(err => console.log(err));
  }
};
