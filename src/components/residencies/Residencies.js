import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "./residencies.css"
import { sliderSettings } from "../../utils/common"
import SliderButtons from "./SliderButtons"
import PropertyCard from "../propertyCard/PropertyCard"
import useProperties from "../../hooks/useProperties"
import { PuffLoader } from "react-spinners"

const Residencies = () => {

  const { data, isError, isLoading } = useProperties()

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
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
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
            <SliderButtons />
          {data.residencies.slice(0,8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Residencies
