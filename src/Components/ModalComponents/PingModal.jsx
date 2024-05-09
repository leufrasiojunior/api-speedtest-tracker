import { Col, Container, Row } from "react-bootstrap";

function PingModal(requestData) {
  if (requestData) {
    const { ping } = requestData.requestData;
    return (
      <Container>
        <div className="card shadow-sm grid " style={{ height: "9rem" }}>
          <h5 className="card-header text-center">Ping</h5>
          <Row className="h-100 align-items-center m-0">
            <Col>
              <h5 className="text-start ">Jitter</h5>
              <input
                className="form-control w-100"
                type="text"
                value={ping.jitter}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">Latency</h5>
              <input
                className="form-control w-100"
                type="text"
                value={ping.latency}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">Low</h5>
              <input
                className="form-control w-100"
                type="text"
                value={ping.low}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">High</h5>
              <input
                className="form-control w-100"
                type="text"
                value={ping.high}
                readOnly
              ></input>
            </Col>
          </Row>
        </div>
      </Container>
      // <Container>
      //   <Modal.Title className="mb-3">Ping</Modal.Title>
      //   <Row>
      //     <Col xs={6} md={2}>
      //       <label>Jitter</label>
      //       <div>
      //         <input
      //           className="form-control"
      //           type="text"
      //           value={ping.jitter}
      //           readOnly
      //         ></input>
      //       </div>
      //     </Col>
      //     <Col xs={6} md={2}>
      //       <div>
      //         <label>Lattency</label>
      //         <div>
      //           <input
      //             className="w-75"
      //             type="text"
      //             value={ping.latency}
      //             disabled
      //           ></input>
      //         </div>
      //       </div>
      //     </Col>
      //     <Col xs={6} md={2}>
      //       <div>
      //         <label>Low</label>
      //         <div>
      //           <input
      //             className="w-75"
      //             type="text"
      //             value={ping.low}
      //             disabled
      //           ></input>
      //         </div>
      //       </div>
      //     </Col>
      //     <Col xs={6} md={2}>
      //       <div>
      //         <label>high</label>
      //         <div>
      //           <input
      //             className="w-75"
      //             type="text"
      //             value={ping.high}
      //             disabled
      //           ></input>
      //         </div>
      //       </div>
      //     </Col>
      //   </Row>
      // </Container>
    );
  }
  return null;
}

export default PingModal;
