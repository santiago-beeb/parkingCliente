import React, { useEffect, useState } from "react";
import axios from "axios";
import Add from "../common/ModalAdd";
import { Link } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

const Parking = () => {
  const [show, setShow] = useState(false);
  const [cars, setCars] = useState([]);
  const [tabla, setTabla] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fectchAllCars = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/parking");
        setCars(res.data);
        setTabla(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fectchAllCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/api/parking/" + id);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tabla.filter((elemento) => {
      if (
        elemento.placa
          .toString() //convertir
          .toLowerCase() //minuscula
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCars(resultadosBusqueda);
  };

  return (
    <>
      <div className="container-md">
        <h1>Sistema para parqueadero</h1>
        <div className="containerInput">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por placa del vehiculo"
            onChange={handleChange}
          />
          <br />
        <Add show={show} setShow={setShow}></Add>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th>Salida</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((cars) => (
              <tr key={cars.id}>
                <td> {cars.placa} </td>
                <td> {cars.fecha} </td>
                <td> {cars.hora} </td>
                <td>
                  <Link to={`/update/${cars.id}`}>
                    <button type="button" className="btn btn-info">
                      Salida
                    </button>
                  </Link>
                </td>
                <td>
                  <CloseButton
                    type="button"
                    onClick={() => handleDelete(cars.id)}
                  ></CloseButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export { Parking };
