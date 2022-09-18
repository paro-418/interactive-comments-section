import UI from "./UI/UI";
import { DataContextProvider } from "./context/data-context";
function App() {
  return (
    <DataContextProvider>
      <UI />
    </DataContextProvider>
  );
}

export default App;
