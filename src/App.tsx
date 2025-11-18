import { useState } from "react";
import "./App.css";
import { WelcomePage } from "./components/WelcomePage";
import { DashboardPage } from "./components/DashboardPage";
import { ThanksFormPage } from "./components/ThanksFormPage";

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  type Page = "dashboard" | "form";
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("dashboard");
  };

  if (currentUser === null) {
    return <WelcomePage onLogin={setCurrentUser} />;
  }

  if (currentPage === "dashboard") {
    return (
      <DashboardPage
        currentUser={currentUser}
        onGoToForm={() => setCurrentPage("form")}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === "form") {
    return (
      <ThanksFormPage
        currentUser={currentUser}
        onFormSubmit={() => setCurrentPage("dashboard")}
      />
    );
  }

  return null;
}

export default App;
