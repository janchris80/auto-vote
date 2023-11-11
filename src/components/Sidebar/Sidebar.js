import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { routes } from '../../routes.js';
import Link from './Link';

export default function Sidebar() {

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
          {routes.map((prop, index) => {
            return <Link {...prop} key={index} />
          })}
        </Nav>
      </div>
    </div>
  );
}