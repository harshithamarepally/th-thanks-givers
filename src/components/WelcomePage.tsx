import { useState } from "react";
import { userList } from "../userNames";

type WelcomePageProps = {
  onLogin: (name: string) => void;
};

export function WelcomePage({ onLogin }: WelcomePageProps) {
  const [selectedNickname, setSelectedNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNickname) {
      onLogin(selectedNickname);
    }
  };

  return (
    <div className="welcome-page">
      <h1>HOWRRDY HACKERS</h1>
      <h2>it is time to show your thankfulness!</h2>

      <form onSubmit={handleSubmit} className="welcome-form">
        <select
          id="name-select"
          value={selectedNickname}
          onChange={(e) => setSelectedNickname(e.target.value)}
        >
          <option value="">umm who are you...? no identity theft pls</option>
          {userList.map((user) => (
            <option key={user.nickname} value={user.nickname}>
              {user.realName}
            </option>
          ))}
        </select>

        {selectedNickname && (
          <button
            type="submit"
            className="button-primary"
            disabled={!selectedNickname}
          >
            yay let's write
          </button>
        )}
      </form>
    </div>
  );
}
