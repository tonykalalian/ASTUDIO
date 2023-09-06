import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../GlobalFilter";
import { useProductContext } from "../ProductContext";

const ProductTable = () => {
  const { products, setProducts } = useProductContext();

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Brand", accessor: "brand" },
      { Header: "Category", accessor: "category" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
  } = useTable({ columns, data: products }, useGlobalFilter, usePagination);

  const { globalFilter, pageSize, pageIndex } = state;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/")
      .then((response) => {
        setProducts(response?.data?.products || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  return (
    <>
      <h3>Products</h3>
      <div className="container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <button
            className="btn btn-dark"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className="btn btn-dark"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>
          <button
            className="btn btn-dark"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {">"}
          </button>
          <button
            className="btn btn-dark"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
          <span>
            | Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <span>
            Go To Page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              min={1}
              onChange={(e) => {
                const pageNbr = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNbr);
              }}
            />
          </span>
          <span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30].map((ps) => {
                return (
                  <option key={ps} value={ps}>
                    Show {ps}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
