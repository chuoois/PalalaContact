export const ContactCard = ({ data, onViewDetails, onToggleFavorite, onDelete, onEdit }) => {
  const { _id, fullName, category, isFavorite, phone, email, website, jobTitle, company, birthday, address, socialMedia, tags, notes, status } = data;

  return (
    <div className="card shadow-sm border-primary border-opacity-25 hover-shadow">
      <div className="card-body p-4">
        <div className="d-flex align-items-start">
          <div className="position-relative me-4 flex-shrink-0">
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center border"
              style={{ width: "64px", height: "64px" }}
            >
              <span className="text-dark fw-semibold fs-5">
                {fullName ? fullName.charAt(0).toUpperCase() : ''}
              </span>
            </div>
          </div>

          <div className="flex-grow-1 min-w-0">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-2">
                <h3 className="fw-semibold text-dark mb-0 fs-4">{fullName}</h3>
                <i
                  className={`bi bi-${
                    category === "work" ? "briefcase-fill" : category === "friends" ? "person-hearts" : "folder-fill"
                  } text-muted`}
                ></i>
                {isFavorite && <i className="bi bi-star-fill text-warning"></i>}
              </div>
              <span className={`badge ${status === "Active" ? "bg-success" : status === "Archived" ? "bg-warning" : "bg-danger"}`}>
                {status === "Active" ? "Hoạt động" : status === "Archived" ? "Lưu trữ" : "Chặn"}
              </span>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <p className="small text-muted mb-1 d-flex align-items-center gap-2">
                  <i className="bi bi-telephone-fill text-muted"></i>
                  {phone}
                </p>
                {email && (
                  <p className="small text-muted mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-envelope-fill text-muted"></i>
                    {email}
                  </p>
                )}
                {website && (
                  <p className="small text-muted mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-globe text-muted"></i>
                    {website}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                {jobTitle && (
                  <p className="small text-muted mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-briefcase-fill text-muted"></i>
                    {jobTitle}
                  </p>
                )}
                {company && (
                  <p className="small text-muted mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-building text-muted"></i>
                    {company}
                  </p>
                )}
                {birthday && (
                  <p className="small text-primary mb-1 d-flex align-items-center gap-2">
                    <i className="bi bi-calendar-heart-fill text-muted"></i>
                    {new Date(birthday).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {address && (
              <div className="mb-3">
                <p className="small text-muted d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt-fill text-muted mt-1"></i>
                  <span>{`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}</span>
                </p>
              </div>
            )}

            {socialMedia && Object.values(socialMedia).some((val) => val) && (
              <div className="d-flex gap-2 mb-3">
                <span className="small text-muted">Mạng xã hội:</span>
                {socialMedia.facebook && <i className="bi bi-facebook text-primary" title="Facebook"></i>}
                {socialMedia.instagram && <i className="bi bi-instagram text-danger" title="Instagram"></i>}
                {socialMedia.linkedin && <i className="bi bi-linkedin text-primary" title="LinkedIn"></i>}
                {socialMedia.twitter && <i className="bi bi-twitter text-info" title="Twitter"></i>}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark border">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {notes && (
              <div className="mb-3">
                <p className="small text-muted d-flex align-items-start gap-2">
                  <i className="bi bi-sticky-fill text-muted mt-1"></i>
                  <span className="fst-italic">{notes}</span>
                </p>
              </div>
            )}
          </div>

          <div className="d-flex flex-column gap-2 ms-3 flex-shrink-0">
            <button
              className="btn btn-sm btn-outline-primary"
              title="Xem chi tiết"
              onClick={() => onViewDetails(_id)}
            >
              <i className="bi bi-eye-fill"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              title="Chỉnh sửa"
              onClick={() => onEdit(data)}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button
              className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
              title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
              onClick={() => onToggleFavorite(_id)}
            >
              <i className={`bi bi-star${isFavorite ? "-fill" : ""}`}></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              title="Xóa"
              onClick={() => onDelete(_id)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};