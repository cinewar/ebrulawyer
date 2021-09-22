import { BlitzPage, dynamic } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Image } from "blitz"
import { Link } from "blitz"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ReactComponent as AddPhoto } from "../../../../../public/admin-add-card-icon.svg"
import { ReactComponent as DeletePhoto } from "../../../../../public/admin-photo-delete.svg"
import { ReactComponent as EditPhoto } from "../../../../../public/admin-photo-edit.svg"
import { ReactComponent as Ok } from "../../public/images/admin-ok-icon.svg"
import { ReactComponent as Cancel } from "../../public/images/admin-cancel-icon.svg"
import Dropzone, { useDropzone } from "react-dropzone"
import { fromImage } from "imtool"
import { object, string } from "yup"

import { motion } from "framer-motion"
import Modal from "../Modal"
import getSlides from "app/slides/queries/getSlides"
// import Modal from '../Modal'
// import axios from 'axios'
// import { useMutation } from 'blitz'
// import createSliderimage from 'app/sliderimages/mutations/createSliderimage'
// import Loader from '../Loader'
// import getSliderimages from 'app/sliderimages/queries/getSliderimages'
import { useQuery, useMutation } from "blitz"
import { Field, Form, Formik } from "formik"
import createSlide from "app/slides/mutations/createSlide"
import Loader from "app/core/components/common/Loader"
import updateSlide from "app/slides/mutations/updateSlide"
import deleteSlide from "app/slides/mutations/deleteSlide"
// import deleteSliderimage from 'app/sliderimages/mutations/deleteSliderimage'
import Swal from "sweetalert2"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

const Main: BlitzPage = () => {
  const maxSize = 5048576

  const [loader, setLoader] = useState(false)

  const [createSlideMutation] = useMutation(createSlide)
  const [updateSlideMutation] = useMutation(updateSlide)
  const [deleteSlideMutation] = useMutation(deleteSlide)
  const [{ slides }, { refetch }] = useQuery(getSlides, {
    orderBy: { id: "asc" },
  })

  const [currentFiles, setCurrentFiles] = useState<any>()
  const [sendFiles, setSendFiles] = useState<any>()
  const [showModal, setShowModal] = useState(false)

  const [initialValues, setİnitialValues] = useState({
    img: "",
    title: "",
    subtitle: "",
    body: "",
  })

  const [editId, setEditId] = useState<any>()

  const onDrop = useCallback(async (acceptedFiles) => {
    setCurrentFiles(null)
    setSendFiles(null)
    console.log(acceptedFiles)
    setCurrentFiles(acceptedFiles[0])
    const tool = await fromImage(acceptedFiles[0])
    const img = await tool.scale(1920, 1080).toDataURL()
    setSendFiles(img)
    return img
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  const handleDelete = (id) => {
    Swal.fire({
      title: "Kartı sil",
      text: "Verileriniz kalıcı olarak silinecektir !!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "İptal",
      confirmButtonText: "Sil",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePhoto(id)
      }
    })
  }

  const deletePhoto = async (id) => {
    setLoader(true)
    try {
      await deleteSlideMutation({ id: id })
      setLoader(false)
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  // const disabled = currentFiles.length <= 0
  return (
    <div className="main-wrapper">
      <div className="title-wrapper">
        <div className="title">Slider Foto ve Textleri </div>
        <motion.div
          onClick={() => {
            setShowModal(true)
            setİnitialValues({
              img: "",
              title: "",
              subtitle: "",
              body: "",
            })
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="button"
        >
          <span>Slide Ekle</span>
          <span>
            <AddPhoto />
          </span>
        </motion.div>
      </div>
      <div className="body-wrapper">
        {slides.map((slide) => (
          <div className="card">
            <div className="card-wrapper">
              <div className="image">
                <Image
                  priority={true}
                  key={slide.img}
                  src={
                    slide.img
                      ? slide.img
                      : "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  }
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={slide.img}
                />
              </div>
              <div className="header">{slide.title}</div>
              <div className="subtitle">{slide.subtitle}</div>
              <div className="body" dangerouslySetInnerHTML={{ __html: slide.body }}></div>
              <div className={"modify-button show"}>
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="icon-wrapper"
                  onClick={() => {
                    slide.body = slide.body.length > 11 ? slide.body : ""
                    setİnitialValues(slide)
                    setEditId(slide.id)
                    setShowModal(true)
                  }}
                >
                  <EditPhoto />
                </motion.span>
                <motion.span
                  onClick={() => handleDelete(slide.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="icon-wrapper"
                >
                  <DeletePhoto />
                </motion.span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        <div className="form-wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={object({
              img: string().required("Bu alan boş bırakılamaz"),
              title: string().required("Bu alan boş bırakılamaz"),
              subtitle: string().required("Bu alan boş bırakılamaz"),
              body: string().required("Bu alan boş bırakılamaz"),
            })}
            onSubmit={async (values) => {
              console.log(values)

              // console.log(editId)
              const addCard = async () => {
                setLoader(true)
                try {
                  const aboutuscard = await createSlideMutation(values)
                  setLoader(false)
                  setShowModal(false)
                  refetch()
                } catch (error) {
                  console.error(error)
                }
              }
              const editCard = async (id) => {
                setLoader(true)
                const editWithoutImage = async () => {
                  try {
                    const aboutuscard = await updateSlideMutation({ id: editId, ...values })
                    setLoader(false)
                    setShowModal(false)
                    setEditId(null)
                    refetch()
                  } catch (error) {
                    console.error(error)
                  }
                }
                editWithoutImage()
              }
              if (!editId) {
                addCard()
              } else {
                editCard(editId)
              }
            }}
          >
            {({ isSubmitting, values, errors, touched, setFieldValue }) => (
              <Form>
                <Field
                  name="img"
                  render={() => {
                    return (
                      <>
                        <div className="label">Photo:</div>
                        <motion.div whileHover={{ scale: 1.05, border: "blue 1px dashed" }}>
                          <Dropzone
                            onDrop={async (acceptedFiles) => {
                              let newImg = await onDrop(acceptedFiles)
                              console.log(newImg)
                              setFieldValue("img", newImg)
                            }}
                            minSize={0}
                            maxSize={maxSize}
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              isDragReject,
                              fileRejections,
                            }) => {
                              const isFileTooLarge = fileRejections.length > 0
                              return (
                                <>
                                  <div
                                    {...getRootProps()}
                                    className={"dropzone" + (isDragActive ? " active" : "")}
                                  >
                                    <input {...getInputProps()} />
                                    {isFileTooLarge ? (
                                      <div>Dosya boyutu 1Mb ten küçük olmalı.</div>
                                    ) : (
                                      <p>
                                        {/* {imgName.length > 0 ? imgName.slice(0, 20) + "..." : "Foto"} */}
                                      </p>
                                    )}
                                    <span className="button">Ekle</span>
                                  </div>
                                </>
                              )
                            }}
                          </Dropzone>
                        </motion.div>
                        {values.img && (
                          <div className="thumbnail-wrapper">
                            <img className="thumbnail" src={values.img} alt="" />

                            <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                              <button onClick={() => setFieldValue("img", "")}>Sil</button>
                            </motion.span>
                          </div>
                        )}
                      </>
                    )
                  }}
                />
                {errors.img && touched.img ? <div className="error">{errors.img}</div> : null}
                <Field
                  name="title"
                  render={({ field, form: { isSubmitting } }) => (
                    <>
                      <div className="label">Başlık:</div>
                      <motion.input
                        whileHover={{ scale: 1.05, border: "blue 1px dashed" }}
                        {...field}
                        type="text"
                        placeholder="Başlık"
                      />
                    </>
                  )}
                />
                {errors.title && touched.title ? <div className="error">{errors.title}</div> : null}
                <Field
                  name="subtitle"
                  render={({ field, form: { isSubmitting } }) => (
                    <>
                      <div className="label">Alt Başlık:</div>
                      <motion.input
                        whileHover={{ scale: 1.05, border: "blue 1px dashed" }}
                        {...field}
                        type="text"
                        placeholder="Alt Başlık"
                      />
                    </>
                  )}
                />
                {errors.subtitle && touched.subtitle ? (
                  <div className="error">{errors.subtitle}</div>
                ) : null}
                <Field
                  name="body"
                  render={({ field, form: { isSubmitting } }) => (
                    <>
                      <div className="label">Açıklama:</div>
                      <motion.div whileHover={{ scaleX: 1.05, border: "blue 1px dashed" }}>
                        <SunEditor
                          {...field}
                          setOptions={{
                            height: 200,
                          }}
                          onChange={(acceptedFiles) => {
                            if (acceptedFiles.length > 11) {
                              setFieldValue("body", acceptedFiles)
                            } else {
                              setFieldValue("body", "")
                            }
                          }}
                          defaultValue={values.body.length > 11 ? values.body : null}
                        />
                      </motion.div>
                    </>
                  )}
                />
                {errors.body && touched.body ? <div className="error">{errors.body}</div> : null}
                <div className="button-wrapper">
                  <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    <button type="submit">Kaydet</button>
                  </motion.span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      {loader && <Loader />}
    </div>
  )
}

export default Main
