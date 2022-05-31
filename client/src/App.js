import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Import pages
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ViewProduct from "./pages/ViewProduct";
import Features from "./pages/Features";
import Success from "./pages/Success";

// Import components
import Nav from "./components/Nav";

// import global state
import { StoreProvider } from "./utils/GlobalState";

// import stylesheet
import "./index.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Initialize JWT link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// set up Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/features" element={<Features />} />
              <Route path="new-product" element={<NewProduct />} />
              <Route path="profile" element={<Profile />} />
              <Route path="view/:id" element={<ViewProduct />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
