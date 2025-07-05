import { useState } from "react"
import { Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { Formik, Form, Field, ErrorMessage } from "formik"
import authService from "../../services/auth.services"
import * as Yup from "yup"
import toast from "react-hot-toast"


// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự")
    .required("Họ tên là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  agreeTerms: Yup.boolean().oneOf([true], "Bạn phải đồng ý với điều khoản sử dụng"),
})

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang tạo tài khoản...")

      const response = await authService.signup({
        name: values.name,
        email: values.email,
        password: values.password,
        comparePassword: values.confirmPassword,
      })

      toast.dismiss(loadingToast)

      const successMessage = response.data.message
      toast.success(successMessage, {
        duration: 3000,
      })

    } catch (error) {
      toast.dismiss()
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await authService.signupGoogle(credentialResponse.credential)
      const successMessage = response.data.message
      toast.success(successMessage, {
        duration: 3000,
      })
    } catch (error) {
      toast.dismiss()
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage)
    }
  }

  const handleGoogleError = () => {
    toast.error("Đăng ký Google thất bại!")
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-dark mb-2">Đăng ký</h1>
              <p className="text-muted">Tạo tài khoản mới để bắt đầu</p>
            </div>

            {/* Register Card */}
            <div className="card border-1">
              <div className="card-body p-4">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      {/* Full Name Field */}
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">
                          <i className="bi bi-person me-2"></i>Họ và tên
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-person-circle text-muted"></i>
                          </span>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            className={`form-control border-start-0 ${errors.name && touched.name ? "is-invalid" : ""
                              }`}
                            placeholder="Nhập họ và tên"
                            style={{ boxShadow: "none" }}
                          />
                        </div>
                        <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                      </div>

                      {/* Email Field */}
                      <div className="mb-3">
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
                            className={`form-control border-start-0 ${errors.email && touched.email ? "is-invalid" : ""
                              }`}
                            placeholder="Nhập email của bạn"
                            style={{ boxShadow: "none" }}
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                      </div>

                      {/* Password Field */}
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">
                          <i className="bi bi-lock me-2"></i>Mật khẩu
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-shield-lock text-muted"></i>
                          </span>
                          <Field
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={`form-control border-start-0 border-end-0 ${errors.password && touched.password ? "is-invalid" : ""
                              }`}
                            placeholder="Nhập mật khẩu"
                            style={{ boxShadow: "none" }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-outline-secondary border-start-0"
                            style={{ borderColor: "#dee2e6" }}
                          >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                      </div>

                      {/* Confirm Password Field */}
                      <div className="mb-3">
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
                            className={`form-control border-start-0 border-end-0 ${errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                              }`}
                            placeholder="Nhập lại mật khẩu"
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

                      {/* Terms Agreement */}
                      <div className="form-check mb-4">
                        <Field id="agreeTerms" name="agreeTerms" type="checkbox" className="form-check-input" />
                        <label htmlFor="agreeTerms" className="form-check-label small">
                          Tôi đồng ý với{" "}
                          <Link to="/terms" className="text-decoration-none">
                            Điều khoản sử dụng
                          </Link>{" "}
                          và{" "}
                          <Link to="/privacy" className="text-decoration-none">
                            Chính sách bảo mật
                          </Link>
                        </label>
                        <ErrorMessage name="agreeTerms" component="div" className="text-danger small mt-1" />
                      </div>

                      {/* Submit Button */}
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-2 fw-semibold">
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </span>
                            Đang tạo tài khoản...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus me-2"></i>
                            Tạo tài khoản
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 text-muted small">Hoặc</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Google Register */}
                <div className="d-flex justify-content-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    width="100%"
                    text="signup_with"
                  />
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Đã có tài khoản?{" "}
                <Link to="/auth/signin" className="text-decoration-none fw-semibold">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
