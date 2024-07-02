import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Auth/Login";
import React, { useContext, useEffect } from "react";
import { UserContex } from "./context/UserContext";
import Header from "./Components/Header/Header";
import ExpenseDetailScreen from "./Components/ExpenseDetail/ExpenseDetail";

function App() {
  const { user, isLoading } = useContext(UserContex);

  useEffect(() => {
    console.log("hey", user);
  }, [user]);

  if (isLoading) {
    console.log("render>>");
    return (
      <div>
        <text>Loader</text>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          minHeight: "100vh",
          gridTemplateRows: "auto 1fr auto",
          gap: "var(--space-lg)",
          paddingInline: "18px",
        }}
      >
        {user && <Header />}
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route
              path={user ? "/" : "/auth"}
              element={user ? <Layout /> : <Login />}
              index
            />
            <Route path="/" element={<Layout />} />
            <Route path="/:path" element={<Layout />} />
            <Route path="/auth" element={<Login />} />
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
        }}
      />
    </>
  );
}

export default App;
