import React, { useState } from "react"
import SearchBar from "../../components/searchbar/SearchBar"
import "./properties.css"
import useProperties from "../../hooks/useProperties"
import { PuffLoader } from "react-spinners"
import PropertyCard from "../../components/propertyCard/PropertyCard"

const Properties = () => {
  const { data, isError, isLoading } = useProperties()

  const [filter, setFilter] = useState("")

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
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth prop-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data.residencies
            .filter(
              (property) =>
                property.title
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase()) ||
                property.city
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase()) ||
                property.country
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Properties
