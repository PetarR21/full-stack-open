const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label>name:</label>
        <input onChange={props.handleNameChange} value={props.newName}></input>
      </div>
      <div>
        <label>number:</label>
        <input
          onChange={props.handleNumberChange}
          value={props.newNumber}
        ></input>
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
