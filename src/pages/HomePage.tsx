import { useEffect, useState } from "react";
import { getItems } from "../api/getItems";
import { useQuery } from "../hooks/useQuery";

interface IGood {
  brand: string | null;
  id: string;
  price: number;
  product: string | null;
}

function HomePage() {
  const [items, setItems] = useState<IGood[]>([]);

  const query = useQuery();

  useEffect(() => {
    const offset = Number(query.get("offset")) || 10;
    const limit = Number(query.get("limit")) || 3;

    getItems(offset, limit).then((response) => {
      setItems(response.data.result);
    });
  }, []);

  return (
    <div className=" px-8 pt-10">
      {items.map((item: IGood) => (
        <div key={item.id} className=" border border-gray-500 mb-4 p-4">
          <h3 className=" text-lg">{item.product}</h3>
          <p>{item.brand}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
