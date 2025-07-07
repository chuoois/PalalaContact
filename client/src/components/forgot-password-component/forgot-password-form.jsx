import { useState } from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"
import authService from "../../services/auth.services" 

// Validation schema
const emailSchema = Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
})

export const ForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const emailInitialValues = {
    email: "",
  }

  // Handle send new password via email
  const handleSendNewPassword = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang tạo mật khẩu mới...")

      const response = await authService.forgotPassword(values.email)

      toast.dismiss(loadingToast)

      if (response.data && response.data.success) {
        toast.success("Mật khẩu mới đã được gửi về email của bạn!", {
          duration: 5000,
        })
        setIsSuccess(true)
      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra!")
      }
    } catch (error) {
      toast.dismiss()
      console.error("Error in handleSendNewPassword:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className={`bi ${isSuccess ? 'bi-check-circle-fill text-success' : 'bi-shield-lock text-primary'} display-4`}></i>
              </div>
              <h1 className="display-6 fw-bold text-dark mb-2">
                {isSuccess ? "Thành công!" : "Quên mật khẩu?"}
              </h1>
              <p className="text-muted">
                {isSuccess 
                  ? "Mật khẩu mới đã được gửi đến email của bạn" 
                  : "Nhập email để nhận mật khẩu mới"}
              </p>
            </div>

            {/* Forgot Password Card */}
            <div className="card border-1">
              <div className="card-body p-4">
                {!isSuccess ? (
                  // Email Input Form
                  <Formik 
                    initialValues={emailInitialValues} 
                    validationSchema={emailSchema} 
                    onSubmit={handleSendNewPassword}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        {/* Email Field */}
                        <div className="mb-4">
                          <label htmlFor="email" className="form-label fw-semibold">
                            <i className="bi bi-envelope me-2"></i>Email
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-envelope text-muted"></i>
                            </span>
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              className={`form-control border-start-0 ${
                                errors.email && touched.email ? "is-invalid" : ""
                              }`}
                              placeholder="Nhập email của bạn"
                              style={{ boxShadow: "none" }}
                            />
                          </div>
                          <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary w-100 py-2 fw-semibold"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </span>
                              Đang tạo mật khẩu mới...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Gửi mật khẩu mới
                            </>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  // Success Message
                  <div className="text-center">
                    <div className="alert alert-success d-flex align-items-center mb-4">
                      <i className="bi bi-check-circle me-2"></i>
                      <div>
                        <strong>Mật khẩu mới đã được gửi!</strong>
                        <br />
                        <small>Vui lòng kiểm tra email và sử dụng mật khẩu mới để đăng nhập</small>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      <small>
                        <strong>Lưu ý:</strong> Hãy thay đổi mật khẩu ngay sau khi đăng nhập để bảo mật tài khoản
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Login Link */}
            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                {isSuccess ? "Đã có mật khẩu mới?" : "Nhớ mật khẩu rồi?"}{" "}
                <Link to="/auth/signin" className="text-decoration-none fw-semibold">
                  <i className="bi bi-arrow-left me-1"></i>
                  Quay về đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}