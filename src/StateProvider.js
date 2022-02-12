import React ,{createContext,useContext,useReducer} from "react";
export const StateContext= createContext(); //datalayer lives
export const StateProvider=({
    reducer,initialState,children})=>(<StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
    </StateContext.Provider>//setup data layer
    );
export const useStateValue=()=> useContext(StateContext);//pul info from data layer