import React, { useContext, useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import useAuthCheck from "../../hooks/useAuthCheck"
import { useMutation } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetails from "../../context/UserDetails"
import { toggleFav } from "../../utils/api"


const Heart = ({id}) => {
  const [heartColor, setHeartColor] = useState("white")
  const { validateLogin } = useAuthCheck()
  const { user } = useAuth0()
  const {
    userDetails: { favorites, token },
    setUserDetails,
  } = useContext(UserDetails)
  /* eslint-disable */
  useEffect(() => {
    setHeartColor(() => checkFav(id, favorites))
  }, [favorites])
  /* eslint-enable */
  const updateFav = (id, favorites) => {
    if (favorites?.includes(id)) {
      return favorites.filter((item) => item !== id)
    } else {
      return [...favorites, id]
    }
  }

  const checkFav = (id, favorites) => {
    return favorites?.includes(id) ? "#fa3ef5" : "white"
  }

  const { mutate } = useMutation({
    mutationFn: () => toggleFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favorites: updateFav(id, prev.favorites),
      }))
    },
  })

  const handleLike = () => {
    if (validateLogin()) {
      mutate()
      setHeartColor((prev) => (prev === "#fa3ef5" ? "white" : "#fa3ef5"))
    }
  }
  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation()
        handleLike()
      }}
    />
  )
}

export default Heart
