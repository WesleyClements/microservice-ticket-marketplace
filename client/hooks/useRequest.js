import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async ({ data, params }) => {
    try {
      setErrors(null);
      return await axios({ method, url, data, params });
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (!errors) throw err;
      setErrors(errors);
    }
  };
  return [doRequest, errors];
};

export default useRequest;
