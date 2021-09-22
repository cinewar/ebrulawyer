import { BlitzPage, dynamic } from "blitz"
import { useState } from "react"
import { ReactComponent as AddPhoto } from "../../../../../public/admin-add-card-icon.svg"
import { ReactComponent as DeletePhoto } from "../../../../../public/admin-photo-delete.svg"
import { ReactComponent as EditPhoto } from "../../../../../public/admin-photo-edit.svg"
import { object, string } from "yup"

import { motion } from "framer-motion"
import Modal from "../Modal"

import { useQuery, useMutation } from "blitz"
import { Field, Form, Formik } from "formik"
import Loader from "app/core/components/common/Loader"
import Swal from "sweetalert2"
import createAboutus from "app/aboutuses/mutations/createAboutus"
import updateAboutus from "app/aboutuses/mutations/updateAboutus"
import deleteAboutus from "app/aboutuses/mutations/deleteAboutus"
import getAboutuses from "app/aboutuses/queries/getAboutuses"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
})

const Main: BlitzPage = () => {
  const [loader, setLoader] = useState(false)

  const [createAboutUsMutation] = useMutation(createAboutus)
  const [updateAboutUsMutation] = useMutation(updateAboutus)
  const [deleteAboutUsMutation] = useMutation(deleteAboutus)
  const [{ aboutuses }, { refetch }] = useQuery(getAboutuses, {
    orderBy: { id: "asc" },
  })

  const [showModal, setShowModal] = useState(false)

  const [initialValues, setİnitialValues] = useState({
    title: "",
    subtitle: "",
    body: "",
  })

  const [editId, setEditId] = useState<any>()

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
      await deleteAboutUsMutation({ id: id })
      setLoader(false)
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="main-wrapper">
      <div className="title-wrapper">
        <div className="title">Hakkımızda Textleri</div>
        <motion.div
          onClick={() => {
            setShowModal(true)
            setİnitialValues({
              title: "",
              subtitle: "",
              body: "",
            })
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="button"
        >
          <span>Kart Ekle</span>
          <span>
            <AddPhoto />
          </span>
        </motion.div>
      </div>
      <div className="body-wrapper">
        {aboutuses.map((slide) => (
          <div className="card">
            <div className="card-wrapper">
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
                  const aboutuscard = await createAboutUsMutation(values)
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
                    const aboutuscard = await updateAboutUsMutation({ id: editId, ...values })
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
