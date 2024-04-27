import { useState } from "react";
import Modal from "../Components/Modal";
// import PingData from "../Components/PageComponents/ComponentsDashboard/PingData";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* <PingData /> */}
      <button onClick={() => setOpenModal(!openModal)}>Abrir Modal</button>
      <Modal isOpen={openModal}>asdadasdasdasdasd</Modal>
    </>
  );
}

export default Dashboard;
