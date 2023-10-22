import React, { useContext, useEffect } from "react"
import Header from "../header/Header"
import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetails from "../../context/UserDetails"
import { useMutation } from "react-query"
import { createUser } from "../../utils/api"
import useFavorites from "../../hooks/useFavorites"
import useBookings from "../../hooks/useBookings"

const Layout = () => {
  useFavorites()
  useBookings()

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0()
  const { setUserDetails } = useContext(UserDetails)

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  })
  /* eslint-disable */
  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:5000",
          scope: "openid profile email",
        },
      })
      localStorage.setItem("access_token", res)
      setUserDetails((prev) => ({ ...prev, token: res }))
      mutate(res)
    }
    isAuthenticated && getTokenAndRegister()
  }, [isAuthenticated])
  /* eslint-enable */
  return (
    <>
      <div
      // style={{ background: "var(--black)", overflow: "hidden" }}
      >
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default Layout
