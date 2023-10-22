import React, { useContext, useState } from "react"
import "./property.css"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getProperty, removeBooking } from "../../utils/api"
import { PuffLoader } from "react-spinners"
import { AiTwotoneCar } from "react-icons/ai"
import { FaShower } from "react-icons/fa"
import { MdLocationPin, MdMeetingRoom } from "react-icons/md"
import Map from "../../components/map/Map"
import useAuthCheck from "../../hooks/useAuthCheck"
import { useAuth0 } from "@auth0/auth0-react"
import BookingModal from "../../components/bookingModal/BookingModal"
import UserDetails from "../../context/UserDetails"
import { Button } from "@mantine/core"
import { toast } from "react-toastify"
import Heart from "../../components/heart/Heart"

const Property = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  )

  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()
  const { user } = useAuth0()

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetails)

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking.id !== id),
      }))
      toast.success("Booking cancelled", { position: "bottom-right" })
    },
  })

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching property</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={id} />
        </div>

        <img src={data?.image} alt="property pic" />

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span> {data?.facilities.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span> {data?.facilities.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="1f3e72" />
                <span> {data?.facilities.bedrooms} Room</span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {" "}
              {data.description}
            </span>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} color="#1f3e72" />
              <span className="secondaryText">
                {data?.address},{data?.city},{data?.country}
              </span>
            </div>

            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => validateLogin() && setModalOpened(true)}
              >
                Book your visit
              </button>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>

          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property
