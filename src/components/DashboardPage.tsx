import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessageCount = async () => {
      setIsLoading(true);
      try {
        const messagesCollection = collection(db, "messages");
        const q = query(messagesCollection, where("from", "==", currentUser));
        const snapshot = await getCountFromServer(q);
        setMessageCount(snapshot.data().count);
      } catch (error) {
        console.error("Error getting message count: ", error);
      }
      setIsLoading(false);
    };

    fetchMessageCount();
  }, [currentUser]);

  return (
    <div className="dashboard-page">
      <h2>ello {currentUser}!</h2>

      {isLoading ? (
        <p>counting messages...</p>
      ) : (
        <p>
          you've written <strong>{messageCount}</strong> thanks messages so far
        </p>
      )}

      <button
        onClick={onGoToForm}
        className="button-primary"
        disabled={isLoading}
      >
        i want to write more!
      </button>
      <button onClick={onLogout} className="button-secondary">
        nah goodbye
      </button>
    </div>
  );
}
