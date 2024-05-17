import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../AxiosConnect/AxiosConnect";

const Grafico = () => {
  const [data, setData] = useState([]);
  const [periodo, setPeriodo] = useState("24h");
  const [parametros, setParametros] = useState({ horas: 24 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dados", { params: parametros });
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [parametros]);

  const handlePeriodoChange = (event) => {
    const novoPeriodo = event.target.value;
    setPeriodo(novoPeriodo);
    if (novoPeriodo === "24h") {
      setParametros({ horas: 24 });
    } else {
      const dias = parseInt(novoPeriodo);
      setParametros({ dias });
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const hora = data.getHours().toString().padStart(2, "0");
    const minuto = data.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes} ${hora}:${minuto}`;
  };

  const formatarParaMbps = (bps) => {
    return ((bps * 8) / 1000000).toFixed(2); // Convertendo de bps para Mbps e fixando em duas casas decimais
  };
  const dadosFormatados = [
    ["Hora", "Download (Mbps)"],
    ...data.map((entry) => {
      const date = formatarData(entry.created_at);
      const downloadMbps = formatarParaMbps(entry.download);
      return [date, parseFloat(downloadMbps)];
    }),
  ];
  console.log(dadosFormatados);
  return (
    <div>
      <h2>Gráfico de Dados</h2>
      <div>
        <label htmlFor="periodo">Selecione o período:</label>
        <select id="periodo" value={periodo} onChange={handlePeriodoChange}>
          <option value="24h">24 horas</option>
          <option value="5">5 dias</option>
          <option value="15">15 dias</option>
          <option value="30">30 dias</option>
        </select>
      </div>
      {data.length > 0 ? (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Carregando Gráfico</div>}
          data={dadosFormatados}
          options={{
            title: "Company Performance",
            curveType: "function",
            legend: { position: "top" },
            chartArea: {
              width: "90%",
              height: "70%",
            },
            colors: ["#5f5f5f"],
            fontSize: "12",
            tooltip: { isHtml: true },
          }}
        />
      ) : (
        <div>Carregando dados...</div>
      )}
    </div>
  );
};

export default Grafico;

-------------------------

import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../AxiosConnect/AxiosConnect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Grafico = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [parametros, setParametros] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dados", { params: parametros });
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [parametros]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleBuscarClick = () => {
    const startDateFormatted = startDate.toISOString().split("T")[0];
    console.log(startDateFormatted);
    const endDateFormatted = endDate.toISOString().split("T")[0];

    setParametros({ inicio: startDateFormatted, fim: endDateFormatted });
    console.log(parametros);
  };
  const todayDate = new Date();
  console.log(todayDate);

  return (
    <div>
      <h2>Gráfico de Dados</h2>
      <div>
        <label htmlFor="startDate">Data de Início:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          id="startDate"
        />
      </div>
      <div>
        <label htmlFor="endDate">Data de Fim:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          id="endDate"
        />
      </div>
      <button onClick={handleBuscarClick}>Buscar</button>
      {data.length > 0 ? (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Carregando Gráfico</div>}
          data={[
            ["Hora", "Download (Mbps)"],
            ...data.map((entry) => {
              const date = new Date(entry.created_at);
              const hora = `${date.getDate()}/${
                date.getMonth() + 1
              } ${date.getHours()}:${date.getMinutes()}`;
              const downloadMbps = (entry.download / 1000000).toFixed(2); // Convertendo para Mbps
              return [hora, parseFloat(downloadMbps)];
            }),
          ]}
          options={{
            title: "Download ao longo do tempo",
            curveType: "function",
            legend: { position: "bottom" },
          }}
        />
      ) : (
        <div>Carregando dados...</div>
      )}
    </div>
  );
};

export default Grafico;

---------

import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../AxiosConnect/AxiosConnect";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment-timezone";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-select/dist/react-select.css";

const Grafico = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [parametros, setParametros] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dados", { params: parametros });
        setData(response.data);
        console.log(startDate);
        console.log(timezone);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [parametros]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleTimezoneChange = (selectedOption) => {
    setTimezone(selectedOption.value);
  };

  const handleBuscarClick = () => {
    const startDateFormatted = moment(startDate)
      .tz(timezone)
      .format("YYYY-MM-DD");
    const endDateFormatted = moment(endDate).tz(timezone).format("YYYY-MM-DD");
    setParametros({ inicio: startDateFormatted, fim: endDateFormatted });
  };

  const options = moment.tz.names().map((tz) => ({ value: tz, label: tz }));

  return (
    <div>
      <h2>Gráfico de Dados</h2>
      <div>
        <label htmlFor="startDate">Data de Início:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          id="startDate"
        />
      </div>
      <div>
        <label htmlFor="endDate">Data de Fim:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          id="endDate"
        />
      </div>
      <div>
        <label htmlFor="timezone">Fuso Horário:</label>
        <Select
          options={options}
          value={timezone}
          onChange={handleTimezoneChange}
        />
      </div>
      <button onClick={handleBuscarClick}>Buscar</button>
      {data.length > 0 ? (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Carregando Gráfico</div>}
          data={[
            ["Hora", "Download (Mbps)"],
            ...data.map((entry) => {
              const date = moment
                .tz(entry.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ", "UTC")
                .tz(timezone);
              const hora = date.format("DD/MM HH:mm");
              const downloadMbps = (entry.download / 1000000).toFixed(2); // Convertendo para Mbps
              return [hora, parseFloat(downloadMbps)];
            }),
          ]}
          options={{
            title: "Download ao longo do tempo",
            curveType: "function",
            legend: { position: "bottom" },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      ) : (
        <div>Carregando dados...</div>
      )}
    </div>
  );
};

export default Grafico;
