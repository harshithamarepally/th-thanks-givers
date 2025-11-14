import { useState, useEffect } from "react";

type DashboardPageProps = {
  currentUser: string;
  onGoToForm: () => void;
  onLogout: () => void;
};

export function DashboardPage({
  currentUser,
  onGoToForm,
  onLogout,
}: DashboardPageProps) {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    setMessageCount(3);
  }, [currentUser]);

  return (
    <div className="dashboard-page">
      <h2>ello {currentUser}!</h2>
      <p>
        you have written <strong>{messageCount}</strong> thanks thus far. keep
        it up!
      </p>

      <button onClick={onGoToForm} className="button-primary">
        write a few more! ☺️
      </button>

      <button onClick={onLogout} className="button-secondary">
        bye bye ✌️
      </button>
    </div>
  );
}
