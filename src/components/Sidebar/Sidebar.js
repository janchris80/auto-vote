import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { protectedRoute, notProtectedRoute } from '../../routes.js';
import { useAuth } from 'hooks/AuthContext';
import Link from './Link';

export default function Sidebar() {

  const { isLoggedIn } = useAuth();

  return (
    <div className="sidebar" >
      <div className="sidebar-wrapper bg-white">
        <div className="logo">
          <NavLink
            to='/'
            className="simple-text font-weight-bold text-black"
            activeClassName="active"
          >
            <i className='text-red'>Hive</i>Vote
          </NavLink>
        </div>
        <Nav>
          {
            isLoggedIn
              ? protectedRoute.map((prop, index) => <Link {...prop} key={index} />)
              : notProtectedRoute.map((prop, index) => <Link {...prop} key={index} />)
          }
        </Nav>
      </div>
    </div>
  );
}