import { LOCATION_CHANGE, RouterState } from "connected-react-router";
import { Action } from "@reduxjs/toolkit";

export interface PeopleAction {
  type: string;
  payload: {
    search: string;
    page: string;
  };
}

export interface PersonAction {
  type: string;
  payload: string;
}

export interface ILocationChangeAction extends Action {
  type: typeof LOCATION_CHANGE;
  payload: RouterState;
}
