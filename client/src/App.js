import { Route } from 'react-router-dom';

import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Dashboard } from './components/pages/Dashboard';
import { AllBooks } from './components/pages/AllBooks';
import { AuthProvider } from './components/context/auth';
import AuthRoute from './lib/AuthRoute';
import { ProtectedRoute } from './lib/ProtectedRoute';

import './App.css';

function App() {

  return (
    <AuthProvider>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <ProtectedRoute exact path='/' component={Dashboard}/>
      <ProtectedRoute exact path='/all-books' component={AllBooks}/>
    </AuthProvider>
  );
}

export default App;
