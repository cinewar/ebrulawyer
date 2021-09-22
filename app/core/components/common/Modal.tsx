import { BlitzPage } from "blitz"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ReactComponent as Close } from "../../../../public/modal-close-icon.svg"
import { ReactNode } from "react"

interface ModalInterFace {
  show: boolean
  setShow: Function
  children?: ReactNode
}

const Modal: BlitzPage<ModalInterFace> = (props: ModalInterFace) => {
  const { show, setShow } = props
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    setShowModal(show)
  }, [show])
  const wrapVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh", transition: { duration: 1 } },
    show: { opacity: 1, y: "0", transition: { delay: 0.5 } },
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          variants={wrapVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="modal-wrapper"
          onClick={(e) => {
            if (e.currentTarget == e.target) {
              setShow(false)
            }
          }}
        >
          <motion.div variants={modalVariants} className="modal">
            <div className="close-modal-wrapper">
              <span className="close-modal" onClick={() => setShow(false)}>
                <Close />
              </span>
            </div>
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
