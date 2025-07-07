import { Link } from "react-router-dom"

export const PrivacyPolicy = () => {
  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-dark mb-2">Chính sách bảo mật</h1>
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
                <div className="privacy-content">
                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      1. Giới thiệu
                    </h2>
                    <p className="text-muted lh-lg">
                      Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách này giải thích
                      cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ của
                      chúng tôi.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-collection me-2"></i>
                      2. Thông tin chúng tôi thu thập
                    </h2>
                    <div className="ps-3">
                      <h3 className="h6 fw-semibold mb-2">2.1 Thông tin bạn cung cấp</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>
                          <strong>Thông tin tài khoản:</strong> Họ tên, email, mật khẩu
                        </li>
                        <li>
                          <strong>Thông tin hồ sơ:</strong> Ảnh đại diện, thông tin cá nhân
                        </li>
                        <li>
                          <strong>Thông tin liên hệ:</strong> Số điện thoại, địa chỉ
                        </li>
                        <li>
                          <strong>Nội dung:</strong> Tin nhắn, bình luận, tệp tải lên
                        </li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">2.2 Thông tin tự động thu thập</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>
                          <strong>Thông tin thiết bị:</strong> IP, trình duyệt, hệ điều hành
                        </li>
                        <li>
                          <strong>Dữ liệu sử dụng:</strong> Thời gian truy cập, trang đã xem
                        </li>
                        <li>
                          <strong>Cookie:</strong> Tùy chọn và lịch sử duyệt web
                        </li>
                        <li>
                          <strong>Vị trí:</strong> Thông tin vị trí địa lý (nếu được phép)
                        </li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">2.3 Thông tin từ bên thứ ba</h3>
                      <ul className="text-muted lh-lg">
                        <li>Thông tin từ mạng xã hội (Google, Facebook)</li>
                        <li>Dữ liệu từ các đối tác tích hợp</li>
                        <li>Thông tin xác thực từ nhà cung cấp dịch vụ</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-gear me-2"></i>
                      3. Cách chúng tôi sử dụng thông tin
                    </h2>
                    <div className="ps-3">
                      <h3 className="h6 fw-semibold mb-2">3.1 Cung cấp dịch vụ</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Tạo và quản lý tài khoản của bạn</li>
                        <li>Cung cấp các tính năng và dịch vụ</li>
                        <li>Xử lý thanh toán và giao dịch</li>
                        <li>Hỗ trợ khách hàng và giải quyết vấn đề</li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">3.2 Cải thiện dịch vụ</h3>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Phân tích và hiểu cách sử dụng dịch vụ</li>
                        <li>Phát triển tính năng mới</li>
                        <li>Cá nhân hóa trải nghiệm người dùng</li>
                        <li>Kiểm tra và cải thiện hiệu suất</li>
                      </ul>

                      <h3 className="h6 fw-semibold mb-2">3.3 Liên lạc</h3>
                      <ul className="text-muted lh-lg">
                        <li>Gửi thông báo về dịch vụ</li>
                        <li>Thông tin cập nhật và tin tức</li>
                        <li>Marketing và quảng cáo (nếu đồng ý)</li>
                        <li>Khảo sát và phản hồi</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-share me-2"></i>
                      4. Chia sẻ thông tin
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ thông tin trong các trường
                        hợp sau:
                      </p>
                      <ul className="text-muted lh-lg">
                        <li>
                          <strong>Với sự đồng ý:</strong> Khi bạn cho phép chia sẻ
                        </li>
                        <li>
                          <strong>Nhà cung cấp dịch vụ:</strong> Đối tác hỗ trợ vận hành
                        </li>
                        <li>
                          <strong>Yêu cầu pháp lý:</strong> Tuân thủ luật pháp và quy định
                        </li>
                        <li>
                          <strong>Bảo vệ quyền lợi:</strong> Ngăn chặn gian lận và lạm dụng
                        </li>
                        <li>
                          <strong>Chuyển giao kinh doanh:</strong> Trong trường hợp M&A
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-shield-lock me-2"></i>
                      5. Bảo mật thông tin
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin của bạn:
                      </p>
                      <ul className="text-muted lh-lg">
                        <li>
                          <strong>Mã hóa:</strong> SSL/TLS cho truyền tải dữ liệu
                        </li>
                        <li>
                          <strong>Kiểm soát truy cập:</strong> Hạn chế quyền truy cập
                        </li>
                        <li>
                          <strong>Giám sát:</strong> Theo dõi hoạt động bất thường
                        </li>
                        <li>
                          <strong>Sao lưu:</strong> Backup dữ liệu định kỳ
                        </li>
                        <li>
                          <strong>Đào tạo:</strong> Nhân viên được đào tạo về bảo mật
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-clock me-2"></i>
                      6. Lưu trữ thông tin
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">
                        Chúng tôi lưu trữ thông tin của bạn trong thời gian cần thiết để:
                      </p>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Cung cấp dịch vụ cho bạn</li>
                        <li>Tuân thủ nghĩa vụ pháp lý</li>
                        <li>Giải quyết tranh chấp</li>
                        <li>Thực thi thỏa thuận</li>
                      </ul>
                      <p className="text-muted lh-lg">
                        Khi không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin của bạn.
                      </p>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-person-gear me-2"></i>
                      7. Quyền của bạn
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
                      <ul className="text-muted lh-lg">
                        <li>
                          <strong>Truy cập:</strong> Xem thông tin chúng tôi có về bạn
                        </li>
                        <li>
                          <strong>Sửa đổi:</strong> Cập nhật thông tin không chính xác
                        </li>
                        <li>
                          <strong>Xóa:</strong> Yêu cầu xóa thông tin cá nhân
                        </li>
                        <li>
                          <strong>Hạn chế:</strong> Giới hạn cách sử dụng thông tin
                        </li>
                        <li>
                          <strong>Di chuyển:</strong> Xuất thông tin sang định dạng khác
                        </li>
                        <li>
                          <strong>Phản đối:</strong> Từ chối xử lý cho mục đích cụ thể
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-cookie me-2"></i>
                      8. Cookie và công nghệ theo dõi
                    </h2>
                    <div className="ps-3">
                      <p className="text-muted lh-lg mb-3">Chúng tôi sử dụng cookie và công nghệ tương tự để:</p>
                      <ul className="text-muted lh-lg mb-3">
                        <li>Ghi nhớ tùy chọn và cài đặt</li>
                        <li>Phân tích lưu lượng truy cập</li>
                        <li>Cá nhân hóa nội dung</li>
                        <li>Cải thiện bảo mật</li>
                      </ul>
                      <p className="text-muted lh-lg">
                        Bạn có thể quản lý cookie thông qua cài đặt trình duyệt của mình.
                      </p>
                    </div>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-globe me-2"></i>
                      9. Chuyển giao dữ liệu quốc tế
                    </h2>
                    <p className="text-muted lh-lg">
                      Thông tin của bạn có thể được xử lý ở các quốc gia khác có luật bảo mật khác với quốc gia của bạn.
                      Chúng tôi đảm bảo áp dụng các biện pháp bảo vệ thích hợp cho việc chuyển giao này.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-people me-2"></i>
                      10. Quyền riêng tư của trẻ em
                    </h2>
                    <p className="text-muted lh-lg">
                      Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin
                      cá nhân từ trẻ em dưới 13 tuổi. Nếu phát hiện, chúng tôi sẽ xóa thông tin đó ngay lập tức.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-arrow-repeat me-2"></i>
                      11. Thay đổi chính sách
                    </h2>
                    <p className="text-muted lh-lg">
                      Chúng tôi có thể cập nhật chính sách này theo thời gian. Những thay đổi quan trọng sẽ được thông
                      báo qua email hoặc thông báo trên website. Ngày cập nhật cuối cùng sẽ được hiển thị ở đầu chính
                      sách.
                    </p>
                  </section>

                  <section className="mb-4">
                    <h2 className="h4 fw-bold text-primary mb-3">
                      <i className="bi bi-telephone me-2"></i>
                      12. Liên hệ
                    </h2>
                    <p className="text-muted lh-lg mb-3">
                      Nếu bạn có câu hỏi về chính sách này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
                    </p>
                    <div className="bg-light p-3 rounded">
                      <p className="mb-2">
                        <strong>Email bảo mật:</strong> privacy@example.com
                      </p>
                      <p className="mb-2">
                        <strong>Điện thoại:</strong> (84) 123-456-789
                      </p>
                      <p className="mb-2">
                        <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM
                      </p>
                      <p className="mb-0">
                        <strong>Giờ hỗ trợ:</strong> 8:00 - 17:00 (T2-T6)
                      </p>
                    </div>
                  </section>
                </div>

                {/* Footer Actions */}
                <div className="border-top pt-4 mt-5">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Link to="/auth/terms-of-service" className="btn btn-outline-secondary w-100">
                        <i className="bi bi-file-text me-2"></i>
                        Xem điều khoản sử dụng
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
