import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import AddNews from "./pages/AddNews";
import AllNews from "./pages/AllNews";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Information from "./pages/Information";

const isLoggedIn = () => {
  return localStorage.getItem("token");
};

// protected route
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

// layout wrapper (controls sidebar visibility)
function Layout({ children }) {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <>
      {!hideSidebar && isLoggedIn() && <Sidebar />}

      <div className={hideSidebar ? "" : "main-content"}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN (NO SIDEBAR) */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES (WITH SIDEBAR) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <AddNews />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-news"
          element={
            <ProtectedRoute>
              <Layout>
                <AllNews />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/information"
          element={
            <ProtectedRoute>
              <Layout>
                <Information />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;