// ProductTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "price", headerName: "Price", type: "number", width: 100 },
  {
    field: "discountPercentage",
    headerName: "Discount %",
    type: "number",
    width: 120,
  },
  { field: "rating", headerName: "Rating", type: "number", width: 100 },
  { field: "stock", headerName: "Stock", type: "number", width: 100 },
  { field: "brand", headerName: "Brand", width: 150 },
  { field: "category", headerName: "Category", width: 150 },
];

const ProductTable = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    axios
      .get("https://dummyjson.com/products/")
      .then((response) => {
        setProductData(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={productData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        components={{
          Toolbar: () => (
            <div>
              <GridToolbar />
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ProductTable;
