import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [bName, setBName] = useState("");
  const [bImage, setBImage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBrandId, setDeleteBrandId] = useState(null);

  const token = localStorage.getItem("token"); // Admin token
  const API_URL = "http://localhost:7000"; // Backend base URL

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${API_URL}/brand/getAllBrands`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(res.data.brands);
    } catch (err) {
      toast.error("Failed to fetch brands");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Add brand
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!bName || !bImage) {
      toast.warn("Brand name and image are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("bName", bName);
      formData.append("myfile", bImage);

      const res = await axios.post(`${API_URL}/brand/createBrand`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Brand added successfully!");
        setBName("");
        setBImage(null);
        setShowAddModal(false);
        fetchBrands();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Error adding brand");
    }
  };

  // Delete brand
  const handleDelete = async () => {
    if (!deleteBrandId) return;
    try {
      await axios.delete(`${API_URL}/brand/deleteBrand/${deleteBrandId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Brand deleted successfully!");
      setShowDeleteModal(false);
      setDeleteBrandId(null);
      fetchBrands();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete brand");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Brand List</h3>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Brand
        </button>
      </div>

      {/* Add Brand Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}
             onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Brand</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddBrand}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Brand Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      placeholder="Enter brand name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Brand Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setBImage(e.target.files[0])}
                    />
                  </div>

                  {bImage && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(bImage)}
                        alt="Preview"
                        className="rounded"
                        width="120"
                        height="80"
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Brand Table */}
      <table className="table table-striped table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.bName}</td>
                <td>
                  {b.bImage ? (
                    <img src={b.bImage} alt={b.bName} width="70" height="50" className="rounded" />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { setDeleteBrandId(b.id); setShowDeleteModal(true); }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">No brands found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}
             onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Brand</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this brand?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
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

export default BrandPage;
