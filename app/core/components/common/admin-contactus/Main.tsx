import { BlitzPage, dynamic } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ReactComponent as AdminMail } from "../../../../../public/admin-form-mail-icon.svg"
import { ReactComponent as AdminPhone } from "../../../../../public/admin-form-phone-icon.svg"
import { ReactComponent as AdminFacebook } from "../../../../../public/admin-form-facebook-icon.svg"
import { ReactComponent as AdminInstagram } from "../../../../../public/admin-form-instagram-icon.svg"
import { ReactComponent as Facebook } from "../../../../../public/admin-facebook-icon.svg"
import { ReactComponent as Instagram } from "../../../../../public/admin-instagram-icon.svg"
import { ReactComponent as Phone } from "../../../../../public/admin-phone-icon.svg"
import { ReactComponent as EditContact } from "../../../../../public/admin-edit-icon.svg"
import { ReactComponent as Mail } from "../../../../../public/admin-mail-icon.svg"
import { ReactComponent as ContactSvg } from "../../../../../public/contact.svg"

import { motion } from "framer-motion"
import Modal from "../Modal"
import { useMutation } from "blitz"
import Loader from "../Loader"
import { useQuery } from "blitz"
import Swal from "sweetalert2"
import { Field, Form, Formik } from "formik"
import { useRecoilState } from "recoil"
import createContact from "app/contacts/mutations/createContact"
import deleteContact from "app/contacts/mutations/deleteContact"
import getContacts from "app/contacts/queries/getContacts"
import updateContact from "app/contacts/mutations/updateContact"

const Main: BlitzPage = () => {
  const [initialValues, setInitialValues] = useState({
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
  })

  const [createContactMutation] = useMutation(createContact)
  const [updateContactMutation] = useMutation(updateContact)
  const [deleteContactMutation] = useMutation(deleteContact)
  const [{ contacts }, { refetch }] = useQuery(getContacts, {
    orderBy: { id: "asc" },
  })

  useEffect(() => {
    let contact = contacts[0]
    setInitialValues({
      email: contact.email,
      phone: contact.phone,
      facebook: contact.facebook,
      instagram: contact.instagram,
    })
  }, [contacts])

  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleDelete = (id) => {
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
        deletePhoto(id)
      }
    })
  }

  const deletePhoto = async (id) => {
    setLoader(true)
    try {
      await deleteContactMutation({ id: id })
      setLoader(false)
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="main-wrapper">
      <div className="title-wrapper">
        <div className="title">İletişim Bilgilerini Düzenleyin</div>
        <motion.div
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="button"
        >
          <span>Düzenle</span>
          <span>
            <EditContact />
          </span>
        </motion.div>
      </div>
      <div className="contact-body-wrapper">
        <div className="card">
          <div className="contact-inner-wrapper">
            {contacts[0] ? (
              <>
                <div className="items">
                  <div className="item">
                    <span className="icon">
                      <Mail />
                    </span>
                    <span>{contacts[0] && contacts[0].email}</span>
                  </div>
                  <div className="item">
                    <span className="icon">
                      <Phone />
                    </span>
                    <span>{contacts[0] && contacts[0].phone}</span>
                  </div>
                  <div className="item">
                    <span className="icon">
                      <Facebook />
                    </span>
                    <span>{contacts[0] && contacts[0].facebook}</span>
                  </div>
                  <div className="item">
                    <span className="icon">
                      <Instagram />
                    </span>
                    <span>{contacts[0] && contacts[0].instagram}</span>
                  </div>
                </div>
              </>
            ) : (
              <div>İletişim Bilgilerinizi Ekleyin</div>
            )}
          </div>
          <div className="contact-svg">
            <ContactSvg className="svg" />
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        <div className="form-wrapper">
          <Formik
            initialValues={initialValues}
            // validationSchema={object({
            //   img: mixed().test('The file is too large', value => {
            //     console.log(value.size)
            //     return true
            //   }),
            //   title: string().required('Bu alan boş bırakılamaz'),
            //   body: string().required('Bu alan boş bırakılamaz')
            // })}
            onSubmit={async (values) => {
              setLoader(true)
              let id = contacts[0].id
              try {
                const contact = await updateContactMutation({ ...values, id })
                setLoader(false)
                setShowModal(false)
                refetch()
                setLoader(false)
              } catch (error) {
                console.error(error)
              }
            }}
          >
            <Form>
              <div className="form-inner-wrapper">
                <Field
                  name="email"
                  render={({ field, form: { isSubmitting } }) => (
                    <div>
                      <div className="label">Email:</div>
                      <motion.div className="input-with-icon" whileHover={{ scale: 1.05 }}>
                        <span className="button">
                          <AdminMail />
                        </span>
                        <input {...field} type="text" placeholder="email" />
                      </motion.div>
                    </div>
                  )}
                />
                <Field
                  name="phone"
                  render={({ field, form: { isSubmitting } }) => (
                    <div>
                      <div className="label">Tel:</div>
                      <motion.div className="input-with-icon" whileHover={{ scale: 1.05 }}>
                        <span className="button">
                          <AdminPhone />
                        </span>
                        <input {...field} type="text" placeholder="Tel" />
                      </motion.div>
                    </div>
                  )}
                />
                <Field
                  name="facebook"
                  render={({ field, form: { isSubmitting } }) => (
                    <div>
                      <div className="label">Facebook:</div>
                      <motion.div className="input-with-icon" whileHover={{ scale: 1.05 }}>
                        <span className="button">
                          <AdminFacebook />
                        </span>
                        <input {...field} type="text" placeholder="Facebook" />
                      </motion.div>
                    </div>
                  )}
                />
                <Field
                  name="instagram"
                  render={({ field, form: { isSubmitting } }) => (
                    <div>
                      <div className="label">İnstagram:</div>
                      <motion.div className="input-with-icon" whileHover={{ scale: 1.05 }}>
                        <span className="button">
                          <AdminInstagram />
                        </span>
                        <input {...field} type="text" placeholder="İnstagram" />
                      </motion.div>
                    </div>
                  )}
                />
              </div>
              <div className="button-wrapper">
                <button type="submit">
                  <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    Kaydet
                  </motion.span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      {loader && <Loader />}
    </div>
  )
}

Main.suppressFirstRenderFlicker = true
Main.getLayout = (page) => <Layout title="Main">{page}</Layout>

export default Main
