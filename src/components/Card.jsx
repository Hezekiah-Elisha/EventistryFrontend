import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

Card.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  price: propTypes.number,
  location: propTypes.string,
  image: propTypes.string,
  hot: propTypes.bool,
};

export default function Card({
  title,
  description,
  price,
  location,
  image,
  hot,
}) {
  return (
    <Link
      to="products/1"
      className="flex flex-col justify-start gap-2 w-1/4 hover:shadow-lg hover:cursor-pointer rounded-lg p-2"
    >
      <div className="relative">
        <img
          src={image}
          alt="guitar"
          className="w-full h-full rounded-2xl transform transition-transform duration-300 hover:scale-110"
        />
        <span className="absolute bottom-0 right-0 mb-2 mr-2 bg-red-600 text-white px-2 py-1 rounded">
          hot
        </span>
      </div>
      <div className="p-2">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <b>Kes. {price}</b> per hr
        </p>
        <p className="flex flex-row gap-2">
          <MapPinIcon className="size-6" />
          {location}
        </p>
      </div>
    </Link>
  );
}
