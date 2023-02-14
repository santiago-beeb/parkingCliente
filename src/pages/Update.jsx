import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Update = () => {
  const hour = new Date(Date.now()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const carId = location.pathname.split("/")[2];
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState([]);

  const alert = () => {
    setTimeout(() => {
      const horaIngreso = cars[0].hora;
      const salida = hour;
      const minutos_inicio = horaIngreso
        .split(":")
        .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
      const minutos_final = salida
        .split(":")
        .reduce((p, c) => parseInt(p) * 60 + parseInt(c));

      const diferencia = minutos_final - minutos_inicio;
      const horas = Math.floor(diferencia / 60);

      const cobro = diferencia * 100;

      Swal.fire({
        title: `Cobro total de $${cobro} pesos`,
        html: `por un tiempo de ${diferencia} minutos`,
        icon: "success",
      });
    }, 1000);
  };

  useEffect(() => {
    const fectchCar = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/parking/" + carId
        );
        setCars(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fectchCar();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/parking/` + carId, car);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form>
        <div className="container-md">
          <h1>Salida vehiculo</h1>
          {cars.map((cars) => (
            <div className="mb-3" key={cars.id}>
              <label className="form-label">Placas del vehiculo</label>
              <input
                value={cars?.placa}
                type="text"
                name="placa"
                placeholder={cars?.placa}
                className="form-control"
                disabled
              />
              <label className="form-label">Fecha de ingreso</label>
              <input
                value={cars?.fecha}
                type="text"
                name="fecha"
                placeholder={cars?.fecha}
                className="form-control"
                disabled
              />
              <label hidden className="form-label">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                placeholder={cars?.estado}
                className="form-control"
                disabled
                hidden
              />
              <label className="form-label">Hora de ingreso</label>
              <input
                value={cars?.hora}
                type="text"
                name="hora"
                placeholder={cars?.hora}
                className="form-control"
                disabled
              />
              <label className="form-label">Hora de Salida</label>
              <input
                value={hour}
                type="text"
                name="hora"
                className="form-control"
                disabled
              />
            </div>
          ))}
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Salida
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={alert()}
            >
              Cobro
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export { Update };
