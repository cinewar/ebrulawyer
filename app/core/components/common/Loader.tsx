import { motion, useCycle } from "framer-motion"

const loaderVariants = {
  animationOne: {
    x: [-80, 80],
    y: [0, -120],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 1,
      },
      y: {
        yoyo: Infinity,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
}

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-body">
        <motion.div
          className="loader"
          variants={loaderVariants}
          animate="animationOne"
        ></motion.div>
      </div>
    </div>
  )
}

export default Loader
