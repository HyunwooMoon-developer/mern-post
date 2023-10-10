import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import AuthProvider from './context/auth';
import client from './client';
import NavMenu from './components/NavMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import AuthRoute from './utils/AuthRoute';
import Register from './pages/Register';
import Post from './pages/Post';

const App = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </ApolloProvider>
);

export default App;
