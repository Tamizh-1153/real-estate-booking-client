import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"
import "./value.css"
import { MdOutlineArrowDropDown } from "react-icons/md"
import value from "../../assets/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge.jpg"
import data from "../../utils/accordion"
import { useState } from "react"

const Value = () => {
  const [className, setClassName] = useState(null)
  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        <div className="v-left">
          <div className="image-container">
            <img src={value} alt="values" />
          </div>
        </div>
        <div className="flexColStart v-right">
          <span className="orangeText">Our Value</span>
          <span className="primaryText">Value we give to you</span>
          <span className="secondaryText">
            We always ready to help by providing the best services for you.{" "}
            <br /> We believe a good place to live can make your life better
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map((item, i) => {
              return (
                <AccordionItem
                  key={i}
                  uuid={i}
                  className={`accordionItem ${className}`}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordion-button">
                      <AccordionItemState>
                        {({ expanded }) =>
                          {expanded
                            ? setClassName("expanded")
                            : setClassName("collapsed")}
                        }
                      </AccordionItemState>
                      <div className="flexCenter icon">{item.icon}</div>
                      <span className="primaryText">{item.heading}</span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Value
