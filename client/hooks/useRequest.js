import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (body) => {
    try {
      setErrors(null);
      return await axios[method](url, body);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };
  return [doRequest, errors];
};

export default useRequest;
