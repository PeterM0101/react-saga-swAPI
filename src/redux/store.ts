import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { peopleSlice } from "./slices/people";
import { personSlice } from "./slices/person";

export const history = createBrowserHistory();

const createRootReducer = (history: any) =>
  combineReducers({
    people: peopleSlice.reducer,
    person: personSlice.reducer,
    router: connectRouter(history),
  });

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [SagaMiddleware, routerMiddleware(history)],
  devTools: true,
});

SagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
