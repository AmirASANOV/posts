import { useEffect, useMemo, useState } from "react";
import { getItems } from "../api/getItems";

import { PAGE_SIZE } from "../config";
import { useSearchParams } from "react-router-dom";

interface IGood {
  brand: string | null;
  id: string;
  price: number;
  product: string | null;
}

function HomePage() {
  const [items, setItems] = useState<IGood[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(searchParams.get("page"));

  useEffect(() => {
    setSearchParams({ page: page.toString() });

    const offset = PAGE_SIZE * (page - 1);
    setIsLoading(true);
    getItems(offset, PAGE_SIZE).then((itemsList) => {
      setItems(itemsList);
      setIsLoading(false);
    });
  }, [page, setSearchParams]);

  return (
    <div className=" px-8 pt-10">
      <div className=" flex gap-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className=" text-gray-800 border border-gray-800 mb-4 p-4 disabled:border-gray-500 disabled:text-gray-500"
        >
          prev
        </button>

        <p className=" border border-gray-500 mb-4 p-4">Страница: {page}</p>

        <button
          onClick={() => setPage(page + 1)}
          className=" border border-gray-500 mb-4 p-4"
        >
          next
        </button>
      </div>

      {isLoading ? (
        <h1>LOADING</h1>
      ) : (
        items.map((item, i) => (
          <div key={item.id} className=" border border-gray-500 mb-4 p-4">
            <p>{i}</p>
            <h3 className=" text-lg">{item.product}</h3>
            <p>{item.id}</p>
            <p>{item.brand}</p>
            <p>{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
