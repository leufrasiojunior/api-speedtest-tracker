import DownloadResults from "../Components/PageComponents/DownloadResults";
import Home from "../Components/PageComponents/Home";
import PingResults from "../Components/PageComponents/PingResults";
import UploadResults from "../Components/PageComponents/UploadResults";

function StartPage() {
  document.title = "Home - Dashboard SpeedTest Tracker";

  return (
    <>
      <Home />
      <DownloadResults />
      <UploadResults />
      <PingResults />
    </>
  );
}

export default StartPage;
