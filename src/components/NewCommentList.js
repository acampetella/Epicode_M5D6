import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import SingleCommnet from "./SingleCommnet";
import { useState } from "react";
import AddComment from "../components/AddComment";
import '../styles/newCommentList.css'

const NewCommentList = ({bookId, comments, refreshFunction }) => {
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
  const toggleAddComment = () => {
    setIsAddCommentOpen(!isAddCommentOpen);
  };
  return (
    <>
      <Card style={{ width: "18rem" }} className="newCommentListCard">
        <Card.Body>
          <Card.Title>Commenti</Card.Title>
          <ListGroup>
            {comments &&
              comments.map((comment, index) => {
                return <SingleCommnet key={index} comment={comment} refreshFunction={refreshFunction} />;
              })}
          </ListGroup>
          <Button variant="primary" onClick={toggleAddComment} className="mt-2">
            Add Comment
          </Button>
        </Card.Body>
      </Card>
      {isAddCommentOpen &&
        <AddComment
          closeFunction={toggleAddComment}
          bookId={bookId}
          refreshFunction={refreshFunction}
        />
      }
    </>
  );
};

export default NewCommentList;
