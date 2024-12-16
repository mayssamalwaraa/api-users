import { useEffect, useState } from "react";

const Products = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    console.log("fetching products...", category);
    setProducts(["clothes", "phone"]);
  }, [category]);
  return <div>products List</div>;
};

export default Products;
