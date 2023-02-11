import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function Add() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const today = new Date(Date.now()).toLocaleDateString();
  const hour = new Date(Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const [cars, setCars] = useState({
    placa: "",
    fecha: today,
    hora: hour,
    estado: "1",
  });

  const handleChange = (e) => {
    setCars((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAll = () => {
    handleClick();
    handleClose();
  };

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8080/api/parking", cars);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Añadir vehiculo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de vehiculos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Placas del vehiculo</Form.Label>
              <Form.Control
                name="placa"
                type="text"
                placeholder="XXX000"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAll}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
