import React from 'react'
import { useState } from 'react'


import { Link, useMatch, useResolvedPath} from 'react-router-dom';


const navLinks = [
  {
    id: "/home",
    title: "Home",
  },
  {
    id: "/sendemail",
    title: "Send Email",
  },
];

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  // my styles
  navText: "text-1xl md:text-2xl lg:text-3xl"
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    // <nav className='w-full flex pt-6 justify-between items-center navbar'>
    //   <h1 className={`${styles.navText} px-6 font-poppins`}>logo</h1>

    //   <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
    //     {navLinks.map((nav, index) => (
    //       <CustomLink to={`${nav.id}`} id={nav.id} index = {index}>
    //         {nav.title}
    //       </CustomLink>
    //     ))}
    //   </ul>
    // </nav>

      <nav className='flex py-6 justify-between items-center navbar'>
        <h1 className={`${styles.navText} px-6 font-poppins`}>logo</h1>

        <ul className='list-none flex justify-end items-center flex-1'>
          {navLinks.map((nav, index) => (
            <CustomLink to={`${nav.id}`} id={nav.id} index = {index}>
              {nav.title}
            </CustomLink>
          ))}
        </ul>

      {/* <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? "../../assets/close.svg" : "../../assets/menu.svg"}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle((prev) => !prev)}
          />

          <div
            className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-2-[140px] rounded-xl sidebar`}
            >
              <ul className='list-none flex flex-col justify-end items-center flex-1'>
                {navLinks.map((nav, index) => (
                  <CustomLink to={`${nav.id}`} id={nav.id} index = {index} className={`font-poppins font-normal cursor-pointer text-[16px] ${index == navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-white`}>
                      {nav.title}
                  </CustomLink>
                ))}
              </ul>
            </div>
      </div> */}


      </nav>



    
  )
}

function CustomLink({ to, id, index, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path : resolvedPath.pathname, end : true})
  console.log('id for li is :', id)
  return (
    <React.Fragment key={id}>
      <li key={id} className={`font-poppins font-normal  cursor-pointer text-1xl ${styles.navText} mr-10 ${index == navLinks.length - 1 ? 'mr-0' : 'mr-10'} ${ isActive === to ? "active" : ""} text-white`}>
        <Link className="text-white hover:bg-stone-700" to={to} {...props}>
          {children}
        </Link>
      </li>
    </React.Fragment>
  )

}

export default Navbar