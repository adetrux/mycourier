export interface Deliverable {
  id: string;
  createdTime: number;
  name: string;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  startLocationLatitude: number;
  startLocationLongitude: number;
  destinationLocationLatitude: number;
  destinationLocationLongitude: number;
  accepted: boolean;
  delivering: boolean;
  delivered: boolean;
}
