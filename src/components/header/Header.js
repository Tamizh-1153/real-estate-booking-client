import React, { useState } from "react"
import logo from "../../assets/logo.png"
import "./header.css"
import { BiMenuAltRight } from "react-icons/bi"
import OutsideClickHandler from "react-outside-click-handler"
import { Link, NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import ProfileMenu from "../profilemenu/ProfileMenu"
import AddPropertyModal from "../addPropertyModal/AddPropertyModal"
import useAuthCheck from "../../hooks/useAuthCheck"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  const [modalOpened,setModalOpened] = useState(false)
  const {validateLogin}=useAuthCheck()

  const getMenuStyles = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpen && "-100%" }
    }
  }

  const handleAddProperty=()=>{
    if(validateLogin){
      setModalOpened(true)
    }
  }

  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">
        <Link to="/">
          <img src={logo} alt="logo" width={150} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpen(false)}>
          <div className=" flexCenter h-menu" style={getMenuStyles(menuOpen)}>
            <NavLink to="/properties">Properties</NavLink>

            <a href="mailto:tamizhwork@gmail.com">Contact</a>

            <div style={{cursor:'pointer'}} onClick={handleAddProperty}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            
            { !isAuthenticated ? (
              <button className="button" onClick={()=>loginWithRedirect()}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  )
}

export default Header
