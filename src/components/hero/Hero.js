import React from "react"
import heroImg from "../../assets/heroImage.jpg"
import "./hero.css"
import CountUp from "react-countup"
import {motion} from 'framer-motion'
import SearchBar from "../searchbar/SearchBar"

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div />
            <motion.h1
            initial={{y:'2rem',opacity:'0'}}
            animate={{y:0,opacity:'1'}}
            transition={{
              duration:2,
              type:'spring'
            }}
            >
              Discover <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Find a variety of properties that suit you very easily
            </span>
            <span className="secondaryText">
              Forget all difficulties in finding a residence for you
            </span>
          </div>

          <SearchBar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8000} end={9000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Premium products</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp start={950} end={3000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy customers</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={40} />
                <span>+</span>
              </span>
              <span className="secondaryText">Award Winnings</span>
            </div>
          </div>
        </div>

        <div className="flexCenter hero-right">
          <motion.div
          initial={{x:'7rem',opacity:'0'}}
          animate={{x:0,opacity:'1'}}
          transition={{
            duration:2,
            type:'spring'
          }}
          className="image-container">
            <img src={heroImg} alt="hero-img" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
