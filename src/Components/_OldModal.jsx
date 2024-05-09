import { Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import PingModal from "./ModalComponents/PingModal";
import DownloadModal from "./ModalComponents/DownloadModal";
/* eslint-disable react/prop-types */

const BG_STYLE = {
  position: "fixed",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  backgroundColor: "rgb(0,0,0,0.2)",
  zIndex: "1000",
  width: "100%",
  height: "100%",
};

const MD_STYLE = {
  position: "fixed",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "15px",
  backgroundColor: "white",
  borderRadius: "20px",
  height: "50%",
  width: "50%",
};
// eslint-disable-next-line react/prop-types
function ModalCustom({ isOpen, requestData, onClose, idData }) {
  const handleCloseModal = (event) => {
    // Verifica se o clique ocorreu dentro do modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (isOpen && requestData) {
    return (
      <div style={BG_STYLE} onClick={handleCloseModal}>
        <div style={MD_STYLE} className="shadow-lg">
          <Modal.Header className="modal-title">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="poppins-medium modal-title"
            >
              #{idData}
            </Modal.Title>
          </Modal.Header>
          {/* <p>Jitter: {download.bandwidth}</p>
          <p>Latency: {download.bytes}</p>
          <p>Low: {download.elapsed}</p>
          <p>High: {download.latency.iqm}</p> */}
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={6} md={8}>
                  <PingModal requestData={requestData} />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={6} md={8}>
                  <DownloadModal requestData={requestData} />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    );
  }
  return null;
}

export default ModalCustom;
