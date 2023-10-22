import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVERURL}/api/v1`,
})

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/all", {
      timeout: 10 * 1000,
    })
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    })
    if (response.status === 400 || response.status === 500) {
      throw response.data
    }
    return response.data
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `residency/book/${propertyId}`,
      { email, id: propertyId, date: dayjs(date).format("DD/MM/YYYY") },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `residency/bookings/cancel/${id}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const toggleFav = async (id, email, token) => {
  try {
    await api.post(
      `residency/toggle_fav/${id}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const getAllFav = async (email, token) => {
  if (!token) return
  try {
    const res= await api.post(
      `residency/favorite/all`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return (res.data.favRes.favResidenciesID)
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const getAllBookings = async (email, token) => {
  if (!token) return
  try {
    const res = await api.post(
      `residency/bookings/all`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log(res.data.bookedVisits)
    return res.data.bookedVisits
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const createResidency= async (data, token) => {
  if (!token) return
  try {
    await api.post(
      `residency/create`,
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}