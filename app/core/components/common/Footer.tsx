import { Image, useQuery, useRouter } from "blitz"
import { ReactComponent as Phone } from "../../../../public/phone.svg"
import { ReactComponent as Email } from "../../../../public/email.svg"
import { ReactComponent as Facebook } from "../../../../public/facebook.svg"
import { ReactComponent as Instagram } from "../../../../public/instagram.svg"
import { ReactComponent as Logo } from "../../../../public/logo.svg"
import { motion } from "framer-motion"
import getContacts from "app/contacts/queries/getContacts"

const Footer = () => {
  const router = useRouter()

  const [{ contacts }] = useQuery(getContacts, {
    orderBy: { id: "asc" },
  })

  const contact = contacts[0]

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="logo">
            <Image src="/logo.svg" layout="intrinsic" width={150} height={150} alt="logo" />
          </div>
          <ul className="contact">
            <li className="title">İLETİŞİM</li>
            <li className="list-wrapper">
              <span className="icon">
                <Phone />
              </span>
              <span
                onClick={() => {
                  window.open(`tel:${contact?.phone}`)
                }}
                className="text"
              >
                {contact?.phone}
              </span>
            </li>
            <li className="list-wrapper">
              <span
                onClick={() => {
                  window.open(`mailto:${contact?.email}`)
                }}
                className="icon"
              >
                <Email />
              </span>
              <a className="text" href={`mailto:${contact?.email}`}>
                {contact?.email}
              </a>
            </li>
            <li className="list-wrapper">
              <span className="icon">
                <Facebook />
              </span>
              <a className="text" href={contact?.facebook}>
                {contact?.facebook}
              </a>
            </li>
            <li className="list-wrapper">
              <span className="icon">
                <Instagram />
              </span>
              <a className="text" href={contact?.instagram}>
                {contact?.instagram}
              </a>
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
                onClick={() => router.push("/")}
              >
                ANASAYFA
              </motion.span>{" "}
            </li>
            <li className="link">
              <span className="dot"></span>
              <motion.span
                onClick={() => router.push("/about")}
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
                onClick={() => router.push("/contact")}
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
