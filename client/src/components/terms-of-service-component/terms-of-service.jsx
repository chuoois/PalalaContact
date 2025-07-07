import { Link } from "react-router-dom"

export const TermsOfService = () => {
  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-dark mb-2">Điều khoản sử dụng</h1>
              <p className="text-muted">Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}</p>
            </div>

            {/* Content Card */}
            <div className="card border-1 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Navigation */}
                <div className="mb-4">
                  <Link to="/auth/signup" className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-arrow-left me-2"></i>
                    Quay lại đăng ký
                  </Link>
                </div>

                {/* Content */}
                <div className="terms-content">
                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      1. Giới thiệu
                    </h2>
                    <p className="text-muted lh-lg">
                      Chào mừng bạn đến với dịch vụ của chúng tôi. Bằng cách truy cập và sử dụng website này, bạn đồng ý
                      tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng sau đây. Nếu bạn không đồng ý với
                      bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-person-check me-2"></i>
                      2. Tài khoản người dùng
                    </h2>
                    <div className="ps-3">
                      <h3 className="h6 fw-semibold mb-2">2.1 Đăng ký tài khoản</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Bạn phải cung cấp thông tin chính xác, đầy đủ khi đăng ký</li>
                        <li>Bạn có trách nhiệm bảo mật thông tin đăng nhập của mình</li>
                        <li>Một người chỉ được tạo một tài khoản duy nhất</li>
                        <li>Bạn phải từ 13 tuổi trở lên để sử dụng dịch vụ</li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">2.2 Trách nhiệm của người dùng</h3>
                      <ul className="text-muted lh-lg">
                        <li>Không chia sẻ tài khoản với người khác</li>
                        <li>Thông báo ngay cho chúng tôi nếu phát hiện tài khoản bị xâm phạm</li>
                        <li>Chịu trách nhiệm về mọi hoạt động diễn ra trong tài khoản của mình</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-shield-check me-2"></i>
                      3. Quy tắc sử dụng
                    </h2>
                    <div className="ps-3">
                      <h3 className="h6 fw-semibold mb-2">3.1 Hành vi được phép</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Sử dụng dịch vụ cho mục đích cá nhân và hợp pháp</li>
                        <li>Tuân thủ các quy định và hướng dẫn của chúng tôi</li>
                        <li>Tôn trọng quyền riêng tư và quyền lợi của người dùng khác</li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">3.2 Hành vi bị cấm</h3>
                      <ul className="text-muted lh-lg">
                        <li>Đăng tải nội dung vi phạm pháp luật, có hại hoặc không phù hợp</li>
                        <li>Spam, quấy rối hoặc lạm dụng người dùng khác</li>
                        <li>Cố gắng truy cập trái phép vào hệ thống</li>
                        <li>Sử dụng bot hoặc công cụ tự động không được phép</li>
                        <li>Vi phạm bản quyền hoặc quyền sở hữu trí tuệ</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-currency-dollar me-2"></i>
                      4. Thanh toán và hoàn tiền
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Đối với các dịch vụ trả phí, bạn đồng ý thanh toán đầy đủ các khoản phí theo đúng thời hạn.
                        Chúng tôi có quyền tạm ngừng hoặc chấm dứt dịch vụ nếu bạn không thanh toán đúng hạn.
                      </p>
                      <ul className="text-muted lh-lg">
                        <li>Phí dịch vụ có thể thay đổi với thông báo trước 30 ngày</li>
                        <li>Hoàn tiền được xem xét theo từng trường hợp cụ thể</li>
                        <li>Không hoàn tiền cho thời gian đã sử dụng dịch vụ</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      5. Giới hạn trách nhiệm
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Dịch vụ được cung cấp "như hiện tại" và "như có sẵn". Chúng tôi không đảm bảo dịch vụ sẽ hoạt
                        động liên tục, không có lỗi hoặc hoàn toàn an toàn.
                      </p>
                      <ul className="text-muted lh-lg">
                        <li>Không chịu trách nhiệm về thiệt hại gián tiếp hoặc ngẫu nhiên</li>
                        <li>Trách nhiệm tối đa không vượt quá số tiền bạn đã thanh toán</li>
                        <li>Không đảm bảo tính chính xác của thông tin từ bên thứ ba</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-x-circle me-2"></i>
                      6. Chấm dứt dịch vụ
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản của bạn nếu:
                      </p>
                      <ul className="text-muted lh-lg">
                        <li>Vi phạm các điều khoản sử dụng</li>
                        <li>Sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                        <li>Gây tổn hại đến hệ thống hoặc người dùng khác</li>
                        <li>Không thanh toán phí dịch vụ đúng hạn</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-arrow-repeat me-2"></i>
                      7. Thay đổi điều khoản
                    </h2>
                    <p className="text-muted lh-lg">
                      Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Những thay đổi quan trọng sẽ được
                      thông báo trước ít nhất 30 ngày. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với
                      việc bạn chấp nhận các điều khoản mới.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-telephone me-2"></i>
                      8. Liên hệ
                    </h2>
                    <p className="text-muted lh-lg mb-3">
                      Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:
                    </p>
                    <div className="bg-light p-3 rounded">
                      <p className="mb-2">
                        <strong>Email:</strong> support@example.com
                      </p>
                      <p className="mb-2">
                        <strong>Điện thoại:</strong> (84) 123-456-789
                      </p>
                      <p className="mb-0">
                        <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM
                      </p>
                    </div>
                  </section>
                </div>

                {/* Footer Actions */}
                <div className="border-top pt-4 mt-5">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Link to="/auth/privacy-policy" className="btn btn-outline-secondary w-100">
                        <i className="bi bi-shield-lock me-2"></i>
                        Xem chính sách bảo mật
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link to="/auth/signup" className="btn btn-primary w-100">
                        <i className="bi bi-check-circle me-2"></i>
                        Tôi đồng ý và tiếp tục
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
