export const ContactDetailModal = ({ contact, onClose, onToggleFavorite, onDelete, onEdit }) => {
  const {
    fullName,
    category,
    isFavorite,
    phone,
    email,
    website,
    jobTitle,
    company,
    birthday,
    address,
    socialMedia,
    tags,
    notes,
    status,
  } = contact;

  return (
    <div className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header bg-light border">
            <h5 className="modal-title text-dark fw-bold">
              <i className="bi bi-person-circle me-2"></i>
              Thông tin chi tiết liên hệ
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="d-flex align-items-start gap-4 mb-5">
              <div className="position-relative">
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center border"
                  style={{ width: "96px", height: "96px" }}
                >
                  <span className="text-dark fw-semibold" style={{ fontSize: "2rem" }}>
                    {fullName ? fullName.charAt(0).toUpperCase() : "NA"}
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <h2 className="fw-bold text-dark mb-0">{fullName}</h2>
                  <i
                    className={`bi bi-${
                      category === "work" ? "briefcase-fill" : category === "friends" ? "person-hearts" : "folder-fill"
                    } text-muted fs-3`}
                  ></i>
                  {isFavorite && <i className="bi bi-star-fill text-warning fs-3"></i>}
                  <span className={`badge ${status === "Active" ? "bg-success" : status === "Archived" ? "bg-warning" : "bg-danger"}`}>
                    {status === "Active" ? "Hoạt động" : status === "Archived" ? "Lưu trữ" : "Chặn"}
                  </span>
                </div>
                <div className="mb-3">
                  {jobTitle && (
                    <p className="h5 text-primary fw-medium mb-1 d-flex align-items-center gap-2">
                      <i className="bi bi-briefcase-fill"></i>
                      {jobTitle}
                    </p>
                  )}
                  {company && (
                    <p className="text-muted mb-0 d-flex align-items-center gap-2">
                      <i className="bi bi-building"></i>
                      {company}
                    </p>
                  )}
                </div>
                {tags && tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary bg-opacity-10 text-primary fw-medium px-3 py-2 border border-primary border-opacity-25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <h4 className="h5 fw-semibold text-dark mb-4 d-flex align-items-center">
                  <i className="bi bi-telephone-fill me-2"></i>
                  Thông tin liên hệ
                </h4>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded border">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-telephone-fill text-muted fs-4"></i>
                      <div>
                        <p className="small text-muted mb-1">Số điện thoại</p>
                        <p className="fw-semibold text-dark h6 mb-0">{phone}</p>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-telephone-fill"></i>
                    </button>
                  </div>
                  {email && (
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded border">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-envelope-fill text-muted fs-4"></i>
                        <div>
                          <p className="small text-muted mb-1">Email</p>
                          <p className="fw-semibold text-dark mb-0">{email}</p>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-envelope-fill"></i>
                      </button>
                    </div>
                  )}
                  {website && (
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded border">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-globe text-muted fs-4"></i>
                        <div>
                          <p className="small text-muted mb-1">Website</p>
                          <p className="fw-semibold text-primary mb-0">{website}</p>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-globe"></i>
                      </button>
                    </div>
                  )}
                  {birthday && (
                    <div className="d-flex align-items-center p-3 bg-light rounded border">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-calendar-heart-fill text-primary fs-4"></i>
                        <div>
                          <p className="small text-muted mb-1">Ngày sinh</p>
                          <p className="fw-semibold text-dark mb-0">{new Date(birthday).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <h4 className="h5 fw-semibold text-dark mb-4 d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Địa chỉ & Thông tin khác
                </h4>
                <div className="d-flex flex-column gap-3">
                  {address && (
                    <div className="p-3 bg-light rounded border">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-geo-alt-fill text-primary fs-4 me-3 mt-1"></i>
                        <div className="flex-grow-1">
                          <p className="small text-muted mb-2">Địa chỉ</p>
                          <div className="text-dark">
                            <p className="fw-medium mb-1">{address.street}</p>
                            <p className="mb-1">{`${address.city}, ${address.state}`}</p>
                            <p className="mb-0">{`${address.country} ${address.zipCode}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {(jobTitle || company) && (
                    <div className="p-3 bg-light rounded border">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-briefcase-fill text-primary fs-4 me-3 mt-1"></i>
                        <div className="flex-grow-1">
                          <p className="small text-muted mb-2">Thông tin công việc</p>
                          {jobTitle && <p className="fw-semibold text-dark mb-1">{jobTitle}</p>}
                          {company && <p className="text-muted mb-0">{company}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {notes && (
                    <div className="p-3 bg-light rounded border">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-sticky-fill text-primary fs-4 me-3 mt-1"></i>
                        <div className="flex-grow-1">
                          <p className="small text-muted mb-2">Ghi chú</p>
                          <p className="text-dark fst-italic mb-0">{notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {socialMedia && Object.values(socialMedia).some((val) => val) && (
              <div className="mt-5">
                <h4 className="h5 fw-semibold text-dark mb-4 d-flex align-items-center">
                  <i className="bi bi-share-fill me-2"></i>
                  Mạng xã hội
                </h4>
                <div className="row g-3">
                  {socialMedia.facebook && (
                    <div className="col-6 col-md-3">
                      <a
                        href={socialMedia.facebook}
                        className="d-flex align-items-center gap-3 p-3 bg-primary bg-opacity-10 text-primary rounded text-decoration-none border border-primary border-opacity-25 hover-shadow"
                      >
                        <i className="bi bi-facebook fs-3"></i>
                        <div>
                          <p className="fw-medium mb-0">Facebook</p>
                          <p className="small opacity-75 mb-0">Xem trang</p>
                        </div>
                      </a>
                    </div>
                  )}
                  {socialMedia.linkedin && (
                    <div className="col-6 col-md-3">
                      <a
                        href={socialMedia.linkedin}
                        className="d-flex align-items-center gap-3 p-3 bg-primary bg-opacity-10 text-primary rounded text-decoration-none border border-primary border-opacity-25 hover-shadow"
                      >
                        <i className="bi bi-linkedin fs-3"></i>
                        <div>
                          <p className="fw-medium mb-0">LinkedIn</p>
                          <p className="small opacity-75 mb-0">Xem hồ sơ</p>
                        </div>
                      </a>
                    </div>
                  )}
                  {socialMedia.instagram && (
                    <div className="col-6 col-md-3">
                      <a
                        href={socialMedia.instagram}
                        className="d-flex align-items-center gap-3 p-3 bg-primary bg-opacity-10 text-primary rounded text-decoration-none border border-primary border-opacity-25 hover-shadow"
                      >
                        <i className="bi bi-instagram fs-3"></i>
                        <div>
                          <p className="fw-medium mb-0">Instagram</p>
                          <p className="small opacity-75 mb-0">Xem trang</p>
                        </div>
                      </a>
                    </div>
                  )}
                  {socialMedia.twitter && (
                    <div className="col-6 col-md-3">
                      <a
                        href={socialMedia.twitter}
                        className="d-flex align-items-center gap-3 p-3 bg-primary bg-opacity-10 text-primary rounded text-decoration-none border border-primary border-opacity-25 hover-shadow"
                      >
                        <i className="bi bi-twitter fs-3"></i>
                        <div>
                          <p className="fw-medium mb-0">Twitter</p>
                          <p className="small opacity-75 mb-0">Xem trang</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer bg-opacity-5 border-primary">
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => onEdit(contact)}
              >
                <i className="bi bi-pencil-fill"></i>
                Chỉnh sửa
              </button>
              <button
                className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"} d-flex align-items-center gap-2`}
                onClick={() => onToggleFavorite(contact._id)}
              >
                <i className={`bi bi-star${isFavorite ? "-fill" : ""}`}></i>
                {isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
              </button>
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                onClick={() => onDelete(contact._id)}
              >
                <i className="bi bi-trash-fill"></i>
                Xóa
              </button>
              <button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={onClose}
              >
                <i className="bi bi-x-circle"></i>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};