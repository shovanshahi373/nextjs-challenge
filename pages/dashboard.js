import Router from "next/router";

const Dashboard = () => {
  const { name } = Router.query;
  return (
    <div>
      <h1>dashboard page</h1>
      <p>Hello, {name}!</p>
    </div>
  );
};
export default Dashboard;
