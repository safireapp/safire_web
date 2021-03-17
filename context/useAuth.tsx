import { User } from ".prisma/client";
import { SignupData } from "@utils/types";
import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider: React.FC = ({ children }) => {
  const auth = useAuthProvider();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};

function useAuthProvider() {
  const [user, setUser] = useState<User>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [errors, setErrors] = 
  const [loading, setLoading] = useState<boolean>(false)

  const signup = async (userDetails: SignupData) => {
    const { data } = await axios.post("/api/signup");
    setUser(data);
  };

  const contextValue = useMemo(() => {
    return { user, signup, email, password, setEmail, setPassword, loading };
  }, [user, signup, email, password, setEmail, setPassword, loading]);

  return contextValue;
}
