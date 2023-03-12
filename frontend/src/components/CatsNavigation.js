import { NavLink } from 'react-router-dom'

import classes from './CatsNavigation.module.css'

function CatsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/cats"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Cats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cats/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Cat
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default CatsNavigation