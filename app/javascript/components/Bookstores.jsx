import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Bookstores = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [bookstores, setBookstores] = useState([]);

  const getBookstores = async () => {
    const url = "/api/v1/bookstores/index";
    try {
      const bookstores = await axios.get(url);
      console.log(bookstores.data);
      setBookstores(bookstores.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBookstores();
  }, []);

  // useEffect(() => {
  //   const url = "/api/v1/bookstores/index";
  //   fetch(url)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((res) => setBookstores(res))
  //     .catch(() => navigate("/"));
  // }, []);

  const allBookstores = bookstores
    .filter((bookstore) => {
      if (search == "") {
        return bookstore;
      } else if (
        bookstore.codename.toLowerCase().includes(search.toLowerCase())
      ) {
        return bookstore;
      }
    })
    .map((bookstore, index) => (
      // const allBookstores = bookstores.map((bookstore, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={bookstore.image}
            className="card-img-top"
            alt={`${bookstore.codename} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{bookstore.codename}</h5>
            <Link
              to={`/bookstore/${bookstore.id}`}
              className="btn custom-button"
            >
              View bookstore
            </Link>
          </div>
        </div>
      </div>
    ));

  const noBookstore = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No bookstores yet. Why not <Link to="/new_bookstore">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">My Bookstores</h1>
          <p className="lead text-muted">
            I’ve pulled together all my bookstores so I can manage them easily
            from here.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row mb-4">
            <div className="col">
              <Link to="/bookstore" className="btn custom-button">
                Create New Bookstore
              </Link>
            </div>
            <div className="col">
              <div className="form-outline mb-4">
                <input
                  type="search"
                  className="form-control"
                  id="datatable-search-input"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {bookstores.length > 0 ? allBookstores : noBookstore}
          </div>
          <Link to="/" className="btn btn-link">
            Back to Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Bookstores;
