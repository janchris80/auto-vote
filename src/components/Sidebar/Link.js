import { useAuth } from 'hooks/AuthContext';
import { useLocation, NavLink } from 'react-router-dom';

export default function Link({ path, icon, name, upgrade }) {

  const location = useLocation();

  const activeRoute = (routeName) => location.pathname.indexOf(routeName) > -1 ? "active" : "";

  return <li
    className={
      upgrade
        ? "active active-pro"
        : activeRoute(path)
    }
  >
    <NavLink
      to={path}
      className="nav-link text-black font-weight-light"
      activeClassName="active"
    >
      <i className={icon} />
      <p>{name}</p>
    </NavLink>
  </li>
}