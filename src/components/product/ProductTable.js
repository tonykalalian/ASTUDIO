import React, { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../common/GlobalFilter";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-x: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-right: 0;
  }
`;

const CategoryLabel = styled.label`
  font-size: 16px;
  margin-right: 5px;
`;

const CategorySelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 0;
  width: 100%;

  @media (max-width: 768px) {
    width: auto;
    margin-top: 10px;
  }
`;

const CategoryOption = styled.option`
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #c0e3e5;
  border: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #fdc936;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
`;

const PageSizeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 0;

  @media (max-width: 768px) {
    width: auto;
    margin-top: 10px;
  }
`;

const PageSizeOption = styled.option`
  font-size: 16px;
`;

const PageNumberInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 0;
  width: 50px;

  @media (max-width: 768px) {
    width: auto;
    margin-top: 10px;
  }
`;

const ProductTable = () => {
  const { products, setProducts } = useProductContext();
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  } = useTable(
    {
      columns,
      data: categoryFilter === "ALL" ? products : filteredProducts,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageSize, pageIndex } = state;

  const handleCategoryFilterChange = async (e) => {
    setCategoryFilter(e.target.value);
    let apiUrl = "https://dummyjson.com/products/";

    if (e.target.value !== "ALL") {
      apiUrl += `category/${e.target.value}`;
    }

    try {
      const response = await axios.get(apiUrl);
      setFilteredProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  useEffect(() => {
    const apiUrl = "https://dummyjson.com/products?limit=100";
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response?.data?.products || []);
        setFilteredProducts(response?.data?.products || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  return (
    <Container>
      <HeaderContainer>
        <h3>Products</h3>
        <FilterOptions>
          <SearchContainer>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <CategoryLabel htmlFor="categoryFilter">Category:</CategoryLabel>
            <CategorySelect
              id="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            >
              <CategoryOption value="ALL">ALL</CategoryOption>
              <CategoryOption value="smartphones">Smartphones</CategoryOption>
              <CategoryOption value="laptops">Laptops</CategoryOption>
            </CategorySelect>
          </SearchContainer>
        </FilterOptions>
      </HeaderContainer>

      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  backgroundColor: rowIndex === 0 ? "#ebebeb" : "inherit",
                }}
              >
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          {"<"}
        </Button>
        <Button onClick={nextPage} disabled={!canNextPage}>
          {">"}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>
        <span>
          | Page {pageIndex + 1} of {pageOptions.length + " "}
        </span>
        <span>
          Go To Page:{" "}
          <PageNumberInput
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
          <PageSizeSelect value={pageSize} onChange={handlePageSizeChange}>
            {[5, 10, 20, 50].map((ps) => (
              <PageSizeOption key={ps} value={ps}>
                Show {ps}
              </PageSizeOption>
            ))}
          </PageSizeSelect>
        </span>
      </div>
    </Container>
  );
};

export default ProductTable;
