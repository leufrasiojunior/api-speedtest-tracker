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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "150px",
  backgroundColor: "white",
  borderRadius: "20px",
};
// eslint-disable-next-line react/prop-types
function Modal({ isOpen, children }) {
  if (isOpen) {
    return (
      <div style={BG_STYLE}>
        <div style={MD_STYLE}>{children}</div>
      </div>
    );
  }
  return null;
}

export default Modal;
