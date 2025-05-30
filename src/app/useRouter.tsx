import { useState } from 'react';

export type SolveRoute = {
  route: 'solve';
  horizontalPositions;
  verticalPositions;
};

export type Route =
  | SolveRoute
  | {
      route: 'home';
    };

const resolveRoute = (path: string): Route => {
  if (!path) {
    return { route: 'home' };
  }

  //const base = path.split("/").filter(Boolean).slice(1);

  return { route: 'home' };
};

export const useRouter = () => {
  const initialRoute = resolveRoute(window.location?.pathname);

  const [route] = useState<Route>(initialRoute);
  return route;
};
