import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import sidebarRoutes from 'routes/sidebarRoutes';

export default function Sidebar({ color, image }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
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
          {sidebarRoutes.map((prop, index) => {
            return <li
              className={
                prop.upgrade
                  ? "active active-pro"
                  : activeRoute(prop.path)
              }
              key={index}
            >
              <NavLink
                to={prop.path}
                className="nav-link"
                activeClassName="active"
              >
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </NavLink>
            </li>
          })}
        </Nav>
      </div>
    </div>
  );
}