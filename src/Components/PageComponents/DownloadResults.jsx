import { useState, useEffect, useCallback, useMemo } from "react";
import { Chart } from "react-google-charts";
import api from "../AxiosConnect/AxiosConnect";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import Loader from "../Spinner";

const Grafico = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());
  const [fusoHorario, setFusoHorario] = useState("UTC");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [numResultados, setNumResultados] = useState(10);

  const buscarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dataAtual = moment();
      const diferencaUTCMinutos = dataAtual.utcOffset();

      const dataInicioUTC = moment(dataInicio)
        .startOf("day")
        .subtract(diferencaUTCMinutos, "minutes");

      const dataFimUTC = moment(dataFim).subtract(
        diferencaUTCMinutos,
        "minutes"
      );

      const dataInicioFormatada = dataInicioUTC.format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const dataFimFormatada = dataFimUTC.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const dataAtualFormatada = dataAtual
        .subtract(diferencaUTCMinutos, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const resposta = await api.get("/dados", {
        params: {
          inicio: dataInicioFormatada,
          fim: dataFimFormatada,
          horaAtual: dataAtualFormatada,
        },
      });

      setDados(resposta.data);
    } catch (erro) {
      setErro("Erro ao buscar dados. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  }, [dataInicio, dataFim]);

  useEffect(() => {
    buscarDados();
  }, [buscarDados]);

  const handleStartDateChange = (date) => {
    setDataInicio(date);
  };

  const handleEndDateChange = (date) => {
    setDataFim(date);
  };

  const handleTimezoneChange = (selectedOption) => {
    setFusoHorario(selectedOption.value);
  };

  const handleBuscarClick = () => {
    buscarDados();
  };

  const handleMostrarMais = () => {
    console.log(numResultados);
    if (numResultados >= dados.length) {
      setNumResultados(numResultados);
    } else {
      setNumResultados((prev) => prev + 10);
    }
  };

  const opcoesFusoHorario = useMemo(
    () => moment.tz.names().map((tz) => ({ value: tz, label: tz })),
    []
  );

  const dadosLimitados = dados.slice(0, numResultados);

  return (
    <Container>
      <Container
        className="d-flex flex-row align-content-between flex-wrap align-items-center justify-content-between p-4 rounded-3"
        style={{ textAlignLast: "center" }}
      >
        <Container
          style={{ width: "13vw", margin: "0px" }}
          className="d-flex flex-column flex-wrap align-content-center justify-content-center align-items-center"
        >
          <label htmlFor="startDate">Data de Início:</label>
          <DatePicker
            selected={dataInicio}
            onChange={handleStartDateChange}
            id="startDate"
            className="form-control"
          />
          <label htmlFor="endDate">Data de Fim:</label>
          <DatePicker
            selected={dataFim}
            onChange={handleEndDateChange}
            id="endDate"
            className="form-control"
          />
        </Container>
        <Container className="w-25">
          <label htmlFor="timezone">Fuso Horário:</label>
          <Select
            options={opcoesFusoHorario}
            onChange={handleTimezoneChange}
            defaultValue={{ value: fusoHorario, label: fusoHorario }}
            aria-label="Selecionar Fuso Horário"
          />
        </Container>
        <Container className="w-25">
          <button
            onClick={handleMostrarMais}
            className="btn btn-light"
            disabled={dadosLimitados.length < dados.length ? false : true}
          >
            {dadosLimitados.length < dados.length
              ? "Carregar Mais"
              : "Máx. Atingido"}
          </button>
          <span>
            <br />
            Mostrando {numResultados} de {dados.length} (
            {numResultados / dados.length < 1
              ? ((numResultados / dados.length) * 100).toFixed(2) + "%"
              : "100%"}
            )
          </span>
        </Container>
        <Container className="w-25">
          <button className="btn btn-light" onClick={handleBuscarClick}>
            Buscar
          </button>
        </Container>
      </Container>
      {carregando ? (
        <Container>
          <Loader />
        </Container>
      ) : erro ? (
        <Container className="text-center text-danger">{erro}</Container>
      ) : dadosLimitados.length > 0 ? (
        <>
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="LineChart"
            loader={
              <Container>
                <Loader />
              </Container>
            }
            data={[
              ["Hora", "Download (Mbps)"],
              ...dadosLimitados.map((entry) => {
                const date = moment
                  .tz(entry.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ", "UTC")
                  .tz(fusoHorario);
                const hora = date.format("DD/MM HH:mm");
                const downloadMbps = ((entry.download * 8) / 1000000).toFixed(
                  2
                );
                return [hora, parseFloat(downloadMbps)];
              }),
            ]}
            options={{
              title: "Download (Mbps)",
              curveType: "function",
              legend: { position: "bottom" },
              tooltip: { isHtml: true },
            }}
          />
        </>
      ) : (
        <Container>Nenhum dado disponível</Container>
      )}
    </Container>
  );
};

export default Grafico;
