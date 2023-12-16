import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authRecuder = (isAuthent, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return isAuthent;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [isAuthent, dispatch] = useReducer(authRecuder, { user: null });
  console.log("AuthContext state : ", isAuthent);

  return (
    <AuthContext.Provider value={{ ...isAuthent, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
