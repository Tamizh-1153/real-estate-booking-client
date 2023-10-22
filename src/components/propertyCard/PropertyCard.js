import React from "react"
import "./propertyCard.css"
import { truncate } from "lodash"
import { useNavigate } from "react-router-dom"
import Heart from "../heart/Heart"

const PropertyCard = ({ card }) => {

  const navigate =useNavigate()

  return (
    <div
      className="flexColStart r-card "
      onClick={() => navigate(`../properties/${card._id}`)}
    >
      <Heart id={card?._id} />
      <img src={card.image} alt="property pic" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 80 })}
      </span>
    </div>
  )
}

export default PropertyCard
