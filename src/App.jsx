import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import MyGridPage from "./Components/TesteBoot";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <MyGridPage />
    </>
  );
}

export default App;
