import { BlitzPage, useRouter } from "blitz"
import { ReactComponent as AdminBar } from "../../../../public/admin-bar.svg"
import { ReactComponent as Notification } from "../../../../public/admin-notification.svg"
import { ReactComponent as Logout } from "../../../../public/admin-logout.svg"
import { ReactComponent as Close } from "../../../../public/admin-close-sidebar.svg"
import { useRecoilState } from "recoil"
import { sideState } from "../../../../utils/global"
import { motion } from "framer-motion"
import { useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

const AdminNavbar = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const [sidebarState, setSidebarState] = useRecoilState(sideState)
  return (
    <>
      <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} className="left">
        <span onClick={() => setSidebarState(!sidebarState)}>
          {sidebarState ? <Close /> : <AdminBar />}
        </span>
      </motion.div>
      <div className="right">
        <span className="notification-wrapper">
          <span className="badge">5</span>
          <motion.span
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <Notification />
          </motion.span>
        </span>
        <motion.span
          onClick={async () => {
            router.push("/")
            await logoutMutation()
          }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: "flex", cursor: "pointer" }}
          className="logout-wrapper"
        >
          <Logout />
        </motion.span>
      </div>
    </>
  )
}

export default AdminNavbar
