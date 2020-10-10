import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props) => {
    let request = { method, url };
    if (props) request = { ...props, ...request };
    try {
      setErrors(null);
      return await axios(request);
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (!errors) throw err;
      setErrors(errors);
    }
  };
  return [doRequest, errors];
};

export default useRequest;
