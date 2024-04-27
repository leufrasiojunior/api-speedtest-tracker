import { useState, useEffect } from "react";
import axios from "axios";
// import Modal from "../Modal";

const App = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/list?pageSize=${pageSize}&page=${currentPage}`
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalRecords(response.data.totalRecords);
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
    try {
      const response = await axios.get(`http://localhost:3000/specified/${id}`);
      setSelectedRecord(response.data.data);
      console.log(response.data.data.download);
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
  const endIndex = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div>
      <h1>Data from API</h1>
      <label htmlFor="pageSize">Select Page Size:</label>
      <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Ping</th>
            <th>Download</th>
            <th>Upload</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(item.id)}
              >
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
        <tfoot>
          <tr>
            <td colSpan="5">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {renderPagination()}
              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              Showing {startIndex} to {endIndex} of {totalRecords} results
            </td>
          </tr>
        </tfoot>
      </table>
      {selectedRecord && (
        <div>
          <h2>Selected Record Details</h2>
          <p>Ping Jitter: {selectedRecord}</p>
        </div>
      )}
    </div>
  );
};

export default App;
