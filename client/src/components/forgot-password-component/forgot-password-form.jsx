import { useState } from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

// Validation schema
const emailSchema = Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
})

const resetSchema = Yup.object({
  code: Yup.string()
    .length(6, "Mã xác thực phải có 6 ký tự")
    .matches(/^\d+$/, "Mã xác thực chỉ chứa số")
    .required("Mã xác thực là bắt buộc"),
  newPassword: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số")
    .required("Mật khẩu mới là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
})

export const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1) // 1: Enter email, 2: Enter code & new password
  const [email, setEmail] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const emailInitialValues = {
    email: "",
  }

  const resetInitialValues = {
    code: "",
    newPassword: "",
    confirmPassword: "",
  }

  // Handle send reset email
  const handleSendEmail = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang gửi email...")

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.dismiss(loadingToast)

      // Giả lập thành công/thất bại
      const isSuccess = Math.random() > 0.2

      if (isSuccess) {
        toast.success("Email đặt lại mật khẩu đã được gửi! 📧", {
          duration: 4000,
        })
        setEmail(values.email)
        setStep(2)
        startCountdown()
        console.log("Email sent to:", values.email)
      } else {
        toast.error("Email không tồn tại trong hệ thống!")
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
      console.error("Send email error:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // Handle reset password
  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang đặt lại mật khẩu...")

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.dismiss(loadingToast)

      // Giả lập thành công/thất bại
      const isSuccess = Math.random() > 0.3

      if (isSuccess) {
        toast.success("Đặt lại mật khẩu thành công! 🎉", {
          duration: 4000,
        })
        console.log("Password reset successful:", { email, ...values })
        // Redirect to login
      } else {
        toast.error("Mã xác thực không đúng hoặc đã hết hạn!")
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
      console.error("Reset password error:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // Countdown for resend email
  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Resend email
  const handleResendEmail = async () => {
    try {
      const loadingToast = toast.loading("Đang gửi lại email...")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.dismiss(loadingToast)
      toast.success("Email đã được gửi lại!")
      startCountdown()
    } catch {
      toast.error("Không thể gửi lại email!")
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
                <i className="bi bi-shield-lock display-4 text-primary"></i>
              </div>
              <h1 className="display-6 fw-bold text-dark mb-2">{step === 1 ? "Quên mật khẩu?" : "Đặt lại mật khẩu"}</h1>
              <p className="text-muted">
                {step === 1 ? "Nhập email của bạn để nhận link đặt lại mật khẩu" : "Nhập mã xác thực và mật khẩu mới"}
              </p>
            </div>

            {/* Forgot Password Card */}
            <div className="card border-1">
              <div className="card-body p-4">
                {step === 1 ? (
                  // Step 1: Enter Email
                  <Formik initialValues={emailInitialValues} validationSchema={emailSchema} onSubmit={handleSendEmail}>
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
                              Đang gửi email...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Gửi email đặt lại
                            </>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  // Step 2: Enter Code & New Password
                  <Formik
                    initialValues={resetInitialValues}
                    validationSchema={resetSchema}
                    onSubmit={handleResetPassword}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        {/* Email Display */}
                        <div className="alert alert-info d-flex align-items-center mb-4">
                          <i className="bi bi-info-circle me-2"></i>
                          <small>
                            Mã xác thực đã được gửi đến: <strong>{email}</strong>
                          </small>
                        </div>

                        {/* Verification Code */}
                        <div className="mb-3">
                          <label htmlFor="code" className="form-label fw-semibold">
                            <i className="bi bi-key me-2"></i>Mã xác thực
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-shield-check text-muted"></i>
                            </span>
                            <Field
                              id="code"
                              name="code"
                              type="text"
                              maxLength="6"
                              className={`form-control border-start-0 text-center fw-bold ${
                                errors.code && touched.code ? "is-invalid" : ""
                              }`}
                              placeholder="000000"
                              style={{ boxShadow: "none", letterSpacing: "0.5em" }}
                            />
                          </div>
                          <ErrorMessage name="code" component="div" className="text-danger small mt-1" />

                          {/* Resend Code */}
                          <div className="text-center mt-2">
                            {countdown > 0 ? (
                              <small className="text-muted">Gửi lại mã sau {countdown}s</small>
                            ) : (
                              <button
                                type="button"
                                onClick={handleResendEmail}
                                className="btn btn-link btn-sm p-0 text-decoration-none"
                              >
                                Gửi lại mã xác thực
                              </button>
                            )}
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label fw-semibold">
                            <i className="bi bi-lock me-2"></i>Mật khẩu mới
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-shield-lock text-muted"></i>
                            </span>
                            <Field
                              id="newPassword"
                              name="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              className={`form-control border-start-0 border-end-0 ${
                                errors.newPassword && touched.newPassword ? "is-invalid" : ""
                              }`}
                              placeholder="Nhập mật khẩu mới"
                              style={{ boxShadow: "none" }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="btn btn-outline-secondary border-start-0"
                              style={{ borderColor: "#dee2e6" }}
                            >
                              <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                            </button>
                          </div>
                          <ErrorMessage name="newPassword" component="div" className="text-danger small mt-1" />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                          <label htmlFor="confirmPassword" className="form-label fw-semibold">
                            <i className="bi bi-shield-check me-2"></i>Xác nhận mật khẩu
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-shield-check text-muted"></i>
                            </span>
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              className={`form-control border-start-0 border-end-0 ${
                                errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                              }`}
                              placeholder="Nhập lại mật khẩu mới"
                              style={{ boxShadow: "none" }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="btn btn-outline-secondary border-start-0"
                              style={{ borderColor: "#dee2e6" }}
                            >
                              <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                            </button>
                          </div>
                          <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-success w-100 py-2 fw-semibold"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </span>
                              Đang đặt lại...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Đặt lại mật khẩu
                            </>
                          )}
                        </button>

                        {/* Back Button */}
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn btn-outline-secondary w-100 mt-2"
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Quay lại
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>

            {/* Back to Login Link */}
            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Nhớ mật khẩu rồi?{" "}
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
