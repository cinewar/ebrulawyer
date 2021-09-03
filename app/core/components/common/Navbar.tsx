import { Image, Link, useRouter } from "blitz"
import { motion } from "framer-motion"
import { ReactComponent as OpenMenu } from "../../../../public/open-menu.svg"

const Navbar = () => {
  const router = useRouter()

  const pathItems = router.pathname.split("/")

  const navPath = pathItems[1]

  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <Image src="/logo.svg" layout="intrinsic" width={80} height={80} alt="logo" />
        </div>
        <ul className="link-wrapper">
          <motion.li className={"link " + (navPath === "" ? " active" : "")}>
            <Link href="/">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Anasayfa</motion.div>
            </Link>
          </motion.li>
          <li className={"link " + (navPath === "about" ? " active" : "")}>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>Hakkımızda</motion.div>
            </Link>
          </li>
          <li className={"link " + (navPath === "contact" ? " active" : "")}>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.1, color: "#3A001E" }}>İletişim</motion.div>
            </Link>
          </li>
        </ul>
        <div className="menu">
          <OpenMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
