import axios from "axios";
import { service } from "../../../shared/service/service";
import { Deliverable } from "../models/deliverable";

interface DeliverablesService {
  getDeliverables(): Promise<Deliverable[]>;
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
  }
};
