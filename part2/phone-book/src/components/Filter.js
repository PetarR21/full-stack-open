const Filter = ({ onChange, value }) => {
  return (
    <div>
      <label htmlFor="filter">filter show with</label>
      <input onChange={onChange} value={value}></input>
    </div>
  );
};

export default Filter;
