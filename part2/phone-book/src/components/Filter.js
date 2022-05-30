const Filter = ({ onChange, value }) => {
  return (
    <div>
      <label htmlFor='filter'>filter shown with</label>
      <input id='filter' onChange={onChange} value={value}></input>
    </div>
  );
};

export default Filter;
