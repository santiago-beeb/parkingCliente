import axios from 'axios';
import endPoints from './index';

const addCar = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.parking.addCar, body, config);
  return response.data;
};

const deleteCar = async (id) => {
  const response = await axios.delete(endPoints.parking.deleteCar(id));
  return response.data;
};

const updateCar = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(endPoints.parking.updateCar(id), body, config);
  return response.data;
};

export { addCar, deleteCar, updateCar };