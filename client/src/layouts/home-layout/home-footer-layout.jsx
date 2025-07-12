"use client"

export const Footer = () => {
  const socialLinks = [
    { id: "facebook", label: "Facebook", icon: "bi-facebook", url: "#" },
    { id: "telegram", label: "Telegram", icon: "bi-telegram", url: "#" },
    { id: "zalo", label: "Zalo", icon: "bi-chat-square-dots", url: "#" },
    { id: "instagram", label: "Instagram", icon: "bi-instagram", url: "#" },
  ]

  const footerLinks = [
    { id: "about", label: "Về chúng tôi", url: "#" },
    { id: "privacy", label: "Chính sách bảo mật", url: "#" },
    { id: "terms", label: "Điều khoản sử dụng", url: "#" },
    { id: "help", label: "Trợ giúp", url: "#" },
  ]

  return (
    <footer className="bg-white border-top mt-auto">

      {/* Main Footer Content */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* Left Section - App Info */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "48px", height: "48px" }}
              >
                <span className="text-white fw-bold fs-5">P</span>
              </div>
              <div>
                <h4 className="h5 mb-0 text-dark fw-bold">Palala Contact</h4>
                <p className="text-muted small mb-0">Kết nối mọi lúc, mọi nơi</p>
              </div>
            </div>
            <p className="text-muted small">
              Ứng dụng quản lý danh bạ và liên lạc hiện đại, giúp bạn dễ dàng kết nối với bạn bè, 
              gia đình và đồng nghiệp một cách nhanh chóng và tiện lợi.
            </p>
          </div>

          {/* Center Section - Links */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="h6 text-dark fw-bold mb-3">Liên kết hữu ích</h5>
            <div className="d-flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-muted text-decoration-none small hover-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Social & Contact */}
          <div className="col-12 col-md-4">
            <h5 className="h6 text-dark fw-bold mb-3">Theo dõi chúng tôi</h5>
            <div className="d-flex gap-3 mb-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  title={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            <div className="d-flex align-items-center text-muted small">
              <i className="bi bi-envelope me-2"></i>
              <span>support@palalacontact.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-light border-top py-3">
        <div className="container-fluid">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center px-3">
            <div className="text-muted small mb-2 mb-sm-0">
              <span>&copy; 2025 Palala Contact. Tất cả quyền được bảo lưu.</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted small">Phiên bản 2.1.0</span>
              <div className="d-flex align-items-center">
                <span className="text-success small me-2">
                  <i className="bi bi-circle-fill" style={{ fontSize: "8px" }}></i>
                </span>
                <span className="text-muted small">Hoạt động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}