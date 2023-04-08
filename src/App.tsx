import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { renderRouter } from './routes';
import { store } from './state/store';

const App: React.FC = () => {
  return (
    <>
      <ReduxProvider store={store}>
        {renderRouter()}
      </ReduxProvider>
    </>
  );
};

export default App;