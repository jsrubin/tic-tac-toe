import "./App.css";
import Welcome from "./views";
import AppContextProvider from "./providers/AppProviderContext";
import ApolloProvider, { client } from "./providers/Apollo";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AppContextProvider>
          <Welcome />
        </AppContextProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
