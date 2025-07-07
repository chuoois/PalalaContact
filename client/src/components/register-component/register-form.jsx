import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { Formik, Form, Field, ErrorMessage } from "formik"
import authService from "../../services/auth.services"
import * as Yup from "yup"
import toast from "react-hot-toast"

// Validation schema cho bước 1 (gửi OTP)
const stepOneSchema = Yup.object({
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

// Validation schema cho bước 2 (xác thực OTP)
const stepTwoSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP phải có 6 chữ số")
    .matches(/^\d+$/, "OTP chỉ được chứa số")
    .required("OTP là bắt buộc"),
})

export const SignupForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: nhập thông tin, 2: nhập OTP
  const [userInfo, setUserInfo] = useState(null) // Lưu thông tin người dùng từ bước 1
  const [countdown, setCountdown] = useState(0) // Đếm ngược để gửi lại OTP

  const initialValuesStepOne = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  }

  const initialValuesStepTwo = {
    otp: "",
  }

  // Xử lý gửi OTP (bước 1)
  const handleStepOne = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang gửi OTP...")

      // Gửi OTP
      const response = await authService.sendOTP(values.email)

      toast.dismiss(loadingToast)
      
      // Kiểm tra response success
      if (response.data && response.data.message) {
        toast.success(response.data.message, {
          duration: 3000,
        })

        // Lưu thông tin người dùng và chuyển sang bước 2
        setUserInfo(values)
        setCurrentStep(2)

        // Bắt đầu đếm ngược 300 giây
        setCountdown(300)
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        toast.error("Có lỗi xảy ra khi gửi OTP")
      }

    } catch (error) {
      toast.dismiss()
      console.error('Error in handleStepOne:', error)
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi gửi OTP"
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  // Xử lý xác thực OTP và đăng ký (bước 2)
  const handleStepTwo = async (values, { setSubmitting }) => {
    try {
      const loadingToast = toast.loading("Đang xác thực OTP và tạo tài khoản...")

      const response = await authService.signup({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        comparePassword: userInfo.confirmPassword,
        otp: values.otp,
      })

      toast.dismiss(loadingToast)
      
      // Kiểm tra response success
      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          duration: 3000,
        })

        // Lưu thông tin user vào sessionStorage hoặc context nếu cần
        if (response.data.user) {
          sessionStorage.setItem('token', response.data.user.token)
        }

        // Redirect tới trang chính hoặc home
        setTimeout(() => {
          navigate('/home') // hoặc trang bạn muốn redirect
        }, 1000)

      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra khi tạo tài khoản")
      }

    } catch (error) {
      toast.dismiss()
      console.error('Error in handleStepTwo:', error)
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi tạo tài khoản"
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  // Gửi lại OTP
  const handleResendOTP = async () => {
    try {
      const loadingToast = toast.loading("Đang gửi lại OTP...")

      const response = await authService.sendOTP(userInfo.email)

      toast.dismiss(loadingToast)
      
      if (response.data && response.data.message) {
        toast.success(response.data.message, {
          duration: 3000,
        })

        // Bắt đầu đếm ngược lại
        setCountdown(300)
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        toast.error("Có lỗi xảy ra khi gửi lại OTP")
      }

    } catch (error) {
      toast.dismiss()
      console.error('Error in handleResendOTP:', error)
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi gửi lại OTP"
      toast.error(errorMessage)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const loadingToast = toast.loading("Đang đăng ký với Google...")
      
      const response = await authService.signupGoogle(credentialResponse.credential)
      
      toast.dismiss(loadingToast)
      
      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          duration: 3000,
        })

        // Lưu thông tin user nếu cần
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        // Redirect
        setTimeout(() => {
          navigate('/home') // hoặc trang bạn muốn redirect
        }, 1000)
      } else {
        toast.error(response.data?.message || "Đăng ký Google thất bại")
      }
    } catch (error) {
      toast.dismiss()
      console.error('Error in handleGoogleSuccess:', error)
      const errorMessage = error.response?.data?.message || "Đăng ký Google thất bại"
      toast.error(errorMessage)
    }
  }

  const handleGoogleError = () => {
    toast.error("Đăng ký Google thất bại!")
  }

  // Quay lại bước 1
  const handleBackToStepOne = () => {
    setCurrentStep(1)
    setUserInfo(null)
    setCountdown(0)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-dark mb-2">
                {currentStep === 1 ? "Đăng ký" : "Xác thực OTP"}
              </h1>
              <p className="text-muted">
                {currentStep === 1
                  ? "Tạo tài khoản mới để bắt đầu"
                  : `Nhập mã OTP đã gửi đến ${userInfo?.email}`}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className={`d-flex align-items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted'}`}>
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                    {currentStep > 1 ? <i className="bi bi-check"></i> : '1'}
                  </div>
                  <span className="ms-2 small">Thông tin</span>
                </div>
                <div className={`flex-grow-1 mx-3 ${currentStep >= 2 ? 'bg-primary' : 'bg-light'}`} style={{ height: '2px' }}></div>
                <div className={`d-flex align-items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted'}`}>
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-light'}`} style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                    2
                  </div>
                  <span className="ms-2 small">Xác thực</span>
                </div>
              </div>
            </div>

            {/* Register Card */}
            <div className="card border-1">
              <div className="card-body p-4">
                {currentStep === 1 ? (
                  // FORM 1: Thông tin đăng ký
                  <Formik
                    key="signup-form" // Key riêng biệt
                    initialValues={initialValuesStepOne}
                    validationSchema={stepOneSchema}
                    onSubmit={handleStepOne}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form autoComplete="off" noValidate>
                        {/* Fake fields để mislead autofill */}
                        <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
                          <input type="text" name="fake-username" tabIndex="-1" />
                          <input type="password" name="fake-password" tabIndex="-1" />
                        </div>

                        {/* Full Name Field */}
                        <div className="mb-3">
                          <label htmlFor="signup-name" className="form-label fw-semibold">
                            <i className="bi bi-person me-2"></i>Họ và tên
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-person-circle text-muted"></i>
                            </span>
                            <Field
                              id="signup-name"
                              name="name"
                              type="text"
                              className={`form-control border-start-0 ${errors.name && touched.name ? "is-invalid" : ""}`}
                              placeholder="Nhập họ và tên"
                              autoComplete="name"
                              style={{ boxShadow: "none" }}
                            />
                          </div>
                          <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                          <label htmlFor="signup-email" className="form-label fw-semibold">
                            <i className="bi bi-envelope me-2"></i>Email
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-envelope text-muted"></i>
                            </span>
                            <Field
                              id="signup-email"
                              name="email"
                              type="email"
                              className={`form-control border-start-0 ${errors.email && touched.email ? "is-invalid" : ""}`}
                              placeholder="Nhập email của bạn"
                              autoComplete="email"
                              style={{ boxShadow: "none" }}
                            />
                          </div>
                          <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                          <label htmlFor="signup-password" className="form-label fw-semibold">
                            <i className="bi bi-lock me-2"></i>Mật khẩu
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-shield-lock text-muted"></i>
                            </span>
                            <Field
                              id="signup-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              className={`form-control border-start-0 border-end-0 ${errors.password && touched.password ? "is-invalid" : ""}`}
                              placeholder="Nhập mật khẩu"
                              autoComplete="new-password"
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
                          <label htmlFor="signup-confirm-password" className="form-label fw-semibold">
                            <i className="bi bi-shield-check me-2"></i>Xác nhận mật khẩu
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-shield-check text-muted"></i>
                            </span>
                            <Field
                              id="signup-confirm-password"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              className={`form-control border-start-0 border-end-0 ${errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""}`}
                              placeholder="Nhập lại mật khẩu"
                              autoComplete="new-password"
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
                          <Field id="signup-agree-terms" name="agreeTerms" type="checkbox" className="form-check-input" />
                          <label htmlFor="signup-agree-terms" className="form-check-label small">
                            Tôi đồng ý với{" "}
                            <Link to="/auth/terms-of-service" className="text-decoration-none">
                              Điều khoản sử dụng
                            </Link>{" "}
                            và{" "}
                            <Link to="/auth/privacy-policy" className="text-decoration-none">
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
                              Đang gửi OTP...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-envelope me-2"></i>
                              Gửi mã OTP
                            </>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  // FORM 2: Xác thực OTP (Form riêng biệt)
                  <Formik
                    key="otp-form" // Key riêng biệt
                    initialValues={initialValuesStepTwo}
                    validationSchema={stepTwoSchema}
                    onSubmit={handleStepTwo}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form autoComplete="off" noValidate>
                        {/* Fake fields cho OTP form */}
                        <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
                          <input type="text" name="fake-name" tabIndex="-1" />
                          <input type="email" name="fake-email" tabIndex="-1" />
                        </div>

                        {/* OTP Field */}
                        <div className="mb-4">
                          <label htmlFor="otp-code" className="form-label fw-semibold">
                            <i className="bi bi-shield-lock me-2"></i>Mã OTP
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-key text-muted"></i>
                            </span>
                            <Field
                              id="otp-code"
                              name="otp"
                              type="text"
                              maxLength="6"
                              className={`form-control border-start-0 text-center ${errors.otp && touched.otp ? "is-invalid" : ""}`}
                              placeholder="• • • • • •"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              style={{ boxShadow: "none", letterSpacing: "0.5em" }}
                              data-lpignore="true"
                              data-form-type="other"
                              onFocus={(e) => {
                                // Clear autofill khi focus
                                if (e.target.value && !/^\d+$/.test(e.target.value)) {
                                  e.target.value = '';
                                }
                              }}
                              onInput={(e) => {
                                // Chỉ cho phép nhập số
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                              }}
                            />
                          </div>
                          <ErrorMessage name="otp" component="div" className="text-danger small mt-1" />

                          {/* Resend OTP */}
                          <div className="mt-2 text-center">
                            {countdown > 0 ? (
                              <small className="text-muted">
                                Gửi lại mã sau {countdown} giây
                              </small>
                            ) : (
                              <button
                                type="button"
                                onClick={handleResendOTP}
                                className="btn btn-link btn-sm p-0 text-decoration-none"
                              >
                                <i className="bi bi-arrow-clockwise me-1"></i>
                                Gửi lại mã OTP
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="row g-2">
                          <div className="col-4">
                            <button
                              type="button"
                              onClick={handleBackToStepOne}
                              className="btn btn-outline-secondary w-100 py-2"
                            >
                              <i className="bi bi-arrow-left me-1"></i>
                              Quay lại
                            </button>
                          </div>
                          <div className="col-8">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-2 fw-semibold">
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </span>
                                  Đang xác thực...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-person-plus me-2"></i>
                                  Tạo tài khoản
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}

                {/* Google Register - chỉ hiển thị ở bước 1 */}
                {currentStep === 1 && (
                  <>
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
                  </>
                )}
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