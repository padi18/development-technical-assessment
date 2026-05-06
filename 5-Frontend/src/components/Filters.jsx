import "../styles/Filters.css";

export default function Filters({
  minBalance,
  setMinBalance,
  name,
  setName,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="list">
      <input
        type="number"
        placeholder="Minimum balance"
        value={minBalance}
        onChange={(e) => setMinBalance(e.target.value)}
      />
      <input
        type="text"
        placeholder="User name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="balance">Balance</option>
        <option value="name">User Name</option>
      </select>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
