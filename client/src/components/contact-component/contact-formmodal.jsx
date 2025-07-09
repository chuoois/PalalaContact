import { useState, useEffect } from "react";

export const ContactFormModal = ({ title = "Thêm liên hệ mới", onClose, onCreate, onUpdate, initialData = null }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    company: "",
    jobTitle: "",
    website: "",
    birthday: "",
    notes: "",
    tags: [],
    category: "other",
    isFavorite: false,
    status: "Active",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: {
          street: initialData.address?.street || "",
          city: initialData.address?.city || "",
          state: initialData.address?.state || "",
          country: initialData.address?.country || "",
          zipCode: initialData.address?.zipCode || "",
        },
        company: initialData.company || "",
        jobTitle: initialData.jobTitle || "",
        website: initialData.website || "",
        birthday: initialData.birthday ? new Date(initialData.birthday).toISOString().split('T')[0] : "",
        notes: initialData.notes || "",
        tags: initialData.tags || [],
        category: initialData.category || "other",
        isFavorite: initialData.isFavorite || false,
        status: initialData.status || "Active",
        socialMedia: {
          facebook: initialData.socialMedia?.facebook || "",
          twitter: initialData.socialMedia?.twitter || "",
          linkedin: initialData.socialMedia?.linkedin || "",
          instagram: initialData.socialMedia?.instagram || "",
        },
        userId: sessionStorage.getItem("userId") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else if (name.includes("socialMedia.")) {
      const socialMediaField = name.split(".")[1];
      setFormData({
        ...formData,
        socialMedia: { ...formData.socialMedia, [socialMediaField]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagBlur = () => {
    if (tagInput.trim()) {
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      setFormData({
        ...formData,
        tags: [...formData.tags, ...newTags],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData && onUpdate) {
      await onUpdate(initialData._id, formData);
    } else if (onCreate) {
      await onCreate(formData);
    }
    onClose();
  };

  return (
    <div className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header bg-light border">
            <h5 className="modal-title text-dark fw-bold">
              <i className="bi bi-person-plus-fill me-2"></i>
              {title}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <h6 className="fw-medium text-dark mb-3 d-flex align-items-center">
                    <i className="bi bi-person-fill me-2"></i>
                    Thông tin cơ bản
                  </h6>
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-person me-1"></i>
                        Họ *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-person me-1"></i>
                        Tên *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-telephone-fill me-1"></i>
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-envelope-fill me-1"></i>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-calendar-heart-fill me-1"></i>
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-folder-fill me-1"></i>
                        Danh mục
                      </label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="work">Công việc</option>
                        <option value="family">Gia đình</option>
                        <option value="friends">Bạn bè</option>
                        <option value="business">Kinh doanh</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Trạng thái
                      </label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Active">Hoạt động</option>
                        <option value="Archived">Lưu trữ</option>
                        <option value="Blocked">Chặn</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="isFavorite"
                          className="form-check-input"
                          name="isFavorite"
                          checked={formData.isFavorite}
                          onChange={handleChange}
                        />
                        <label htmlFor="isFavorite" className="form-check-label text-dark fw-medium">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          Thêm vào danh sách yêu thích
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <h6 className="fw-medium text-dark mb-3 d-flex align-items-center">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Thông tin bổ sung
                  </h6>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-building me-1"></i>
                        Công ty
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-briefcase-fill me-1"></i>
                        Chức vụ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-globe me-1"></i>
                        Website
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label text-dark fw-medium">
                        <i className="bi bi-tags-fill me-1"></i>
                        Thẻ (phân cách bằng dấu phẩy)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tagInput}
                        onChange={handleTagInput}
                        onBlur={handleTagBlur}
                        placeholder="Nhập thẻ, phân cách bằng dấu phẩy"
                      />
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge bg-primary bg-opacity-10 text-primary fw-medium px-3 py-2 border border-primary border-opacity-25"
                          >
                            {tag}
                            <button
                              type="button"
                              className="btn-close btn-close-sm ms-2"
                              onClick={() => handleRemoveTag(index)}
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-medium text-dark mb-2 d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        Địa chỉ
                      </h6>
                      <div className="d-flex flex-column gap-2">
                        <input
                          type="text"
                          className="form-control"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          placeholder="Đường"
                        />
                        <div className="row g-2">
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleChange}
                              placeholder="Thành phố"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleChange}
                              placeholder="Tỉnh/Bang"
                            />
                          </div>
                        </div>
                        <div className="row g-2">
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleChange}
                              placeholder="Quốc gia"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="address.zipCode"
                              value={formData.address.zipCode}
                              onChange={handleChange}
                              placeholder="Mã bưu điện"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-medium text-dark mb-2 d-flex align-items-center">
                        <i className="bi bi-share-fill me-1"></i>
                        Mạng xã hội
                      </h6>
                      <div className="d-flex flex-column gap-2">
                        <div className="input-group">
                          <span className="input-group-text bg-primary text-white">
                            <i className="bi bi-facebook"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            name="socialMedia.facebook"
                            value={formData.socialMedia.facebook}
                            onChange={handleChange}
                            placeholder="URL Facebook"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-info text-white">
                            <i className="bi bi-twitter"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            name="socialMedia.twitter"
                            value={formData.socialMedia.twitter}
                            onChange={handleChange}
                            placeholder="URL Twitter"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-primary text-white">
                            <i className="bi bi-linkedin"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            name="socialMedia.linkedin"
                            value={formData.socialMedia.linkedin}
                            onChange={handleChange}
                            placeholder="URL LinkedIn"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-danger text-white">
                            <i className="bi bi-instagram"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            name="socialMedia.instagram"
                            value={formData.socialMedia.instagram}
                            onChange={handleChange}
                            placeholder="URL Instagram"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label text-dark fw-medium">
                  <i className="bi bi-sticky-fill me-1"></i>
                  Ghi chú
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Nhập ghi chú"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer bg-light border">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              <i className="bi bi-x-circle me-1"></i>
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              <i className="bi bi-check-circle-fill me-1"></i>
              {title === "Chỉnh sửa liên hệ" ? "Cập nhật" : "Thêm liên hệ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};