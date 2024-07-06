import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Auth/Login";
import React, { useContext, useEffect } from "react";
import { UserContex } from "./context/UserContext";
import Header from "./Components/Header/Header";
import ExpenseDetailScreen from "./Components/ExpenseDetail/ExpenseDetail";
import Loader from "./Components/Loader/Loader";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastManager } from "./Toast/ToastManager";
import GeminiAi from "./Components/GeminiAi";

function App() {
  const { user, isLoading } = useContext(UserContex);

  useEffect(() => {
    console.log("hey", user);
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          minHeight: "100vh",
          gridTemplateRows: "auto 1fr auto",
          gap: "var(--space-lg)",
          padding: "0px",
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path={user ? "/" : "/auth"}
              element={user ? <Layout /> : <Login />}
              index
            />

            <Route path="/:path?" element={<Layout />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/gemini" element={<GeminiAi />} />

            <Route
              path="/budget/:budgetName?"
              element={<ExpenseDetailScreen />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <img
        src="https://codinginpublic.dev/projects/react-router-budget-app/assets/wave-47c58563.svg"
        style={{
          width: "100vw",
          display: "block",
          position: "absolute",
        }}
      />
      <ToastManager />
    </>
  );
}

export default App;
