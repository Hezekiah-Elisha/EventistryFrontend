import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api";
import Modal from "../../components/Modal";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function DashboardProductReviews() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const deleteProduct = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    try {
      await instance.delete(`/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumbs />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-row justify-end align-middle items-center gap-2">
          <span onClick={fetchProducts} className="hover:cursor-pointer">
            <ArrowPathIcon className="size-6" />
          </span>          
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
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Category</th>
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

            {products.map((product, index) =>
              product.publish_status ? null : (
                <tr key={product.id} className="">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`https://api.eventistry.hub.ke/products/uploaded_image/${product.image}`}
                      alt={product.name}
                      className="h-12 w-12 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">{product.name}</td>
                  <td className="py-3 px-4 text-center">{product.price}</td>
                  <td className="py-3 px-4 text-center">
                    {product.publish_status ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                        Unpublished
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {
                      categories.find(
                        (category) => category.id === product.category_id
                      )?.name
                    }
                  </td>
                  <td className="py-3 px-4 flex flex-row justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/products/${product.id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
