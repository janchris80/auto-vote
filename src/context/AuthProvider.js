import { createContext, useEffect, useState } from "react";
import { getAuthenticatedUser } from 'lib/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [proof, setProof] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authorityType, setAuthorityType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getAuthenticatedUser()
      .then((data) => {
        const { username, authenticated, proof, } = data;
        // Access and use the data from the resolved promise result
        if (authenticated) {
          setIsAuthenticated(true)
          setUsername(username);
          setProof(proof)
          // setAuthorityType(authority_type);
        } else {
          navigate('/login', { replace: true });
        }
      })
      .catch(error => {
        // Handle any errors that occur during the promise execution
        console.error("Error fetching authenticated user:", error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ username, authorityType, isAuthenticated, proof }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };