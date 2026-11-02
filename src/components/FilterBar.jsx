export const FilterBar = ({ filter, handleFilter }) => {
  return (
    <div className="filter-container">
      <select
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};
