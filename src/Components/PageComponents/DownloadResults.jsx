/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Container } from "react-bootstrap";
import Loader from "../Spinner";
import api from "../AxiosConnect/AxiosConnect";

function bpsToMBps(bps) {
  return bps / 1000000;
}

function DownloadResults() {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("24h");
  const [averageDownload, setaverageDownload] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/allresults");
        const data = response.data;
        let intervalData = [];
        let totalDownload = 0;

        switch (selectedInterval) {
          case "24h":
            intervalData = [["Hora", "Download"]];
            const today = new Date();
            const twentyFourHoursAgo = new Date(
              today.getTime() - 24 * 60 * 60 * 1000
            );
            const filteredData = data.filter(
              (item) => new Date(item.created_at) >= twentyFourHoursAgo
            );
            filteredData.forEach((item) => {
              const itemDate = new Date(item.created_at);
              const formattedHour = `${itemDate.getHours()}:${
                itemDate.getMinutes() < 10 ? "0" : ""
              }${itemDate.getMinutes()}`;
              const downloadValue =
                item.download * 8 !== null
                  ? Number(bpsToMBps(item.download * 8).toFixed(2))
                  : 0;
              intervalData.push([formattedHour, downloadValue]);
              totalDownload += downloadValue;
            });
            break;
          case "5d":
          case "7d":
          case "10d":
          case "30d":
            intervalData = [["Dia", "Download"]];
            const numDays = parseInt(selectedInterval.slice(0, -1));
            const todayDate = new Date();
            const startDate = new Date(todayDate);
            startDate.setDate(todayDate.getDate() - numDays + 1);
            const filteredDaysData = data.filter((item) => {
              const itemDate = new Date(item.created_at);
              return itemDate >= startDate && itemDate <= todayDate;
            });
            const daysData = {};
            filteredDaysData.forEach((item) => {
              const itemDate = new Date(item.created_at).toLocaleDateString(
                "pt-BR",
                { day: "2-digit", month: "2-digit" }
              );
              if (!daysData[itemDate]) {
                daysData[itemDate] = { sum: 0, count: 0 };
              }
              daysData[itemDate].sum +=
                item.download * 8 !== null ? bpsToMBps(item.download * 8) : 0;
              daysData[itemDate].count++;
            });
            Object.entries(daysData).forEach(([date, { sum, count }]) => {
              intervalData.push([date, sum / count]);
              totalDownload += sum / count;
            });
            break;
          default:
            break;
        }

        const avgDown = totalDownload / intervalData.length;
        setaverageDownload(avgDown);
        setChartData(intervalData);
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };

    fetchData();
  }, [selectedInterval]);

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };
  return (
    <Container style={{ marginTop: "20px" }} className="justify-content-center">
      <div className="d-flex flex-column" style={{ marginBottom: "30px" }}>
        <h2>
          <p className="p-1 bd-highlight">
            Download
            <small className="smallsize">Mbps</small>
          </p>
        </h2>
        <div className="d-flex flex-column bd-highlight mb-3 justify-content-center">
          <label htmlFor="interval" className="text-center">
            Selecione o Intervalo de Tempo:{" "}
          </label>
          <select
            id="interval"
            value={selectedInterval}
            onChange={handleIntervalChange}
            className="form-select text-center"
            aria-label="intervalSelect"
          >
            <option value="24h">Últimas 24 horas</option>
            <option value="5d">Últimos 5 dias</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="10d">Últimos 10 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>
        </div>
        <p>
          Média dos valores de downloads no intervalo selecionado:{" "}
          {averageDownload !== null ? averageDownload.toFixed(2) : "-"} Mbps
        </p>
        {chartData != 0 ? (
          <div className="chart-wrapper" style={{ border: "1px solid #000" }}>
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="LineChart"
              loader={<Loader />}
              data={chartData}
              options={{
                title: `Download nos Últimos ${
                  selectedInterval === "24h"
                    ? "24 Horas"
                    : selectedInterval === "5d"
                    ? "5 Dias"
                    : selectedInterval === "7d"
                    ? "7 Dias"
                    : selectedInterval === "10d"
                    ? "10 Dias"
                    : "30 Dias"
                }`,
                curveType: "function",
                backgroundColor: {
                  fill: "#f1f0f0",
                },
                legend: { position: "none" },
              }}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div
        style={{
          borderBottom: "1px solid #b8b8b8",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        className="mt-5"
      ></div>
    </Container>
  );
}

export default DownloadResults;
