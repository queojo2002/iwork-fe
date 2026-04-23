import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthUserType } from "@crema/types/models/AuthUser";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import abpClient from "@crema/services/api/abpClient";
import { connectToken, saveTokens, clearTokens, getAccessToken, getRefreshToken, refreshToken } from "./index";

// ---------------------------------------------------------------------------
// Context types
// ---------------------------------------------------------------------------

interface AbpAuthContextProps {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AbpAuthActionsProps {
  signInUser: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

const AbpAuthContext = createContext<AbpAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true
});

const AbpAuthActionsContext = createContext<AbpAuthActionsProps>({
  signInUser: async () => {},
  logout: () => {}
});

export const useAbpAuth = () => useContext(AbpAuthContext);
export const useAbpAuthActions = () => useContext(AbpAuthActionsContext);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Lấy thông tin user hiện tại từ ABP account API
 * GET /api/account/my-profile
 */
const fetchCurrentUser = async (): Promise<AuthUserType> => {
  const { data } = await abpClient.get("/api/account/my-profile");
  return {
    uid: data.id,
    displayName: data.name || data.userName,
    email: data.email,
    photoURL: data.photoUrl ?? undefined,
    role: data.roles ?? []
  };
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AbpAuthProviderProps {
  children: ReactNode;
  fetchStart: () => void;
  fetchSuccess: () => void;
  fetchError: (message: string) => void;
}

const AbpAuthProvider: React.FC<AbpAuthProviderProps> = ({ children, fetchStart, fetchSuccess, fetchError }) => {
  const [authData, setAuthData] = useState<AbpAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Lắng nghe event 401 từ abpClient interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      setAuthData({ user: null, isAuthenticated: false, isLoading: false });
    };
    window.addEventListener("abp:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("abp:unauthorized", handleUnauthorized);
  }, []);

  // Khôi phục session khi reload trang
  useEffect(() => {
    const restoreSession = async () => {
      const token = getAccessToken();
      if (!token) {
        setAuthData({ user: undefined, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const user = await fetchCurrentUser();
        setAuthData({ user, isAuthenticated: true, isLoading: false });
      } catch {
        // Token hết hạn — thử refresh
        const rToken = getRefreshToken();
        if (rToken) {
          try {
            const newTokens = await refreshToken(rToken);
            saveTokens(newTokens);
            const user = await fetchCurrentUser();
            setAuthData({ user, isAuthenticated: true, isLoading: false });
            return;
          } catch {
            // refresh cũng thất bại
          }
        }
        clearTokens();
        setAuthData({ user: undefined, isAuthenticated: false, isLoading: false });
      }
    };

    restoreSession();
  }, []);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const signInUser = async ({ email, password }: { email: string; password: string }) => {
    fetchStart();
    try {
      const tokenResponse = await connectToken(email, password);
      saveTokens(tokenResponse);

      const user = await fetchCurrentUser();
      setAuthData({ user, isAuthenticated: true, isLoading: false });
      fetchSuccess();
    } catch (error: any) {
      clearTokens();
      setAuthData({ ...authData, isAuthenticated: false, isLoading: false });
      const message =
        error?.response?.data?.error_description ??
        error?.response?.data?.error ??
        "Đăng nhập thất bại. Kiểm tra lại email và mật khẩu.";
      fetchError(message);
    }
  };

  const logout = () => {
    clearTokens();
    setAuthData({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AbpAuthContext.Provider value={authData}>
      <AbpAuthActionsContext.Provider value={{ signInUser, logout }}>{children}</AbpAuthActionsContext.Provider>
    </AbpAuthContext.Provider>
  );
};

export default AbpAuthProvider;
