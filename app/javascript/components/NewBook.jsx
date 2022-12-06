import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const NewBook = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [quantity, setQuantity] = useState("");

    let { id } = useParams(); 

    const stripHtmlEntities = (str) => {
        return String(str)
          .replace(/\n/g, "<br> <br>")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
    };

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/books/create";

        if (title.length == 0 || author.length == 0 || year.length == 0 || quantity == 0)
            return;
        
        const body = {
            id: id,
            title: stripHtmlEntities(title),
            author: stripHtmlEntities(author),
            year: year,
            quantity: quantity
        }

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
        })
          .then(() => navigate(`/bookstore/${id}`))
          .catch((error) => console.log(error.message));
    };

    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new book.
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="bookTitle">Book title</label>
                  <input
                    type="text"
                    name="title"
                    id="bookTitle"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setTitle)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookAuthor">Book author</label>
                  <input
                    type="text"
                    name="address"
                    id="bookAuthor"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setAuthor)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookYear">Book year</label>
                  <input
                  type="text"
                  name="year"
                  id="bookYear"
                  className="form-control"
                  required
                  onChange={(event) => onChange(event, setYear)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookQuantity"># of copies</label>
                  <input
                  type="text"
                  name="quanity"
                  id="bookQuantity"
                  className="form-control"
                  required
                  onChange={(event) => onChange(event, setQuantity)}
                  />
                </div>
                <button type="submit" className="btn custom-button mt-3">
                  Add Book
                </button>
                <Link to={`/bookstore/${id}`} className="btn btn-link mt-3">
                  Back to bookstore
                </Link>
              </form>
            </div>
          </div>
        </div>
    );
};

export default NewBook;