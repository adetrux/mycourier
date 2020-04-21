export interface Deliverable {
  id: string;
  createdTime: number;
  name: string;
  customerId?: string;
  customerUserName?: string;
  startLocationLatitude: number;
  startLocationLongitude: number;
  destinationLocationLatitude: number;
  destinationLocationLongitude: number;
  courierId?: string;
  courierUserName?: string;
  accepted: boolean;
  delivering: boolean;
  delivered: boolean;
}
