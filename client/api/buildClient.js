import axios from 'axios';

export const buildClient = ({ req }) => {
  return axios.create(
    typeof window === 'undefined'
      ? {
          baseURL:
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
          headers: req.headers,
        }
      : {
          baseURL: '/',
        }
  );
};
