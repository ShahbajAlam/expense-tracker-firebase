import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext(null);

const init = {
    isAuth: false,
    userName: "",
    photo: "",
    userID: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "loggedin":
            return {
                ...state,
                isAuth: true,
                userName: action.payload.userName,
                photo: action.payload.photo,
                userID: action.payload.userID,
            };
        case "loggedout":
            return init;
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem("auth")) || init;

    const [{ isAuth, userName, photo, userID }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const value = {
        isAuth,
        userName,
        photo,
        userID,
        dispatch,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error(
            "You are trying to access the context outside of its provider"
        );
    return context;
};

export { AuthProvider, useAuth };
