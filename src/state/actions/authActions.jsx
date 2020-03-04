import firebase from 'firebase'

export const signIn = (creds) => {
    return (dispatch, getState) => {

        firebase.login({
            email: creds.email,
            password: creds.password
        }).then(() => {
            dispatch({type: "LOGIN_SUCCESS"});
        }).catch((err) => {
            dispatch({type: "LOGIN_ERROR", err});
        })
    }
}

export const signOut = () => {
    return (dispatch, getState) => {
        firebase.logout().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        }
    )};
}