import { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/styles.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

function bpsToMbps(bps) {
  return bps / 1000000;
}

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.31.23:4000/averages")
      .then((response) => {
        const transformedData = {
          ...response.data,
          averageDownload: bpsToMbps(response.data.averageDownload * 8),
          averageUpload: bpsToMbps(response.data.averageUpload * 8),
        };
        setData(transformedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Container
        style={{ marginTop: "20px" }}
        className="d-flex justify-content-center"
      >
        {data ? (
          <Row xs={1} sm={1} md={3}>
            <Col style={{ textAlign: "center" }}>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>Download Médio</Card.Header>
                <Card.Body>
                  <Card.Text>{data.averageDownload.toFixed(2)} Mbps</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>Upload Médio</Card.Header>
                <Card.Body>
                  <Card.Text>{data.averageUpload.toFixed(2)} Mbps</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  width: "18rem",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="boxShadow"
              >
                <Card.Header>Ping Médio</Card.Header>
                <Card.Body>
                  <Card.Text>{data.averagePing.toFixed(2)} Ms</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Carregando...</p>
        )}
      </Container>
    </>
  );
}

export default Home;
