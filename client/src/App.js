import { useQuery, gql } from '@apollo/client';
import { Route } from 'react-router-dom';

import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Dashboard } from './components/pages/Dashboard';
import { AllBooks } from './components/pages/AllBooks';
import { AuthProvider } from './components/context/auth';
import AuthRoute from './lib/AuthRoute';
import { ProtectedRoute } from './lib/ProtectedRoute';

import './App.css';

const GET_ALL_BOOKS = gql`
  query getAllBooks {
  getAllBooks {
    title
    description
    author
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  console.log(data)

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
