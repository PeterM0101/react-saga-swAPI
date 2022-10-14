import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../type/person";
import { PeoplePayloadType } from "../../type/peoplePayloadType";

interface PeopleState {
  people?: Person[];
  total?: number;
  page?: number;
  isLoading?: boolean;
  search?: string;
  error?: string | null;
}

const initialState: PeopleState = {
  people: [],
  total: 0,
  page: 1,
  isLoading: false,
  search: "",
  error: null,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    loadPeople: (state, action: PayloadAction<PeoplePayloadType>) => {
      const { page = 1, search = "" } = action.payload;
      state.page = page;
      state.search = search;
      state.isLoading = true;
      state.error = null;
    },
    loadPeopleSuccess: (state, action: PayloadAction<PeopleState>) => {
      state.people = action.payload.people;
      state.isLoading = false;
      state.error = null;
      state.total = action.payload.total;
    },
    loadPeopleFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadPeople, loadPeopleSuccess, loadPeopleFailure } =
  peopleSlice.actions;
