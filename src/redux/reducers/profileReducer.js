const defaultState = {
    profile: null,
    refreshProfile: true


};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_PROFILE": return state;
        case "SET_PROFILE": return { ...state, profile: action.payload };
        case "Clear_PROFILE": return { ...state, profile: null };
        case "REFRESH_PROFILE": return { ...state, refreshProfile: !state.refreshProfile };
        default: return state

    }
}
export default reducer