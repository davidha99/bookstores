import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Bookstore = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [bookstore, setBookstore] = useState({ address: "" });
    const [books, setBooks] = useState([]);
    const [copies, setCopies] = useState([]);

    useEffect(() => {
        const url = `/api/v1/show/${params.id}`;
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

    useEffect(() => {
      // Get the copies of actual bookstore
      const copies_url = `/api/v1/copies/show/${params.id}`;
      const books_url = `/api/v1/books/show/${params.id}`;
    }, [params.id]);

    const bookList = () => {
      let bookList = "No books available";
  
      if (bookstore.books.length > 0) {
        bookList = bookstore.books
          .split(",")
          .map((book, index) => (
            <li key={index} className="list-group-item">
              {book}
            </li>
          ));
      }
  
      return bookList;
    };

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

    // TODO: Render bookstore with its list of books
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={bookstore.image}
            alt={`${bookstore.codename} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {bookstore.codename}
          </h1>
        </div>
        <div className="container py-5">
          <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteBookstore}
              >
                Delete Bookstore
              </button>
            </div>
        </div>
      </div>
    );
};
  
export default Bookstore;