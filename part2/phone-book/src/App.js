import { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName.trim() === '' || newNumber.trim() === '') {
      return;
    }

    let names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    let numbers = persons.map((person) => person.number);
    if (numbers.includes(newNumber)) {
      alert(`number ${newNumber} is already added to phonebook`);
      return;
    }

    let newPersonObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPersonObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons =
    filter.trim() === ''
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) ||
            person.number.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
