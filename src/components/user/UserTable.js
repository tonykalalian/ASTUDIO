import React, { useEffect, useMemo } from "react";
import axios from "../../utils/axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../common/GlobalFilter";
import { useUserContext } from "../context/UserContext";

const UserTable = () => {
  const { users, setUsers } = useUserContext();

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Maiden Name", accessor: "maidenName" },
      { Header: "Age", accessor: "age" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Email", accessor: "email" },
      { Header: "Username", accessor: "username" },
      { Header: "Blood Group", accessor: "bloodGroup" },
      { Header: "Eye Color", accessor: "eyeColor" },
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
  } = useTable({ columns, data: users }, useGlobalFilter, usePagination);

  const { globalFilter, pageSize, pageIndex } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/users/?limit=100"
        ); // Update the limit as needed
        setUsers(response?.data?.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [setUsers]);

  return (
    <>
      <h3>Users</h3>
      <div className="container">
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

export default UserTable;
