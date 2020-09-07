import { takeEvery, all ,takeLatest} from 'redux-saga/effects';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';

import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_INITIAL_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.SET_INGREDIENTS_INIT, initIngredientsSaga);

}
export function* watchOrders() {
    yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);//se proceseaza ultima acesare a evenimentului
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);

}