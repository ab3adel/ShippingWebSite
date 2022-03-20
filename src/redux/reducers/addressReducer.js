const defaultState = {
    countries: [],
    cities:[]


};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_COUNTRIES": return state.countries;
        case "GET_CITIES" : return state.cities;
        case "SET_COUNTRIES": return { ...state, countries: action.payload };
        case "SET_CITIES": return {...state,cities:action.payload}
      
        default: return state

    }
}
export default reducer