import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [addName, setAddName] = useState("");

  // ✅ Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data?.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  // ✅ Add Category
  const handleAddCategory = async () => {
    if (!addName.trim()) return toast.warn("Category name cannot be empty");
    try {
      const res = await createCategory({ cName: addName });
      setCategories((prev) => [...prev, res.data?.category]);
      toast.success("Category added successfully");
      setAddName("");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setNewName(category.cName);
    setShowEditModal(true);
  };

  // ✅ Update Category
  const handleUpdate = async () => {
    if (!newName.trim()) return toast.warn("Category name cannot be empty");
    try {
      await updateCategory(selectedCategory.id, { cName: newName });
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, cName: newName } : cat
        )
      );
      toast.success("Category updated successfully");
      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  // ✅ Open Delete Modal
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  // ✅ Delete Category
  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory.id);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory.id)
      );
      toast.success("Category deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Category List</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* ✅ Properly structured table */}
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat, index) => (
              <tr key={cat?.id || index}>
                <td>{cat?.id ?? "N/A"}</td>
                <td>{cat?.cName ?? "Unnamed"}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => openEditModal(cat)}
                    disabled={!cat}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => openDeleteModal(cat)}
                    disabled={!cat}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Add Category Modal */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddCategory}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {showEditModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{selectedCategory?.cName}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
