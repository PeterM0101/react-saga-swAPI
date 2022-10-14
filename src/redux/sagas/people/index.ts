import { call, takeEvery, put, take, select, fork } from "redux-saga/effects";
import {
  ILocationChangeAction,
  PeopleAction,
  PersonAction,
} from "../../../type/action";
import { loadPeople, loadPeopleSuccess } from "../../slices/people";
import { LOCATION_CHANGE } from "connected-react-router";
import { DataType } from "../../../type/peoplePayloadType";
import { peopleSelector } from "../../selectors";
import { matchPath } from "react-router-dom";
import { DETAILS_ROUTE, MAIN_ROUTE } from "../../../Routes";
import {
  loadPerson,
  loadPersonFailure,
  loadPersonSuccess,
} from "../../slices/person";
import { Person } from "../../../type/person";

export function* loadPersonDetails({ payload }: PersonAction) {
  try {
    const response: Response = yield call(
      fetch,
      `https://swapi.dev/api/people/${payload}`
    );
    const data: Person = yield call(response.json.bind(response));
    yield put(loadPersonSuccess(data));
  } catch (e) {
    yield put(loadPersonFailure((e as Error).message));
  }
}

export function* loadPeopleList({ payload }: PeopleAction) {
  const { search = "", page = 1 } = payload;
  const response: Response = yield call(
    fetch,
    `https://swapi.dev/api/people?page=${page}&search=${search}`
  );
  const data: DataType = yield call(response.json.bind(response));

  const { results: people, count: total } = data;
  yield put(loadPeopleSuccess({ people, total }));
  console.log("people: ", people);
}

// watcher Saga
export function* routeChangeSaga() {
  while (true) {
    const action: ILocationChangeAction = yield take(LOCATION_CHANGE);

    if (matchPath(action.payload.location.pathname, MAIN_ROUTE)) {
      const { page, search } = yield select(peopleSelector);

      yield put({
        type: loadPeople.type,
        payload: { page, search },
      });
    }
    const details = matchPath(action.payload.location.pathname, DETAILS_ROUTE);
    if (details) {
      const payload = (details.params as { id: string }).id;
      yield put({ type: loadPerson.type, payload });
    }
  }
}

export function* peopleSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(loadPeople.type, loadPeopleList);
  yield takeEvery(loadPerson.type, loadPersonDetails);
}
