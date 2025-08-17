import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore'
import ServiceStore from './store/ServiceStore'
import './index.css';

interface State{
  userstore: UserStore,
  servicestore: ServiceStore
}

const userstore = new UserStore()
const servicestore = new ServiceStore()

export const Context = createContext<State>({
  userstore, servicestore 
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      userstore, servicestore
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

