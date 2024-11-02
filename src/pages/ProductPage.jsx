import React from "react";
import { useParams } from "react-router-dom";
import guitar from "../assets/guitar.jpg";
import Card from "../components/Card";
import {
  BanknotesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function ProductPage() {
  const { productId } = useParams();

  return (
    <div>
      <div className="flex flex-row justify-start align-middlen gap-16 p-10 w-full">
        <div className="w-1/2">
          <img
            src={guitar}
            alt="guitar"
            className="rounded-2xl w-full h-96 object-cover"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          <div className="flex flex-col justify-start align-middle gap-2">
            <h2 className="text-4xl font-bold text-primary">Guitar</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              quos, quasi, praesentium reiciendis asperiores, omnis saepe
              doloribus mollitia adipisci ratione corrupti sequi tempore sunt
              odio impedit odit similique quae ullam!
            </p>
            <div className="text-lg flex flex-row gap-2">
              <BanknotesIcon className="size-6 text-primary" />
              <p>
                <b>Kes. 500</b> per hr
              </p>
            </div>
            <p className="text-lg flex flex-row gap-2">
              <MapPinIcon className="size-6 text-primary" />
              <span>Nairobi</span>
            </p>
          </div>
          <button>Contact owner</button>
        </div>
      </div>
      <div className="container px-10">
        <h3 className="text-2xl text-primary">Related Products</h3>
        <div className="flex flex-row justify-center align-middle items-center">
          <ChevronLeftIcon className="size-12 text-primary" />
          <div className="flex flex-row flex-wrap w-full justify-around">
            <Card
              title="Guitar"
              description={
                "Lorem   ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              }
              price={500}
              location={"Nairobi"}
              image={guitar}
              hot={true}
            />
            <Card
              title="Guitar"
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              }
              price={500}
              location={"Nairobi"}
              image={guitar}
              hot={true}
            />
            <Card
              title="Guitar"
              description={"A very nice guitar"}
              price={500}
              location={"Nairobi"}
              image={guitar}
              hot={true}
            />
          </div>
          <ChevronRightIcon className="size-12 text-primary" />
        </div>
      </div>
    </div>
  );
}
