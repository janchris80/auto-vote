import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { routes } from '../../../routes.js';
import BrandIcon from 'components/icon/BrandIcon';

export default function Sidebar() {
  const location = useLocation();
  const activeRoute = (routeName) => location.pathname.indexOf(routeName) > -1 ? "active" : "";

  return (
    <div className="sidebar" data-image='' data-color='white'>
      <div className="sidebar-wrapper">
        <div className="logo">
          <a
            href='https://d.buzz/'
            className="simple-text font-weight-bold text-black"
          >
            <BrandIcon />
          </a>
        </div>
        <Nav>
          {routes.map(({ path, name, icon, upgrade }, index) => {
            return <li
              key={index}
              className={upgrade ? "active active-pro" : activeRoute(path)} >
              <NavLink
                to={path}
                // className="nav-link text-black font-weight-light"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-black font-weight-light active"
                    : "nav-link text-black font-weight-light"
                }
              >
                <i className={icon} />
                <p>{name}</p>
              </NavLink>
            </li>
          })}
        </Nav>
      </div>
    </div>
  );
}