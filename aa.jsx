/* eslint-disable react/prop-types */
const BG_STYLE = {
  position: "fixed",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  backgroundColor: "rgb(0,0,0,0.2)",
  zIndex: "1000",
};

const MD_STYLE = {
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "150px",
  backgroundColor: "white",
  borderRadius: "20px",
};
// eslint-disable-next-line react/prop-types
function MydModalWithGrid({ isOpen, requestData, onClose }) {
  const handleCloseModal = (event) => {
    // Verifica se o clique ocorreu dentro do modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (isOpen && requestData) {
    const { download } = requestData;
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Grid in Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
}

export default MydModalWithGrid;
