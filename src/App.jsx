import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
