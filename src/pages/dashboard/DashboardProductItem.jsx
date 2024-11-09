import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function DashboardProductItem() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

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

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col justify-start align-middle gap-2">
      <Breadcrumbs/>
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
        </div>
      </div>
    </div>
  );
}
