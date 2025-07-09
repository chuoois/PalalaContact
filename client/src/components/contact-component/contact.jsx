import { useState, useEffect } from "react";
import { ContactCard } from "./contact-card";
import { ContactFormModal } from "./contact-formmodal";
import contactService from "../../services/contact.services";
import { useDebounce } from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import { ContactDetailModal } from "./contact-detailmodal";

export const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const debouncedSearchQuery = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const params = {};
        if (categoryFilter) params.category = categoryFilter;
        if (statusFilter) params.status = statusFilter;
        if (debouncedSearchQuery) params.search = debouncedSearchQuery;

        const data = await contactService.getContactbyUserId(params);
        setContacts(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [categoryFilter, statusFilter, debouncedSearchQuery]);

  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);
  const regularContacts = contacts.filter((contact) => !contact.isFavorite);

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category === categoryFilter ? "" : category);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? "" : status);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleViewDetails = async (contactId) => {
    try {
      const contactData = await contactService.getContactdetails(contactId);
      setSelectedContact(contactData);
      setShowModal(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleFavorite = async (contactId) => {
    try {
      const updatedContact = await contactService.togleFavorite(contactId);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === contactId ? { ...contact, isFavorite: !contact.isFavorite } : contact
        )
      );
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact({ ...selectedContact, isFavorite: !selectedContact.isFavorite });
      }
      toast.success(`Đã ${updatedContact.isFavorite ? "thêm vào" : "xóa khỏi"} danh sách yêu thích`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateContact = async (contactData) => {
    try {
      const response = await contactService.createContact(contactData);
      setContacts((prevContacts) => [...prevContacts, response.data]);
      toast.success(response.message);
    } catch (err) {
      toast.error(err.message || "Lỗi khi tạo liên hệ");
    }
  };

  const handleUpdateContact = async (contactId, contactData) => {
    try {
      const response = await contactService.updateContact(contactId, contactData);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === contactId ? response.data : contact
        )
      );
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(response.data);
      }
      toast.success(response.message);
    } catch (err) {
      toast.error(err.message || "Lỗi khi cập nhật liên hệ");
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm("Bạn có chắc muốn xóa liên hệ này?")) return;
    try {
      const userId = sessionStorage.getItem("userId");
      await contactService.deleteContact(contactId, userId);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== contactId));
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(null);
        setShowModal(false);
      }
      toast.success("Xóa liên hệ thành công");
    } catch (err) {
      toast.error(err.message || "Lỗi khi xóa liên hệ");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleOpenCreateModal = () => {
    setEditContact(null);
    setShowFormModal(true);
  };

  const handleOpenEditModal = (contact) => {
    setEditContact(contact);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditContact(null);
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-white border-bottom shadow-sm">
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1 className="h3 mb-0">
                <i className="bi bi-person-lines-fill"></i> Danh bạ
              </h1>
            </div>
            <button
              className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
              onClick={handleOpenCreateModal}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Thêm liên hệ
            </button>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="flex-grow-1 position-relative">
              <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
                <i className="bi bi-search text-muted"></i>
              </div>
              <input
                type="text"
                className="form-control ps-5 py-3"
                placeholder="Tìm kiếm theo tên, số điện thoại, email..."
                value={searchInput}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4">
            {["all", "family", "friends", "work", "business", "other"].map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm d-flex align-items-center gap-2 ${
                  categoryFilter === (cat === "all" ? "" : cat) ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleCategoryFilter(cat === "all" ? "" : cat)}
              >
                <i
                  className={`bi bi-${
                    cat === "all"
                      ? "people-fill"
                      : cat === "family"
                      ? "house-heart-fill"
                      : cat === "friends"
                      ? "person-hearts"
                      : cat === "work"
                      ? "briefcase-fill"
                      : cat === "business"
                      ? "building-fill"
                      : "folder-fill"
                  }`}
                ></i>
                {cat === "all" ? "Tất cả" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="d-flex gap-2 mb-4">
            {["Active", "Archived", "Blocked"].map((stat) => (
              <button
                key={stat}
                className={`btn btn-sm ${statusFilter === stat ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleStatusFilter(stat)}
              >
                {stat === "Active" ? "Hoạt động" : stat === "Archived" ? "Lưu trữ" : "Chặn"}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-3 small text-muted">
            <span>
              <i className="bi bi-people-fill text-muted me-1"></i>
              Tổng: {contacts.length} liên hệ
            </span>
            <span>•</span>
            <span>
              <i className="bi bi-eye-fill text-muted me-1"></i>
              Hiển thị: {contacts.length}
            </span>
            <span>•</span>
            <span>
              <i className="bi bi-star-fill text-warning me-1"></i>
              Yêu thích: {favoriteContacts.length}
            </span>
          </div>
        </div>
      </div>

      <div className="container-fluid p-4">
        {favoriteContacts.length > 0 && (
          <div className="mb-5">
            <h2 className="h4 fw-semibold text-dark mb-4 d-flex align-items-center">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Yêu thích ({favoriteContacts.length})
            </h2>
            <div className="d-flex flex-column gap-3">
              {favoriteContacts.map((contact) => (
                <ContactCard
                  key={contact._id}
                  data={contact}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteContact}
                  onEdit={handleOpenEditModal}
                />
              ))}
            </div>
          </div>
        )}

        {regularContacts.length > 0 && (
          <div>
            <h2 className="h4 fw-semibold text-dark mb-4 d-flex align-items-center">
              <i className="bi bi-people-fill me-2"></i>
              Tất cả liên hệ ({regularContacts.length})
            </h2>
            <div className="d-flex flex-column gap-3">
              {regularContacts.map((contact) => (
                <ContactCard
                  key={contact._id}
                  data={contact}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteContact}
                  onEdit={handleOpenEditModal}
                />
              ))}
            </div>
          </div>
        )}

        {contacts.length === 0 && (
          <div className="text-center text-muted">
            <i className="bi bi-person-lines-fill fs-1 mb-3"></i>
            <p>Chưa có liên hệ nào. Nhấn "Thêm liên hệ" để bắt đầu!</p>
          </div>
        )}
      </div>

      {showModal && selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={handleCloseModal}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteContact}
          onEdit={handleOpenEditModal}
        />
      )}

      {showFormModal && (
        <ContactFormModal
          title={editContact ? "Chỉnh sửa liên hệ" : "Thêm liên hệ mới"}
          onClose={handleCloseFormModal}
          onCreate={handleCreateContact}
          onUpdate={handleUpdateContact}
          initialData={editContact}
        />
      )}
    </div>
  );
};