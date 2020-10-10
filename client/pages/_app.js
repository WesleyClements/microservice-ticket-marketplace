import { Header } from '../components';

import { buildClient } from '../api';

import 'bootstrap/dist/css/bootstrap.css';

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const axios = buildClient(ctx);

  const promises = [axios.get('/api/users/currentuser')];
  if (Component.getInitialProps) {
    promises.push(Component.getInitialProps(ctx));
  }
  const [res, pageProps] = await Promise.all(promises);

  const { currentUser } = res.data;

  return { currentUser, pageProps: pageProps || {} };
};

export default App;
