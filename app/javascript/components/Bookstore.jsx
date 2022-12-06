import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import BooksTable from "./BooksTable";

const Bookstore = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [bookstore, setBookstore] = useState({ address: "" });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const url = `/api/v1/bookstores/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setBookstore(response))
      .catch(() => navigate("/bookstores"));
  }, [params.id]);

  const getBooks = async () => {
    const url = `/api/v1/books/show/${params.id}`;
    try {
      const books = await axios.get(url);
      setBooks(books.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBookstore = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/bookstores"))
      .catch((error) => console.log(error.message));
  };

  // const BooksTable = () => {
  //   const columns = useMemo(
  //     () => [
  //       {
  //         accessorKey: "title",
  //         header: "Title",
  //       },
  //       {
  //         accessorKey: "author",
  //         header: "Author",
  //       },
  //       {
  //         accessorKey: "year",
  //         header: "Year",
  //       },
  //       {
  //         accessorKey: "quantity",
  //         header: "Quantity",
  //       },
  //     ],
  //     []
  //   );

  //   return <MaterialReactTable columns={columns} data={books} />;
  // };

  return (
    <>
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={bookstore.image}
          alt={`${bookstore.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {bookstore.codename}
        </h1>
      </div>
      <div className="container py-4">
        <div className="row">
          <BooksTable params={params} />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <Link to={`/bookstores`} className="btn btn-link me-md-2">
            Back to bookstores
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteBookstore}
          >
            Delete Bookstore
          </button>
        </div>
      </div>
    </>
  );
};

export default Bookstore;
