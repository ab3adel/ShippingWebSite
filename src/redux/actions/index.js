export const setProfile = (data) => {
    return (dispatch) => {

        dispatch({
            type: "SET_PROFILE",
            payload: data,
        })

    };
}
export const clearProfile = () => {
    return (dispatch) => {

        dispatch({
            type: "Clear_PROFILE",
            payload: null,
        })

    };
}
export const refreshProfile = () => {
    return (dispatch) => {

        dispatch({
            type: "REFRESH_PROFILE",
            payload: null,
        })

    };
}
