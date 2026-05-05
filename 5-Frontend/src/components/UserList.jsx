import { useMemo } from "react";
import UserItem from "./UserItem";
import "../styles/UserList.css";

export default function UserList({ users, onUserClick }) {
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => b.balance - a.balance);
  }, [users]);

  return (
    <div className="list">
      {sortedUsers.map((user) => (
        <UserItem key={user._id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
}
