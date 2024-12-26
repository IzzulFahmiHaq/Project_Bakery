import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/data/all"); // Ganti dengan endpoint yang sesuai
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/data/delete/${id}`); // Ganti dengan endpoint yang sesuai
      setDataList(dataList.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editdata/${id}`);
  };

  const handleAdd = () => {
    navigate("/tambahdata");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div style={{ width: "80%", textAlign: "center" }}>
        <h1 style={{ marginBottom: "20px", color: "#2E8B57" }}>Data Produk</h1>
        <button
          onClick={handleAdd}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            backgroundImage: "linear-gradient(45deg, #4CAF50, #2E8B57)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "transform 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} /> Tambah Produk
        </button>
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "100%",
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2E8B57", color: "white" }}>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data) => (
              <tr key={data.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>
                  <button
                    onClick={() => handleEdit(data.id)}
                    style={{
                      marginRight: "10px",
                      backgroundImage: "linear-gradient(45deg, #FFA500, #FF8C00)",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "transform 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    style={{
                      backgroundImage: "linear-gradient(45deg, #F44336, #D32F2F)",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "transform 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;