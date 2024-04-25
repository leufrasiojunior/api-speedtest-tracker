import DownloadResults from "../Components/PageComponents/DownloadResults";
import Home from "../Components/PageComponents/Home";
import PingResults from "../Components/PageComponents/PingResults";
import UploadResults from "../Components/PageComponents/UploadResults";

function StartPage() {
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
