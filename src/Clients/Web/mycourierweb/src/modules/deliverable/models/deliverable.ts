export interface Deliverable {
  id: string;
  createdTime: number;
  name: string;
  start: number;
  end: number;
  accepted: boolean;
  delivering: boolean;
  delivered: boolean;
}
