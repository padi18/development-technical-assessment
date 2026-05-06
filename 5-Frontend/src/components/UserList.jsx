import { useMemo } from "react";
import UserItem from "./UserItem";
import "../styles/UserList.css";

export default function UserList({ users, sortBy, sortOrder, onUserClick }) {
  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.balance - b.balance;
    });

    if (sortOrder === "desc") {
      sorted.reverse();
    }

    return sorted;
  }, [users, sortBy, sortOrder]);

  return (
    <div className="list">
      {sortedUsers.map((user) => (
        <UserItem key={user._id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
}
