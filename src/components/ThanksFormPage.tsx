import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { userList } from "../userNames";

type ThanksFormPageProps = {
  currentUser: string;
  onFormSubmit: () => void;
};

export function ThanksFormPage({
  currentUser,
  onFormSubmit,
}: ThanksFormPageProps) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const from = isAnonymous ? "Anonymous" : currentUser;

      const docRef = await addDoc(collection(db, "messages"), {
        to: recipient,
        message: message,
        from: from,
        createdAt: serverTimestamp(),
      });

      console.log("Message sent with ID: ", docRef.id);
      onFormSubmit();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Oops! Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="thanks-form-page">
      <form onSubmit={handleSubmit} className="thanks-form">
        <h2>write a note!</h2>

        <label htmlFor="recipient-select">to:</label>
        <select
          id="recipient-select"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        >
          <option value="">who do you wish to thanks?</option>
          {userList
            .filter((user) => user.nickname !== currentUser)
            .map((user) => (
              <option key={user.realName} value={user.realName}>
                {user.realName}
              </option>
            ))}
        </select>

        <label htmlFor="message-text">your message: </label>
        <textarea
          id="message-text"
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="anonymous-check">
          <input
            type="checkbox"
            id="anonymous-check"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous-check">hide identity? 🥷</label>
        </div>

        <button
          type="submit"
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "send message"}
        </button>

        <button
          type="button"
          onClick={onFormSubmit}
          className="button-secondary"
        >
          bye bye!
        </button>
      </form>
    </div>
  );
}
