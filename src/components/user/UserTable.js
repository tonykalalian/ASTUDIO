import React, { useEffect, useMemo } from "react";
import axios from "../../utils/axios";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../common/GlobalFilter";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const H1 = styled.h1`
  text-align: center;
`;

const UserTable = () => {
  const { users, setUsers } = useUserContext();

  const columns = useMemo(
    () => [
      { Header: "FIRST NAME", accessor: "firstName" },
      { Header: "LAST NAME", accessor: "lastName" },
      { Header: "MAIDEN NAME", accessor: "maidenName" },
      { Header: "AGE", accessor: "age" },
      { Header: "GENDER", accessor: "gender" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "USERNAME", accessor: "username" },
      { Header: "BLOODGROUP", accessor: "bloodGroup" },
      { Header: "EYECOLOR", accessor: "eyeColor" },
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
        );
        setUsers(response?.data?.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [setUsers]);

  return (
    <Container>
      <H1>Users</H1>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.index === 0 ? "table-row-grey" : "table-row"}
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
    </Container>
  );
};

export default UserTable;
