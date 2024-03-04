import { useEffect, useMemo, useState } from "react";
import { getItems } from "../api/getItems";

import { PAGE_SIZE } from "../config";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { IPageState, StateStatus } from "../store/goods/types";
import { addItems, addPage, setPageStatus } from "../store/goods";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const pages = useSelector<IRootState, Record<number, IPageState>>(
    (store) => store.pages
  );

  const isNextPageEmpty = useMemo(() => {
    const nextPage = pages[page + 1];
    return (
      nextPage &&
      nextPage.status !== StateStatus.pending &&
      !nextPage.items.length
    );
  }, [page, pages]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchParams({ page: page.toString() });
    if (!pages[page]) {
      const offset = PAGE_SIZE * (page - 1);
      dispatch(addPage({ page, status: StateStatus.pending }));

      getItems(offset, PAGE_SIZE).then((items) => {
        dispatch(addItems({ page, items }));
        dispatch(setPageStatus({ page, status: StateStatus.fulfilled }));
      });
    }
    if (!pages[page + 1]) {
      const offset = PAGE_SIZE * page;
      dispatch(addPage({ page: page + 1, status: StateStatus.pending }));

      getItems(offset, PAGE_SIZE).then((items) => {
        dispatch(addItems({ page: page + 1, items }));
        dispatch(
          setPageStatus({ page: page + 1, status: StateStatus.fulfilled })
        );
      });
    }
  }, [dispatch, page, pages, setSearchParams]);

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
          className=" text-gray-800 border border-gray-800 mb-4 p-4 disabled:border-gray-500 disabled:text-gray-500"
          disabled={isNextPageEmpty}
        >
          next
        </button>
      </div>

      {pages[page]?.status === StateStatus.pending ? (
        <h1>LOADING</h1>
      ) : (
        <div className=" md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {pages[page]?.items.map((item, i) => (
            <div key={item.id} className=" border border-gray-500 mb-4 p-4">
              <p>{i}</p>
              <h3 className=" text-lg">{item.product}</h3>
              <p>{item.id}</p>
              <p>{item.brand}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
