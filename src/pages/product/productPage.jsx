import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  getAllCategories,
  getAllBrands,
  createProduct,
} from "../../api/apiService";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  // ------------------ Fetching Functions ------------------
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await getAllBrands();
      setBrands(res.data.brands);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to fetch brands");
    }
  };

  // ------------------ Utility Functions ------------------
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.bName : "-";
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.cName : "-";
  };

  // ------------------ Delete Product ------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to delete product");
    }
  };

  // ------------------ Add Product ------------------
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("pName", form.pName.value);
    formData.append("pDescription", form.pDescription.value);
    formData.append("price", form.price.value);
    formData.append("quantity", form.quantity.value);
    formData.append("catID", form.catID.value);
    formData.append("brandID", form.brandID.value);

    try {
      const res = await createProduct(formData);
      toast.success("Product added successfully");
      setShowModal(false);
      form.reset(); // clear form
      fetchProducts(); // refresh product list
    } catch (error) {
      console.error(
        "Create Product Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.msg || "Failed to add product");
    }
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product List</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.pName}</td>
                <td>{p.pDescription || "-"}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{getCategoryName(p.catID)}</td>
                <td>{getBrandName(p.brandID)}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="pName" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="pDescription" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="catID" required>
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.cName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select name="brandID" required>
                <option value="">-- Select Brand --</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
