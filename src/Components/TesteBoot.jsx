import React from "react";
import { Card } from "react-bootstrap";

const MyGridPage = () => {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>Primary Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyGridPage;
