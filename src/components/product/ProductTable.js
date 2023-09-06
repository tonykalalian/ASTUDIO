import React, { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../common/GlobalFilter";
import { useProductContext } from "../context/ProductContext";

const ProductTable = () => {
  const { products, setProducts } = useProductContext();
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const columns = useMemo(
    () => [
      { Header: "TITLE", accessor: "title" },
      { Header: "BRAND", accessor: "brand" },
      { Header: "CATEGORY", accessor: "category" },
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

  const handleCategoryFilterChange = async (e) => {
    setCategoryFilter(e.target.value);
    let apiUrl = "https://dummyjson.com/products/";

    // Add category filter if not "ALL"
    if (e.target.value !== "ALL") {
      apiUrl += `category/${e.target.value}`;
    }

    try {
      const response = await axios.get(apiUrl);
      setProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products?limit=100";
    axios
      .get(apiUrl)
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
      <div className="container content-container">
        <div className="filter-options">
          <label>
            Category:
            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            >
              <option value="ALL">ALL</option>
              {[
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "automotive",
                "motorcycle",
                "lighting",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead className="table-header">
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
                <tr
                  {...row.getRowProps()}
                  className={row.index === 0 ? "table-row-grey" : "table-row"}
                >
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
              {[5, 10, 20, 50].map((ps) => (
                <option key={ps} value={ps}>
                  Show {ps}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
