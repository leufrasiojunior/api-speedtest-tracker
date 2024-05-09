import { useState } from "react";
// import Modal from "../Components/Modal";
import MydModalWithGrid from "../Components/TestModal";
// import PingData from "../Components/PageComponents/ComponentsDashboard/PingData";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* <PingData /> */}
      <button onClick={() => setOpenModal(!openModal)}>Abrir Modal</button>
      <MydModalWithGrid show={openModal} onHide={() => setOpenModal(false)} />
    </>
  );
}

export default Dashboard;
