/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Container } from "react-bootstrap";
import Loader from "../Spinner";

function bpsToMBps(bps) {
  return bps / 1000000;
}

function UploadResults() {
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("24h");
  const [averageUpload, setaverageUpload] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.31.23:4000/allresults"
        );
        const data = response.data;
        let intervalData = [];
        let totalUpload = 0;

        switch (selectedInterval) {
          case "24h":
            intervalData = [["Hora", "Upload"]];
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
              const uploadValue =
                item.upload * 8 !== null
                  ? Number(bpsToMBps(item.upload * 8).toFixed(2))
                  : 0;
              intervalData.push([formattedHour, uploadValue]);
              totalUpload += uploadValue;
            });
            break;
          case "5d":
          case "7d":
          case "10d":
          case "30d":
            intervalData = [["Dia", "Upload"]];
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
                item.upload * 8 !== null ? bpsToMBps(item.upload * 8) : 0;
              daysData[itemDate].count++;
            });
            Object.entries(daysData).forEach(([date, { sum, count }]) => {
              intervalData.push([date, sum / count]);
              totalUpload += sum / count;
            });
            break;
          default:
            break;
        }

        const avgDown = totalUpload / intervalData.length;
        setaverageUpload(avgDown);
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
            Upload
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
          Média dos valores de upload no intervalo selecionado:{" "}
          {averageUpload !== null ? averageUpload.toFixed(2) : "-"} Mbps
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
                title: `Upload nos Últimos ${
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

export default UploadResults;
