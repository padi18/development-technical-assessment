import { useEffect, useState } from "react";
import "./App.css";
import Filters from "./components/Filters";
import UserList from "./components/UserList";

function App() {
  const [minBalance, setMinBalance] = useState(0);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("balance");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user balances
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = minBalance
          ? `http://localhost:8001/users/transactions?minBalance=${minBalance}`
          : "http://localhost:8001/users/transactions";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [minBalance]);

  return (
    <>
      <section id="center">
        {error && <div className="alert">{error}</div>}
        {loading && <div className="spinner"></div>}

        <Filters
          minBalance={minBalance}
          setMinBalance={setMinBalance}
          name={name}
          setName={setName}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <UserList
          users={users.filter((user) =>
            name ? user.name?.toLowerCase().includes(name.toLowerCase()) : true,
          )}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onUserClick={(user) => console.log("Click to check callback: ", user)}
        />
      </section>
    </>
  );
}

export default App;
