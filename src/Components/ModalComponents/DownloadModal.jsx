import { Col, Container, Row } from "react-bootstrap";

function bpsToMbps(bps) {
  return bps / 1000000;
}
function DownloadModal(requestData) {
  if (requestData) {
    const { download } = requestData.requestData;
    console.log(download.latency);
    return (
      <Container>
        <div className="card shadow-sm grid " style={{ height: "9rem" }}>
          <h5 className="card-header text-center">Download</h5>
          <Row className="h-100 align-items-center m-0">
            <Col>
              <p className="text-start">iqm</p>
              <input
                className="form-control w-100"
                type="text"
                value={download.latency.iqm}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">low</h5>
              <input
                className="form-control w-100"
                type="text"
                value={download.latency.low}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">high</h5>
              <input
                className="form-control w-100"
                type="text"
                value={download.latency.high}
                readOnly
              ></input>
            </Col>
            <Col>
              <h5 className="text-start ">jitter</h5>
              <input
                className="form-control w-100"
                type="text"
                value={download.latency.jitter}
                readOnly
              ></input>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
  return null;
}

export default DownloadModal;
