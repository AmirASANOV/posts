import { IGood } from "../../types/goods";

export enum StateStatus {
  fulfilled,
  pending,
  rejected,
}

export interface IPageState {
  items: IGood[];
  status: StateStatus;
}

export interface IPageWithStatus {
  page: number;
  status: StateStatus;
}

export interface IAddItemsActionPayload {
  items: IGood[];
  page: number;
}
