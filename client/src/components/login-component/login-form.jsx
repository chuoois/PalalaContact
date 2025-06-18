import { useState } from "react"
import { Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
    rememberMe: Yup.boolean(),
})

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const loadingToast = toast.loading("Đang đăng nhập...")

            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast.dismiss(loadingToast)

            // Giả lập thành công/thất bại
            const isSuccess = Math.random() > 0.3

            if (isSuccess) {
                toast.success("Đăng nhập thành công! 🎉", {
                    duration: 3000,
                })
                console.log("Đăng nhập thành công:", values)
            } else {
                toast.error("Email hoặc mật khẩu không đúng!")
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!")
            console.error("Lỗi đăng nhập:", error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleGoogleSuccess = (credentialResponse) => {
        toast.success("Đăng nhập Google thành công! 🎉", {
            duration: 3000,
        })
        console.log("Google Login Success:", credentialResponse)
    }

    const handleGoogleError = () => {
        toast.error("Đăng nhập Google thất bại!")
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <h1 className="display-6 fw-bold text-dark mb-2">Đăng nhập</h1>
                            <p className="text-muted">Chào mừng bạn quay trở lại</p>
                        </div>

                        {/* Login Card */}
                        <div className="card border-1">
                            <div className="card-body p-4">
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            {/* Email Field */}
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label fw-semibold">
                                                    <i className="bi bi-envelope me-2"></i>Email
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        <i className="bi bi-person text-muted"></i>
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
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="password" className="form-label fw-semibold mb-0">
                                                        <i className="bi bi-lock me-2"></i>Mật khẩu
                                                    </label>
                                                    <Link to="/auth/forgot-password" className="text-decoration-none small text-primary">
                                                        Quên mật khẩu?
                                                    </Link>
                                                </div>
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

                                            {/* Remember Me */}
                                            <div className="form-check mb-4">
                                                <Field id="rememberMe" name="rememberMe" type="checkbox" className="form-check-input" />
                                                <label htmlFor="rememberMe" className="form-check-label">
                                                    Ghi nhớ đăng nhập
                                                </label>
                                            </div>

                                            {/* Submit Button */}
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-2 fw-semibold">
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </span>
                                                        Đang đăng nhập...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                                        Đăng nhập
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

                                {/* Google Login */}
                                <div className="d-flex justify-content-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        theme="outline"
                                        size="large"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-4">
                            <p className="text-muted mb-0">
                                Chưa có tài khoản?{" "}
                                <Link to="/auth/signup" className="text-decoration-none fw-semibold">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}