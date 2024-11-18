import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api";
import Breadcrumbs from "../../components/Breadcrumbs";
import Modal from "../../components/Modal";

export default function DashboardProductItem() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchProduct = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    try {
      const response = await instance.get(`/products/${productId}`, config);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    const id = product.id;

    try {
      await instance.put(`/products/publish/${id}`, {}, config);
      fetchProduct();
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col justify-start align-middle gap-2">
      <Breadcrumbs />
      <div className="flex flex-row gap-2">
        <img
          src={`https://api.eventistry.hub.ke/products/uploaded_image/${product.image}`}
          alt={product.name}
          className="size-1/2 rounded-lg shadow-2xl"
        />
        <div className="flex flex-col">
          <h2 className="font-poppins uppercase font-bold text-3xl">
            {product.name}
          </h2>
          <p>{product.description}</p>
          <p>Kes. {product.price}</p>
          <button
            className="bg-blue-500 text-white rounded-lg p-2"
            onClick={setModalOpen}
          >
            {product.publish_status ? "Unpublish" : "Publish"}
          </button>
          {modalOpen && (
            <Modal
              title="Create Product"
              isVisible={modalOpen}
              onClose={handleModal}
              content={
                <div className="flex flex-col justify-center align-middle gap-8">
                  <p>Are you sure you want to publish this product?</p>
                  <div className="flex flex-row justify-around">
                    <button
                      className="bg-blue-500 text-white rounded px-4 py-2"
                      onClick={handleModal}
                    >
                      no
                    </button>
                    <button
                      className="bg-red-500 text-white rounded px-4 py-2"
                      onClick={handlePublish}
                    >
                      yes
                    </button>
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
