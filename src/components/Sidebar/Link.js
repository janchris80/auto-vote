import { useLocation, NavLink } from 'react-router-dom';

export default function Link({ path, icon, name, upgrade }) {

  const location = useLocation();

  const activeRoute = (routeName) => location.pathname.indexOf(routeName) > -1 ? "active" : "";

  const isUpgrade = upgrade ? "active active-pro" : activeRoute(path);

  return <li className={isUpgrade} >
    <NavLink
      to={path}
      // className={`nav-link text-black font-weight-light` + activeRoute}
      className="nav-link text-black font-weight-light"
      activeClass="active"
    >
      <i className={icon} />
      <p>{name}</p>
    </NavLink>
  </li>
}