import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';

function bpsToMbps(bps) {
  return bps / 1000000;
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/averages')
      .then(response => {
        const transformedData = {
          ...response.data,
          averageDownload: bpsToMbps(response.data.averageDownload * 8), // Convertendo para bits antes de converter para Mbps
          averageUpload: bpsToMbps(response.data.averageUpload * 8) // Convertendo para bits antes de converter para Mbps
        };
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
    <Header/>
        <div>
        <h1>Dados da API</h1>
        {data ? (
            <div>
            <p><strong>Download Médio:</strong> {data.averageDownload.toFixed(2)} Mbps</p>
            <p><strong>Upload Médio:</strong> {data.averageUpload.toFixed(2)} Mbps</p>
            <p><strong>Ping Médio:</strong> {data.averagePing}</p>
            </div>
        ) : (
            <p>Carregando...</p>
        )}
        </div>
    </>
  );
}

export default App;
