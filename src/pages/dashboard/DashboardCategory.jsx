import { useEffect, useState } from "react";
import { instance } from "../../api";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";

export default function DashboardCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    try {
      await instance.post("/categories", formdata, config);
      fetchCategories();
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    const id = formdata.id;
    // remove id from formdata
    delete formdata.id;
    delete formdata.created_at;
    delete formdata.updated_at;
    try {
      await instance.put(
        `/categories/${id}`,
        formdata,
        config
      );
      fetchCategories();
      handleEditModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    try {
      await instance.delete(`/categories/${id}`, config);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
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

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEdit = (category) => {
    setFormdata(category);
    handleEditModal();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col justify-center align-middle gap-2">
      <div className="flex flex-row w-full justify-between align-middle items-center">
        <div>
          <h1 className="text-3xl">Category Section</h1>
        </div>
        <div>
          <button onClick={handleModal}>Create Category</button>
          {modalOpen && (
            <Modal
              title="Create Category"
              isVisible={modalOpen}
              onClose={handleModal}
              content={
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Category Name"
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
      <div className="flex flex-col justify-start align-middle">
        <h2>All Categories</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Category Name</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="3" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="3" className="text-center">
                  Error: {error}
                </td>
              </tr>
            )}
            {categories.length === 0 && !loading && (
              <tr>
                <td colSpan="3" className="text-center">
                  No categories found
                </td>
              </tr>
            )}
            {categories.map((category, index) => (
              <tr key={category.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-center">{index + 1}</td>
                <td className="py-3 px-4 text-center">{category.name}</td>
                <td className="py-3 px-4 flex flex-row justify-center items-center space-x-2">
                  <button
                    onClick={handleEdit.bind(this, category)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
                {editModalOpen && (
                    <Modal
                      title="Edit Category"
                      isVisible={editModalOpen}
                      onClose={handleEditModal}
                      content={
                        <form onSubmit={handleSubmitUpdate}>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="name">Category Name</label>
                            {/* <div>previous name: {formdata.name}</div> */}
                            <input
                              type="text"
                              name="name"
                              placeholder="Category Name"
                              value={formdata.name}
                              onChange={handleChange}
                            />
                            <button type="submit">Update category</button>
                          </div>
                        </form>
                      }
                    />
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
