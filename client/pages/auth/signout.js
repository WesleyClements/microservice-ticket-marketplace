import { useEffect } from 'react';
import { useRequest } from '../../hooks';

import Router from 'next/router';

const SignOut = ({ currentUser }) => {
  const [postSignout] = useRequest({
    method: 'post',
    url: '/api/users/signout',
  });

  useEffect(() => {
    postSignout().then((result) => Router.push('/'));
  }, []);

  return <h1>Signing you out...</h1>;
};

export default SignOut;
