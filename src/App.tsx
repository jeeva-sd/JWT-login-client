import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderRouter } from './routes';
import { store } from './state/store';

const App: React.FC = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <ToastContainer />
        {renderRouter()}
      </ReduxProvider>
    </>
  );
};

export default App;