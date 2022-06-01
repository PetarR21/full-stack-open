const Filter = (props) => {
  return (
    <div>
      <label htmlFor="filter">find countries</label>
      <input id="filter" onChange={props.onChange} value={props.value}></input>
    </div>
  );
};

export default Filter;
