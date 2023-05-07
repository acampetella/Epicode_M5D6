import React from "react"
import { ListGroup, Button } from "react-bootstrap"
import RatingSystem from "../components/RatingSystem"
import { useState } from "react"
import { RingLoader } from "react-spinners"
import ConfirmWindow from "./ConfirmWindow"

const SingleCommnet = ({ comment, refreshFunction }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showConfirmWindow, setShowConfirmWindow] = useState(false);
  const deleteComment = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYTdlMWIxNGE1MTAwMTQ2NjNmZmYiLCJpYXQiOjE2ODIyNjk1ODcsImV4cCI6MTY4MzQ3OTE4N30.XEtp5nynY-RRJGeYZJhBl5eugSzgadDfGk_7RIAx83k",
          },
          method: "DELETE"
        }
      );
      await data.json()
      setLoading(false)
    } catch (error) {
      if (error) setError("Errore nella cancellazione del commento");
    }
  }
  const deleteFunction = async () => {
    await deleteComment()
    await refreshFunction()
    closeConfirmWindow()
  }
  const openConfirmWindow = () => {
    setShowConfirmWindow(true)
  }
  const closeConfirmWindow = () => {
    setShowConfirmWindow(false)
  }
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div>{comment.comment}</div>
        <div>
          relativo al libro: {comment.elementId}
          <div>
            <Button variant="primary" size="sm" onClick={openConfirmWindow}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <RatingSystem stars={comment.rate} />
      {loading && !error && <RingLoader />}
      {error &&
        <div>
          <h5 className="text-danger">{error}</h5>
        </div>
      }
      {showConfirmWindow && (
        <ConfirmWindow 
          question="Sicuro di eliminare il commento ?"
          noFunction={closeConfirmWindow}
          yesFunction={deleteFunction}
        />
      )}
    </ListGroup.Item>
  );
};

export default SingleCommnet;
