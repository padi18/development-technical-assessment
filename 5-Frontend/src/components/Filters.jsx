import "../styles/Filters.css";

export default function Filters({ minBalance, setMinBalance, name, setName }) {
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
    </div>
  );
}
