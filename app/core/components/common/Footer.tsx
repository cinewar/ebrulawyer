import { Image } from "blitz"
import { ReactComponent as Phone } from "../../../../public/phone.svg"
import { ReactComponent as Email } from "../../../../public/email.svg"
import { ReactComponent as Facebook } from "../../../../public/facebook.svg"
import { ReactComponent as Instagram } from "../../../../public/instagram.svg"
import { ReactComponent as Logo } from "../../../../public/logo.svg"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="logo">
            <Logo />
          </div>
          <ul className="contact">
            <li className="title">İLETİŞİM</li>
            <li className="list-wrapper">
              <span className="icon">
                <Phone />
              </span>
              <span className="text">555 555 55 55</span>
            </li>
            <li className="list-wrapper">
              <span className="icon">
                <Email />
              </span>
              <span className="text">test@gmail.com</span>
            </li>
            <li className="list-wrapper">
              <span className="icon">
                <Facebook />
              </span>
              <span className="text">test@facebook.com</span>
            </li>
            <li className="list-wrapper">
              <span className="icon">
                <Instagram />
              </span>
              <span className="text">test@instagram.com</span>
            </li>
          </ul>
          <ul className="site-map">
            <li className="title"> SİTE HARİTASI</li>
            <li className="link">
              <span className="dot"></span>
              <motion.span
                whileHover={{ color: "#ff8066", scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className="text"
              >
                ANASAYFA
              </motion.span>{" "}
            </li>
            <li className="link">
              <span className="dot"></span>
              <motion.span
                whileHover={{ color: "#ff8066", scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className="text"
              >
                HAKKIMIZDA
              </motion.span>{" "}
            </li>
            <li className="link">
              <span className="dot"></span>
              <motion.span
                whileHover={{ color: "#ff8066", scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className="text"
              >
                İLETİŞİM
              </motion.span>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right">Copyright 2021 by sam</div>
    </>
  )
}

export default Footer
