import { useState } from "react"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handLogout = () => {
    sessionStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <>
      <header className="bg-white shadow-sm border-bottom">
        {/* Main Header */}
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between px-3 py-3">
            {/* Left Section */}
            <div className="d-flex align-items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-light d-lg-none me-3">
                <i className="bi bi-list"></i>
              </button>

              <div className="d-flex align-items-center">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span className="text-white fw-bold">P</span>
                </div>
                <h3 className="h4 mb-0 text-dark fw-bold d-none d-sm-block">Palala Contact</h3>
              </div>
            </div>

            {/* Right Section */}
            <div className="d-flex align-items-center">
              {/* User Profile */}
              <div className="dropdown d-none d-sm-block ms-3 ps-3 border-start">
                <button
                  className="btn btn-light d-flex align-items-center dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div
                    className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <i className="bi bi-person-fill text-white"></i>
                  </div>
                  <span className="fw-medium text-dark">Nguyễn Văn A</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-person-circle me-2"></i>
                      Hồ sơ cá nhân
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-gear me-2"></i>
                      Cài đặt
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center text-danger" href="#" onClick={handLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (chỉ có phần user) */}
      {isMenuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1055 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="bg-white h-100 shadow-lg" style={{ width: "300px" }} onClick={(e) => e.stopPropagation()}>
            {/* Menu Header */}
            <div className="d-flex align-items-center justify-content-between p-4 border-bottom bg-light">
              <h2 className="h5 mb-0 text-dark fw-bold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="btn btn-light">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* User Profile in Mobile Menu */}
            <div className="p-4 border-bottom">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="bi bi-person-fill text-white fs-5"></i>
                </div>
                <div>
                  <p className="fw-bold text-dark mb-1">Nguyễn Văn A</p>
                  <p className="text-muted small mb-0">Xem hồ sơ</p>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-start">
                  <i className="bi bi-person-circle me-2"></i>
                  Hồ sơ cá nhân
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-start">
                  <i className="bi bi-gear me-2"></i>
                  Cài đặt
                </button>
                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-start"
                  onClick={handLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
