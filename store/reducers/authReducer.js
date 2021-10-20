const initState = {
    isLoggedIn: false,
    loggedUser: null,
    accessToken: null,
    refreshToken: null,
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_FAILED":
            console.log('login failed', action.payload)
            return {
                ...state,
                isLoggedIn: false,
                authError: action.payload
            }

        case "LOGIN_SUCCESS":
            console.log('login success', action.payload.refresh);
            return {
                isLoggedIn: true,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                authError: null
            }

        case "LOGOUT_SUCCESS":
            console.log('logout success');
            return initState;

        case "LOAD_USER_SUCCESS":
            console.log('load user success');
            return {
                ...state,
                loggedUser: action.payload
            }

        case "LOAD_USER_FAILED":
            console.log('load user failed');
            return {
                ...state,
                loggedUser: null,
            }
        
        case "SIGNUP_SUCCESS":
            console.log('signup success');
            return {
                loggedUser: action.payload,
                authError: null
            }

        case "SIGNUP_FAILED":
            console.log('signup failed', action.payload);
            return {
                ...state,
                authError: action.payload
            }

        case "USER_AUTHORIZED":
            console.log('user authorized');
            return {
                loggedUser: action.payload,
                authError: null
            }
        case "USER_NOT_AUTHORIZED":
            console.log('user not authorized', action.payload);
            return {
                ...state,
                authError: null
            }



        default:
            return state;
    }
}

export default authReducer;