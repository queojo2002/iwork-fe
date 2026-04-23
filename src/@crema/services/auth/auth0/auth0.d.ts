// Stub declarations for @auth0/auth0-spa-js (not installed, used only in legacy auth0Config)
declare module '@auth0/auth0-spa-js' {
  export interface Auth0ClientOptions {
    clientId: string;
    domain: string;
    authorizationParams?: {
      redirect_uri?: string;
      audience?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
  export interface Auth0Client {
    loginWithRedirect(options?: any): Promise<void>;
    getTokenSilently(options?: any): Promise<string>;
    getUser(): Promise<any>;
    logout(options?: any): void;
    isAuthenticated(): Promise<boolean>;
    handleRedirectCallback(): Promise<any>;
    [key: string]: any;
  }
  export function createAuth0Client(options: Auth0ClientOptions): Promise<Auth0Client>;
}

// Stub declarations for @auth0/auth0-react (not installed, used only in legacy AuthHooks / Auth0Provider)
declare module '@auth0/auth0-react' {
  import { ReactNode } from 'react';
  export interface Auth0ProviderProps {
    domain: string;
    clientId: string;
    authorizationParams?: {
      redirect_uri?: string;
      [key: string]: any;
    };
    children?: ReactNode;
    [key: string]: any;
  }
  export const Auth0Provider: React.FC<Auth0ProviderProps>;
  export function useAuth0(): {
    user?: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginWithRedirect(options?: any): Promise<void>;
    logout(options?: any): void;
    getAccessTokenSilently(options?: any): Promise<string>;
    [key: string]: any;
  };
}
