import { User } from ".prisma/client";
import { LoginData, SignupData } from "@utils/types";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider: React.FC = ({ children }) => {
  const auth = useAuthProvider();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};

function useAuthProvider() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const contextValue = useMemo(() => {
    return {
      email,
      password,
      setEmail,
      setPassword,
      loading,
      setLoading,
    };
  }, [email, password, setEmail, setPassword, loading, setLoading]);

  return contextValue;
}
