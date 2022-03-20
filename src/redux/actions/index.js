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
<<<<<<< HEAD
export const setCountries= (data)=>{
    return (dispatch)=>{
        dispatch({
            type:'SET_COUNTRIES',
            paylaod:data
        })
    }
}
export const setCities= (data)=>{
    return (dispatch)=>{
        dispatch({
            type:'SET_CITIES',
            paylaod:data
        })
    }
}
=======
export const refreshProfile = () => {
    return (dispatch) => {

        dispatch({
            type: "REFRESH_PROFILE",
            payload: null,
        })

    };
}
>>>>>>> 020d688709a61424bc6e32bd749a673d8218e87d
