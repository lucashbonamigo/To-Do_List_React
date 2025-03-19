import './App.css';
import { Provider } from "./components/ui/provider";
import UserContextProvider from './hooks/UserContext';
import AppRoutes from './services/routes';

function App() {
  return (
    <Provider>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </Provider>
  );
}

export default App;