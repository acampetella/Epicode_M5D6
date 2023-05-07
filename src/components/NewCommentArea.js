import React from "react";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import NewCommentList from "./NewCommentList";
import "../styles/newCommentArea.css";

const NewCommentArea = ({ bookId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYTdlMWIxNGE1MTAwMTQ2NjNmZmYiLCJpYXQiOjE2ODIyNjk1ODcsImV4cCI6MTY4MzQ3OTE4N30.XEtp5nynY-RRJGeYZJhBl5eugSzgadDfGk_7RIAx83k",
          },
        }
      );
      const response = await data.json();
      setComments(response);
      setLoading(false);
    } catch (error) {
      if (error) {
        setError("Errore nella ricezione dei dati");
      }
    }
  };
  useEffect(() => {
    if (bookId !== "") {
      getComments();
    }
  }, [bookId]);
  return (
    <div className="newCommentAreaContainer">
      {loading && !error && <RingLoader />}
      {!loading && !error && (
        <NewCommentList
          bookId={bookId}
          comments={comments}
          refreshFunction={getComments}
        />
      )}
      {error && <h3 className="text-danger">{error}</h3>}
    </div>
  );
};

export default NewCommentArea;
