import { Image, Link } from "blitz"
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <Image src="/logo.svg" layout="intrinsic" width={80} height={80} alt="logo" />
        </div>
        <ul className="link-wrapper">
          <motion.li className="link active">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Anasayfa</motion.div>
            </Link>
          </motion.li>
          <li className="link">
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Hakkımızda</motion.div>
            </Link>
          </li>
          <li className="link">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>İletişim</motion.div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
