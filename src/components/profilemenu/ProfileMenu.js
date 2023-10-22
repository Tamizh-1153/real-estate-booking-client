import { Avatar, Menu } from "@mantine/core"
import React from "react"
import { useNavigate } from "react-router-dom"

const ProfileMenu = ({ user, logout }) => {

  const navigate = useNavigate()
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favorites", { replace: true })}>
          Favorites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear()
            logout()
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu