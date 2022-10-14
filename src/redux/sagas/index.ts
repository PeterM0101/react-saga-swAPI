import { call, all, spawn } from "redux-saga/effects";
import { peopleSaga } from "./people";

export default function* rootSaga() {
  // one of optimal ways to organize root saga, cons - impossible to handle errors
  // yield spawn(saga1);
  // yield spawn(saga2);
  // yield spawn(saga3);

  // better way to call sagas
  console.log("Saga");
  const sagas = [peopleSaga];

  const retrySagas = sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.error(e);
        }
      }
    })
  );

  yield all(retrySagas);
}
