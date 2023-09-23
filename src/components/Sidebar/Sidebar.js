import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { protectedRoute, notProtectedRoute } from '../../routes.js';
import { useAuth } from 'hooks/AuthContext';
import Link from './Link';

export default function Sidebar({ color, image }) {

  const { isLoggedIn } = useAuth();

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo">
          <NavLink
            to='/'
            className="simple-text"
            activeClassName="active"
          >
            HiveVote
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