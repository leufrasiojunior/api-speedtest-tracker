import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function bpsToMbps(bps) {
  return bps / 1000000;
}

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/averages")
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
      <Container>
        <h1>Resumo de Hoje</h1>
        {data ? (
          <Row md={3}>
            <Col>
              <p>Download Médio:</p>
              <p>{data.averageDownload.toFixed(2)} Mbps</p>
            </Col>

            <Col xs={6}>
              <div>Upload Médio:</div>
              <p>{data.averageUpload.toFixed(2)} Mbps</p>
            </Col>

            <Col>
              <div>Ping Médio:</div>
              <p>{data.averagePing}</p>
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
