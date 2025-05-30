import React from 'react';
import stylex from '@stylexjs/stylex';
import { useRouter } from './app/useRouter';
import GameRoute from './route/GameRoute';

const styles = stylex.create({
  root: {
    display: 'flex',
    color: '#fff',
    minHeight: '100dvh',
    backgroundColor: '#110048',
  },
  center: {
    width: '100%',
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
  },
});

export default function App() {
  const route = useRouter();
  return (
    <div {...stylex.props(styles.root)}>
      {route.route === 'home' ? <GameRoute /> : null}
    </div>
  );
}
