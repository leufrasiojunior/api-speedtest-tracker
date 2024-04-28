import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import { Container, Row } from "react-bootstrap";

const App = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/list?pageSize=${pageSize}&page=${currentPage}`
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pageSize, currentPage]);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = async (id) => {
    setOpenModal(!openModal);
    try {
      const response = await axios.get(`http://localhost:3000/specified/${id}`);
      setSelectedRecord(response.data.data);
    } catch (error) {
      console.error("Error fetching record details:", error);
    }
  };

  const renderPagination = () => {
    const pages = [];

    // Primeiras 3 páginas
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          className="btn btn-primary marginRight"
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    // Páginas restantes
    const currentPageIndex = Math.min(
      Math.max(currentPage - 2, 4),
      totalPages - 2
    );
    const lastPageIndex = Math.min(currentPageIndex + 2, totalPages);
    for (let i = currentPageIndex; i <= lastPageIndex; i++) {
      pages.push(
        <button
          className="btn btn-primary marginRight"
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize);

  return (
    <Container className="py-5">
      <Container className="col-lg-10 mx-auto">
        <Container className="card-body p-5 bg-white rounded">
          <h1>All Results</h1>
          <Container className="table-responsive">
            <Row>
              <div className="col-sm-12 col-md-6 row mb-2">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "space-between",
                  }}
                >
                  <label className="d-flex align-items-center">
                    Show
                    <select
                      className="custom-select custom-select-sm form-control form-control-sm"
                      id="pageSize"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      style={{
                        display: "flex",
                        marginLeft: "7px",
                        marginRight: "7px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        width: "49px !important",
                      }}
                    >
                      <option value="5">5</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    Entries
                  </label>
                </div>
              </div>
            </Row>
            <Row className="col-sm-12">
              <table
                // className="table table-striped table-bordered table-hover m-1"
                className="table table-striped table-bordered dataTable no-footer table-hover text-center"
                style={{ width: "100%" }}
              >
                <thead className="thead-light">
                  <tr role="row">
                    <th>Id</th>
                    <th>Ping</th>
                    <th>Download</th>
                    <th>Upload</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Scheduled</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{item.id}</td>
                        <td>{item.ping}</td>
                        <td>{item.download}</td>
                        <td>{item.upload}</td>
                        <td>{item.status}</td>
                        <td>{item.created_at}</td>
                        <td>
                          {item.scheduled === 1 ? (
                            <div
                              style={{
                                backgroundColor: "green",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Row>
            <Row className="align-items-center">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info col">
                  Showing {startIndex} to {endIndex} of {totalPages} results
                </div>
              </div>
              <div className="col-sm-12 col-md-7 dataTables_paginate ">
                {/* <div className="dataTables_info col "> */}
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary active marginRight"
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {renderPagination()}
                  <button
                    className="btn btn-primary active marginLeft"
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* </div> */}
            </Row>
            <Modal
              isOpen={openModal}
              requestData={selectedRecord}
              onClose={() => setOpenModal(!openModal)}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default App;
