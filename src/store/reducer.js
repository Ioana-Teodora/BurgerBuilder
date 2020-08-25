import * as actionsTypes from './actions';

const INGREDIENT_PRICES={
    salad: 0.5,
    bacon:0.7,
    chesse: 0.4,
    meat: 1.3

};
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        chesse: 0,
        meat: 0

    },
    totalPrice: 4
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionsTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
    }
    return state;
};

export default reducer;