import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { routes } from '../../routes.js';
import Link from './Link';
import useAuth from 'hooks/useAuth.js';

export default function Sidebar() {

  const { isAuthenticated } = useAuth();


  return (
    <div className="sidebar" >
      <div className="sidebar-wrapper bg-white">
        <div className="logo">
          <NavLink
            to='/'
            className="simple-text font-weight-bold text-black"
          >
            <i className='text-red'>Hive</i>Vote
          </NavLink>
        </div>
        <Nav>
          {/* {
            isLoggedIn
              ? protectedRoute.map((prop, index) => <Link {...prop} key={index} />)
              : notProtectedRoute.map((prop, index) => <Link {...prop} key={index} />)
          } */}
          {
            routes.map((prop, index) => <Link {...prop} key={index} />)
          }
        </Nav>
      </div>
    </div>
  );
}