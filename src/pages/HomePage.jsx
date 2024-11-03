import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import guitar from "../assets/guitar.jpg";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="p-10 md:px-24 lg:px-52 flex flex-col gap-2 py-10">
        <h2 className="text-4xl font-bold text-primary">Featured Products</h2>
        <div className="flex flex-col md:flex-row flex-wrap w-full justify-around">
          <Card
            title="Guitar"
            description={"A very nice guitar"}
            price={500}
            location={"Nairobi"}
            image={guitar}
            hot={true}
            className="flex flex-col justify-start gap-2 w-full md:w-1/2 lg:w-1/4 hover:shadow-lg hover:cursor-pointer rounded-lg p-2"
          />
          <Card
            title="Guitar"
            description={"A very nice guitar"}
            price={500}
            location={"Nairobi"}
            image={guitar}
            hot={true}
            className="flex flex-col justify-start gap-2 w-full md:w-1/2 lg:w-1/4 hover:shadow-lg hover:cursor-pointer rounded-lg p-2"
          />
          <Card
            title="Guitar"
            description={"A very nice guitar"}
            price={500}
            location={"Nairobi"}
            image={guitar}
            hot={true}
            className="flex flex-col justify-start gap-2 w-full md:w-1/2 lg:w-1/4 hover:shadow-lg hover:cursor-pointer rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
