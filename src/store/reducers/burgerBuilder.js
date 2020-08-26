import * as actionsTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES={
    salad: 0.5,
    bacon:0.7,
    chesse: 0.4,
    meat: 1.3

};
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false
};
const addIngredient=(state,action)=>{
    const updateIngredient={ [action.ingredientName]: state.ingredients[action.ingredientName]+1};
    const updateIngredients=updateObject(state.ingredients,updateIngredient);
    const updatedState={
        ingredients:updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state,updatedState);
}
const removeIngredient=(state,action)=>{
    const updateIng={ [action.ingredientName]: state.ingredients[action.ingredientName]-1};
    const updateIngre=updateObject(state.ingredients,updateIng);
    const updatedSt={
        ingredients:updateIngre,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state,updatedSt);
}
const setIngredients=(state,action)=>{
    return updateObject(state,{ ingredients:{ 
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        chesse: action.ingredients.chesse,
        meat: action.ingredients.meat},
    error: false,
    totalPrice: 4,
    building: false});
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:return addIngredient(state,action);
        case actionsTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionsTypes.SET_INGREDIENTS: return setIngredients(state,action);
        case actionsTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state,{error: true});
        default:return state;
    } };

export default reducer;