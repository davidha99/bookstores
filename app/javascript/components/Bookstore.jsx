import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Bookstore = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [bookstore, setBookstore] = useState({ address: "" });

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

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    // TODO: Render bookstore with its list of books
};
  
export default Bookstore;