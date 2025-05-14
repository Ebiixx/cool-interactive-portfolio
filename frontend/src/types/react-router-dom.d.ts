declare module 'react-router-dom' {
  // React Router DOM v5 Exporte
  export function useHistory(): {
    push: (path: string, state?: any) => void;
    replace: (path: string, state?: any) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    location: Location;
  };
  
  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  };

  export function useParams<T extends Record<string, string>>(): T;
  
  // Weitere benötigte Exporte hier hinzufügen

  export interface LinkProps {
    to: string | {
      pathname: string;
      search?: string;
      hash?: string;
      state?: any;
    };
    replace?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  
  export function Link(props: LinkProps): JSX.Element;
  
  export function BrowserRouter(props: { children: React.ReactNode }): JSX.Element;
  export function Routes(props: { children: React.ReactNode }): JSX.Element;
  export function Route(props: { 
    path: string;
    element: React.ReactNode;
  }): JSX.Element;
  
  export function Navigate(props: { 
    to: string;
    replace?: boolean;
  }): JSX.Element;
  
  export function Outlet(): JSX.Element;

  export const useNavigate: () => (path: string, options?: { replace?: boolean, state?: any }) => void;
  export const Navigate: (props: { to: string, replace?: boolean }) => JSX.Element;
  export const Link: React.FC<{to: string, replace?: boolean, state?: any, children?: React.ReactNode}>;
  export const Routes: React.FC<{children?: React.ReactNode}>;
  export const Route: React.FC<{path: string, element: React.ReactNode}>;
  export const BrowserRouter: React.FC<{children?: React.ReactNode}>;
  // Weitere benötigte Exporte
}