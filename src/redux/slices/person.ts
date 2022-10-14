import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../type/person";

interface PersonState {
  isLoading?: boolean;
  error?: string | null;
  person?: Person | null;
}

const initialState: PersonState = {
  isLoading: false,
  error: null,
  person: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPerson: (state, action: PayloadAction<{ payload: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    loadPersonSuccess: (state, action: PayloadAction<Person | null>) => {
      state.person = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loadPersonFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadPersonSuccess, loadPersonFailure, loadPerson } =
  personSlice.actions;
