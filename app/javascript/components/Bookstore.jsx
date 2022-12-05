import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Bookstore = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [bookstore, setBookstore] = useState({ address: "" });
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState([]);
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

    const getBooks = async () => {
      const url = `/api/v1/show/${params.id}`;
      try {
        const data = await axios.get(url);
        console.log(data.data);
        setBooks(data.data);
      } catch (e) {
        console.log(e);
      }
    }

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
          <div className="row">
            <div className="col-sm-12 col-lg-2">
              <input 
              type="text"
              className="col-sm-12"
              placeholder="Search title, author, or year"
              onChange={e => {
                setSearch(e.target.value);
              }}
              />
            </div>
            <div className="col-sm-12 col-lg-7">
              <ul className="list-group">
                <h5 className="mb-2">Books</h5>
                {books.filter(book => {
                  if (search == "") {
                    return book;
                  } else if (book.title.toLowerCase().includes(search.toLowerCase())) {
                    return book;
                  } else if (book.author.toLowerCase().includes(search.toLowerCase())) {
                    return book;
                  } else if (book.year.toLowerCase().includes(search.toLowerCase())) {
                    return book;
                  }
                }).map(book => {
                  return <p>{book.title} - {book.author} - {book.year}</p>
                })}
              </ul>
            </div>
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
          <Link to="/bookstores" className="btn btn-link">
          Back to bookstores
          </Link>
        </div>
      </div>
    );
};
  
export default Bookstore;