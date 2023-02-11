import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const date = new Date();
  const today = new Date(Date.now()).toLocaleString().split(", ")[0];
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const [cars, setCars] = useState({
    placa: "",
    estado: "1",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCars((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/parking", cars);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form>
      <div className="container-md">
        <h1>Añandir vehiculo</h1>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Placas del vehiculo
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="placa"
            placeholder="XXX000"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            Las letras deberian ser escritas en mayuscula
          </div>
        </div>
        <input
          type="text"
          defaultValue={` ${h} : ${m} : ${s}`}
          hidden
          disabled
        />
        <input type="text" defaultValue={today} hidden disabled />
        <input type="text" defaultValue={1} hidden disabled name="estado" />
        <button type="submit" class="btn btn-primary" onClick={handleClick}>
          Añadir
        </button>
      </div>
    </form>
  );
};

export { Add };
