import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import MaterialReactTable from "material-react-table";

const BooksTable = (props) => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const url = `/api/v1/bookstores/show/${this.props.params.id}`;
    try {
      const books = await axios.get(url);
      console.log(books.data);
      setBooks(books.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        accessorKey: "year",
        header: "Year",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={books} />;
};

export default BooksTable;
