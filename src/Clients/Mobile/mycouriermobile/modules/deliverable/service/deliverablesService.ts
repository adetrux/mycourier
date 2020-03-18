import axios from "axios";
import { serviceUrl } from "../../../shared/service/url";
import { Deliverable } from "../models/deliverable";

interface DeliverablesService {
  getDeliverables(): Promise<Deliverable[]>;
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
  }
};
