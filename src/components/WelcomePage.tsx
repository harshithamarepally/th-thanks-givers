import { useState } from "react";

type WelcomePageProps = {
  onLogin: (name: string) => void;
};

export function WelcomePage({ onLogin }: WelcomePageProps) {
  const [selectedName, setSelectedName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedName) {
      onLogin(selectedName);
    }
  };

  return (
    <div className="welcome-page">
      <img
        src="/background.jpg"
        className="welcome-page-background"
        alt="Orange background with sparkles"
      ></img>
      <h1>HOWRRDY HACKERS</h1>
      <h2>it is time to show your thankfulness!</h2>

      <form onSubmit={handleSubmit} className="welcome-form">
        {/* <label htmlFor="name-select">who are you...?</label> */}
        <select
          id="name-select"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">umm who are you...? no identity theft pls</option>
          <option value="harsh">harsh</option>
          <option value="ikkinikibikibonki">ikkinikibikibonki</option>
          <option value="badam">badam</option>
          <option value="banniebumblebee">banniebumblebee</option>
        </select>

        <button type="submit" disabled={!selectedName}>
          yay let's write
        </button>
      </form>
    </div>
  );
}
