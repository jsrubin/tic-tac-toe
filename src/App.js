import "./App.css";
import Welcome from "./views";
import AppContextProvider from "./providers/AppProviderContext";

function App() {
  return (
    <AppContextProvider>
      <Welcome />
    </AppContextProvider>
  );
}

export default App;
