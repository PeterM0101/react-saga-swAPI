import { RootState } from "./store";

export const peopleSelector = (state: RootState) => state.people;
export const personSelector = (state: RootState) => state.person;
