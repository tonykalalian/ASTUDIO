// UserTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "maidenName", headerName: "Maiden Name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  { field: "gender", headerName: "Gender", width: 110 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "bloodGroup", headerName: "Blood Group", width: 130 },
  { field: "eyeColor", headerName: "Eye Color", width: 130 },
];

const UserTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setUserData(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={userData}
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

export default UserTable;
