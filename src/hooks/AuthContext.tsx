// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { axiosInstance } from "../services/api-client";





// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (access: string, refresh: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
//   useEffect(() => {
//     const accessToken = localStorage.getItem("access")
//     // const decoded = jwtDecode(accessToken!);

//     if (accessToken) {
//       setIsAuthenticated(true);
//     console.log(accessToken);
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     } else {
//       setIsAuthenticated(false);
      
//       // delete axiosInstance.defaults.headers.common['Authorization'];
//     }
//   }, []);

//   const login = (access: string, refresh: string) => {
//     localStorage.setItem("access", access);
//     localStorage.setItem("refresh", refresh);
//     setIsAuthenticated(true);
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
//   };

//   const logout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     setIsAuthenticated(false);
//     delete axiosInstance.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
