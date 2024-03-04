import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddItemsActionPayload, IPageState, IPageWithStatus } from "./types";

const initialState: Record<number, IPageState> = {};

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<IPageWithStatus>) => {
      state[action.payload.page] = { items: [], status: action.payload.status };
    },
    addItems: (state, action: PayloadAction<IAddItemsActionPayload>) => {
      const page = state[action.payload.page];
      if (page) {
        page.items = action.payload.items;
      }
    },
    setPageStatus: (state, action: PayloadAction<IPageWithStatus>) => {
      const page = state[action.payload.page];
      if (page) {
        page.status = action.payload.status;
      }
    },
  },
});

export const { addPage, addItems, setPageStatus } = goodsSlice.actions;

export default goodsSlice.reducer;
