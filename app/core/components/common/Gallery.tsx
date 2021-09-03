import { Image, Link } from "blitz"
import { motion, AnimatePresence } from "framer-motion"
import { ReactComponent as Look } from "../../../../public/search.svg"
import { ReactComponent as Left } from "../../../../public/photo-left.svg"
import { ReactComponent as Right } from "../../../../public/photo-right.svg"
import { ReactComponent as Close } from "../../../../public/close.svg"
import { ReactComponent as MoreArrow } from "../../../../public/more-arrow.svg"
import { useState } from "react"

const Gallery = () => {
  const [showPhoto, setShowPhoto] = useState(false)
  return (
    <>
      <section className="gallery">
        <div className="container">
          <div className="images-wrapper-1">
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGxhd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper" onClick={() => setShowPhoto(true)}>
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1502700807168-484a3e7889d0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fGxhd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper">
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1505488387362-48bc38155987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGxhd3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper">
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1447968954315-3f0c44f7313c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxhd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper">
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1617203443952-6d2619f7ff4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGxhd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper">
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIyfHxsYXd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
              <div className="look-wrapper">
                <span className="look">
                  <Look />
                </span>
              </div>
            </div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="more-button-wrapper"
            >
              <span className="more-button">Devam Et</span>
              <span className="icon-wrapper">
                <MoreArrow />
              </span>
            </motion.div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            key="photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
            }}
            className="show-photo-wrapper"
          >
            <motion.span
              key="close"
              onClick={() => setShowPhoto(false)}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              className="close"
            >
              <Close />
            </motion.span>
            <div className="image">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGxhd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                layout="fill"
                objectPosition="bottom center"
                objectFit="cover"
                alt="logo"
              />
            </div>
            <motion.span whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.2 }} className="left">
              <Left />
            </motion.span>
            <motion.span whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.2 }} className="right">
              <Right />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
