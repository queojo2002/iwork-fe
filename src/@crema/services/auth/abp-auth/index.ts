import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID as string;
const SCOPE = import.meta.env.VITE_AUTH_SCOPE as string;

const TOKEN_KEY = 'abp_access_token';
const REFRESH_KEY = 'abp_refresh_token';

export interface AbpTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

/**
 * Gọi POST /connect/token với grant_type=password
 * Trả về token response từ OpenIddict
 */
export const connectToken = async (
  username: string,
  password: string,
): Promise<AbpTokenResponse> => {
  const params = new URLSearchParams({
    grant_type: 'password',
    client_id: CLIENT_ID,
    username,
    password,
    scope: SCOPE,
  });

  const { data } = await axios.post<AbpTokenResponse>(
    `${BASE_URL}/connect/token`,
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return data;
};

/**
 * Gọi POST /connect/token với grant_type=refresh_token
 */
export const refreshToken = async (
  token: string,
): Promise<AbpTokenResponse> => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    refresh_token: token,
  });

  const { data } = await axios.post<AbpTokenResponse>(
    `${BASE_URL}/connect/token`,
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return data;
};

/** Lưu token vào localStorage */
export const saveTokens = (tokenResponse: AbpTokenResponse) => {
  localStorage.setItem(TOKEN_KEY, tokenResponse.access_token);
  if (tokenResponse.refresh_token) {
    localStorage.setItem(REFRESH_KEY, tokenResponse.refresh_token);
  }
};

/** Xóa token khỏi localStorage */
export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);
