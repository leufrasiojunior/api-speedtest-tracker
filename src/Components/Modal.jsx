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
function Modal({ isOpen, requestData, onClose }) {
  const handleCloseModal = (event) => {
    // Verifica se o clique ocorreu dentro do modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (isOpen && requestData) {
    const { download } = requestData;
    return (
      <div style={BG_STYLE} onClick={handleCloseModal}>
        <div style={MD_STYLE}>
          <div>
            <p>Jitter: {download.bandwidth}</p>
            <p>Latency: {download.bytes}</p>
            <p>Low: {download.elapsed}</p>
            <p>High: {download.latency.iqm}</p>
            <button onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;
