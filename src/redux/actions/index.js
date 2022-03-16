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