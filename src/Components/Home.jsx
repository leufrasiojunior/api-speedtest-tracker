import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";

function bpsToMbps(bps) {
  return bps / 1000000;
}

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/averages")
      .then((response) => {
        const transformedData = {
          ...response.data,
          averageDownload: bpsToMbps(response.data.averageDownload * 8),
          averageUpload: bpsToMbps(response.data.averageUpload * 8),
        };
        setData(transformedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="">
        <h1>Resumo de Hoje</h1>
        {data ? (
          <div className="">
            <div className="">
              <div>
                <div className="">
                  <div className="">Download Médio:</div>
                  <div className="">
                    <p className="">{data.averageDownload.toFixed(2)} Mbps</p>
                  </div>
                </div>

                <div className="">
                  <div className="">Upload Médio:</div>
                  <div className="">
                    <p className="">{data.averageUpload.toFixed(2)} Mbps</p>
                  </div>
                </div>

                <div className="">
                  <div className="">Ping Médio:</div>
                  <div className="">
                    <p className="">{data.averagePing}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  );
}

export default Home;
