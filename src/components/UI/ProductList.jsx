import React from "react";
import ProductCard from "./ProductCard";
const ProductList = ({ data }) => {
  return (
    <>
      {data?.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </>
  );
};

export default ProductList;
