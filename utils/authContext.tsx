import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  isReady?: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const authStorageKey = "auth-key";

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };
  const logout = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(authStorageKey);
        if (jsonValue != null) {
          const savedState = JSON.parse(jsonValue);
          setIsLoggedIn(savedState.isLoggedIn);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };
    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
