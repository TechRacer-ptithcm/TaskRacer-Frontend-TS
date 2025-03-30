import Calendar from "./pages/cleandar";
import Layout from "./layout";
import Pomodoro from "./pages/Pomodoro";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
      {/* <Layout>
        <Pomodoro />
      </Layout> */}
      {/* <Layout>
        <Calendar />
      </Layout> */}
    </>
  );
}

export default App;
