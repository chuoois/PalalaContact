import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import authService from "../../services/auth.services"
import toast from "react-hot-toast"

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      const email = searchParams.get("email")

      if (!token || !email) {
        toast.error("Thông tin xác thực không hợp lệ!")
        return
      }

      try {
        const response = await authService.verifyEmail(token, email)
        console.log("response", response)

        toast.success(response.data.message || "Xác thực thành công ")
        setTimeout(() => {
          navigate("/auth/login")
        }, 2000)
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Xác thực thất bại. Vui lòng thử lại!"
        toast.error(msg)
      }
    }

    verifyEmail()
  }, [navigate, searchParams])

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="text-center">
        <h3>Đang xác minh tài khoản...</h3>
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}