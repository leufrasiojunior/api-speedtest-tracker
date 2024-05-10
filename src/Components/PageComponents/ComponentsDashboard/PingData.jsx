/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../AxiosConnect/AxiosConnect";
import { Chart } from "react-google-charts";

function PingChart({ pingData }) {
  // Verifica se pingData está definido e não vazio antes de prosseguir
  if (!pingData || pingData.length === 0) {
    return <div>No data available</div>;
  }

  // Filtra e mapeia os dados de ping apenas se eles estiverem definidos
  const chartData = pingData
    .filter((item) => item && item.ping) // Filtra os itens e verifica se ping está definido
    .map((item) => [item.ping.jitter, item.ping.latency]); // Mapeia jitter e latência

  // Configurações do gráfico
  const options = {
    title: "Jitter vs. Latency",
    hAxis: { title: "Jitter" },
    vAxis: { title: "Latency" },
    legend: "none",
    series: {
      0: { type: "bars" }, // Barras para jitter
      1: { type: "line" }, // Linhas para latência
    },
  };

  return (
    <div>
      <h1>Ping Chart</h1>
      <Chart
        chartType="ComboChart"
        width={"100%"}
        height={"400px"}
        data={[["Jitter", "Latency"], ...chartData]}
        options={options}
      />
    </div>
  );
}

function PingChartPage() {
  const [pingData, setPingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/fulldata");
        setPingData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <PingChart pingData={pingData} />;
}

export default PingChartPage;
