import { useCallback } from "react";
import "../styles/UserItem.css";

export default function UserItem({ user, onClick }) {
  const handleClick = useCallback(() => {
    onClick(user);
  }, [user, onClick]);

  return (
    <div className="user-item" onClick={handleClick}>
      <span className="user-item__name">{user.name}</span>
      <hr className="user-item__separator" />
      <span className="user-item__balance">Balance: {user.balance}</span>
    </div>
  );
}
