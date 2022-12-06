import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewBookstore = () => {
  const navigate = useNavigate();
  const [codename, setCodename] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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
    const url = "/api/v1/bookstores/create";

    if (codename.length == 0 || address.length == 0 || phone.length == 0)
      return;

    const body = {
      codename,
      address: stripHtmlEntities(address),
      phone,
    };

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
      .then((response) => navigate(`/bookstore/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new bookstore.</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group my-2">
              <label htmlFor="bookstoreCodename">Bookstore codename</label>
              <input
                type="text"
                name="codename"
                id="bookstoreCodename"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCodename)}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="bookstoreAddress">Bookstore address</label>
              <input
                type="text"
                name="address"
                id="bookstoreAddress"
                className="form-control"
                required
                onChange={(event) => onChange(event, setAddress)}
              />
            </div>
            <label htmlFor="phone">Bookstore phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              required
              onChange={(event) => onChange(event, setPhone)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Bookstore
            </button>
            <Link to="/bookstores" className="btn btn-link mt-3">
              Back to bookstores
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBookstore;
