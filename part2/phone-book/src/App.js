import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/person';
import person from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  //get persons list from server
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName.trim() === '' || newNumber.trim() === '') {
      return;
    }

    let names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      if (
        window.confirm(
          `${newName}is already added to phonebook, replace the new number with new one?`
        )
      ) {
        updateUserNumber(persons.find((person) => person.name === newName));
        return;
      }
    }

    let newPersonObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const updateUserNumber = (person) => {
    personService
      .update(person.id, { ...person, number: newNumber })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person
          )
        );
      });
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

  const deletePerson = (id) => {
    if (
      window.confirm(`Delete ${persons.find((person) => person.id === id)}?`)
    ) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
