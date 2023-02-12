import React from 'react'
import { useState } from 'react'

import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';
import styles from '../style';


const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className='w-full flex pt-6 justify-between items-center navbar'>
      <h1 className={`${styles.navText} px-6 font-poppins`}>logo</h1>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <CustomLink to={`${nav.id}`} id={nav.id} index = {index}>
            {nav.title}
          </CustomLink>
        ))}
      </ul>
    </nav>
  )
}

function CustomLink({ to, id, index, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path : resolvedPath.pathname, end : true})
  return (
    <React.Fragment key={id}>
      <li className={`font-poppins font-normal  cursor-pointer text-1xl ${styles.navText} mr-10 ${index == navLinks.length - 1 ? 'mr-0' : 'mr-10'} ${ isActive === to ? "active" : ""} text-white`}>
        <Link className="text-white hover:bg-stone-700" to={to} {...props}>
          {children}
        </Link>
      </li>
    </React.Fragment>
  )
}
export default Navbar