import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Image } from "blitz"
import { Link } from "blitz"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ReactComponent as AddPhoto } from "../../../../../public/admin-add-photo.svg"
import { ReactComponent as DeletePhoto } from "../../../../../public/admin-photo-delete.svg"
import { ReactComponent as Ok } from "../../../../../public/admin-ok-icon.svg"
import { ReactComponent as Cancel } from "../../../../../public/admin-cancel-icon.svg"
import Dropzone, { useDropzone } from "react-dropzone"
import { fromImage } from "imtool"

import { motion } from "framer-motion"
import Modal from "../Modal"
import { useMutation } from "blitz"
import Loader from "../Loader"

import { useQuery } from "blitz"
import Swal from "sweetalert2"
import createGallery from "app/galleries/mutations/createGallery"
import deleteGallery from "app/galleries/mutations/deleteGallery"
import getGalleries from "app/galleries/queries/getGalleries"

const Main: BlitzPage = () => {
  const [createReferenceMutation] = useMutation(createGallery)
  const [deleteReferenceMutation] = useMutation(deleteGallery)
  const [{ galleries }, { refetch }] = useQuery(getGalleries, {
    orderBy: { id: "asc" },
  })

  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [currentFiles, setCurrentFiles] = useState<any>([])
  const [sendFiles, setSendFiles] = useState<any>([])

  const maxSize = 5048576

  const onDrop = useCallback((acceptedFiles) => {
    setSendFiles([])
    setCurrentFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )

    acceptedFiles.map(async (file) => {
      const tool = await fromImage(file)
      const img = await tool.toDataURL()
      // let url = await getBase64(file)
      setSendFiles((prev) => {
        return [...prev, img]
      })
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
  })

  const deleteFile = (name) => {
    setCurrentFiles((prevFiles) => {
      let files = prevFiles.filter((file) => file.name !== name)
      return [...files]
    })
    currentFiles.filter((file) => file.name !== name)
  }

  const thumbs = currentFiles.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img key={file.name} src={file.preview} className="img" />
        <div className={"modify-button show"}>
          <motion.span
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="icon-wrapper"
            onClick={() => deleteFile(file.name)}
          >
            <DeletePhoto />
          </motion.span>
        </div>
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      currentFiles.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [currentFiles]
  )

  const addPhotos = async () => {
    setLoader(true)
    sendFiles.map(async (file) => {
      try {
        const sliderimage = await createReferenceMutation({ img: file })
        setLoader(false)
        setCurrentFiles([])
        setShowModal(false)
        refetch()
      } catch (error) {
        console.error(error)
      }
    })

    // let name = res.data.image.name;
    // try {
    //   const sliderimage = await createSliderimageMutation({name: name});
    //   console.log(sliderimage, "sliderimage");

    // } catch (error) {
    //   console.error(error)

    // }
  }

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Fotoyu sil",
      text: "Verileriniz kalıcı olarak silinecektir...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "İptal",
      confirmButtonText: "Sil",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePhoto(id, name)
      }
    })
  }

  const deletePhoto = async (id, name) => {
    setLoader(true)

    try {
      await deleteReferenceMutation({ id: id })
      setLoader(false)
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const disabled = currentFiles.length <= 0
  return (
    <div className="main-wrapper">
      <div className="title-wrapper">
        <div className="title">Galeri Fotoğraflarını Düzenleyin</div>
        <motion.div
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="button"
        >
          <span>Foto Ekle</span>
          <span>
            <AddPhoto />
          </span>
        </motion.div>
      </div>
      <div className="body-wrapper">
        {galleries.map((img) => (
          <div key={img.img} className="image">
            <Image
              priority={true}
              src={img.img}
              layout="fill"
              objectFit="cover"
              objectPosition="bottom center"
              alt={img.img}
            />
            <div className={"modify-button show"}>
              {/* <motion.span
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className='icon-wrapper'
              >
                <EditPhoto />
              </motion.span> */}
              <motion.span
                onClick={() => handleDelete(img.id, img.name)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="icon-wrapper"
              >
                <DeletePhoto />
              </motion.span>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        <div>
          <Dropzone onDrop={onDrop} minSize={0} maxSize={maxSize}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
              const isFileTooLarge = fileRejections.length > 0
              return (
                <div {...getRootProps()} className={"dropzone" + (isDragActive ? " active" : "")}>
                  <input {...getInputProps()} />

                  {isFileTooLarge ? (
                    <div className="text-danger mt-2">Dosya boyutu 1Mb ten küçük olmalı.</div>
                  ) : (
                    <p>Fotoğraflarınızı buraya sürükleyin...</p>
                  )}
                </div>
              )
            }}
          </Dropzone>
          <aside className="thumbsContainer">{thumbs}</aside>
          <div className="button-wrapper">
            <motion.div
              onClick={() => {
                if (!disabled) {
                  addPhotos()
                }
              }}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.9 } : {}}
              className={"button" + (disabled ? " disabled" : "")}
            >
              <span>Tamam</span>
              <span>
                <Ok />
              </span>
            </motion.div>
            <motion.div
              onClick={() => setShowModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="button cancel"
            >
              <span>İptal</span>
              <span>
                <Cancel />
              </span>
            </motion.div>
          </div>
        </div>
      </Modal>
      {loader && <Loader />}
    </div>
  )
}

Main.suppressFirstRenderFlicker = true
Main.getLayout = (page) => <Layout title="Main">{page}</Layout>

export default Main
