import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api";
import Modal from "../../components/Modal";

export default function DashboardProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    category_id: "",
    tags: "",
    location: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fetchCategories = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    try {
      const response = await instance.get("/categories", config);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    try {
      const response = await instance.get("/products", config);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));

    if (name === "tags") {
      setTags(value.split(",").map((tag) => tag.trim()));
    }
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    // Create a FormData instance to handle file upload
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("price", formdata.price);
    formData.append("description", formdata.description);
    formData.append("category_id", formdata.category_id);
    formData.append("tags", tags.join(","));
    formData.append("location", formdata.location);

    // Append the selected file if it exists
    if (selectedFile) {
      formData.append("image", selectedFile);
    }



    try {
      await instance.post("/products", formData, config);
      fetchProducts();
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div>
          <button onClick={handleModal}>Products</button>
          {modalOpen && (
            <Modal
              title="Create Product"
              isVisible={modalOpen}
              onClose={handleModal}
              content={
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <label htmlFor="name">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Product Name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="image">Product Image</label>
                        <input
                          type="file"
                          name="image"
                          placeholder="Product Image"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <label htmlFor="price">Product Price</label>
                        <input
                          type="number"
                          name="price"
                          placeholder="Product Price"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="category_id">Product Category</label>
                        <select
                          name="category_id"
                          id="category_id"
                          onChange={handleChange}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <label htmlFor="description">Product Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Product Description"
                      onChange={handleChange}
                    />
                    <label htmlFor="tags">Product Tags</label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="Product Tags"
                      value={formdata.tags}
                      onChange={handleChange}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary text-white px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <label htmlFor="location">Product Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Product Location"
                      onChange={handleChange}
                    />
                    <button type="submit">Create</button>
                  </div>
                </form>
              }
            />
          )}
        </div>
      </div>
      <hr />
      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-center">Name</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Category</th>
              <th className="py-3 px-4 text-center">Tags</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && products.length === 0 && (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-full"
                  />
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.price}</td>
                <td className="py-3 px-4">{product.category.name}</td>
                <td className="py-3 px-4">{product.tags}</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
