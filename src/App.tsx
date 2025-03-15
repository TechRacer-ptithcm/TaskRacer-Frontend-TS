import Calendar from "./pages/cleandar";
import Layout from "./layout";
import Pomodoro from "./pages/Pomodoro";

function App() {
  return (
    <>
      <Layout>
        <Pomodoro />
      </Layout>
      {/* <Layout>
        <Calendar />
      </Layout> */}
    </>
  );
}

export default App;
