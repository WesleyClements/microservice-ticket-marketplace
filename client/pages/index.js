import {buildClient} from "../api";

const Index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

Index.getInitialProps = async (context) => {
  const axios = buildClient(context);
  const res = await axios.get('/api/users/currentuser');
  const { currentUser } = res.data;
  return { currentUser };
};

export default Index;
