import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setfilterName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterName = (event) => {
    setfilterName(event.target.value);
  };

  const personsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  const getPersons = () => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setErrorMessage(
          `${error.message}. Failed to retrieve the contact list. Please try again later.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with new one?`
        )
      ) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            getPersons();
            setMessage(
              `The phone number of '${returnedPerson.name}' was successfully updated.`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Failed to update the phone number of '${newName}'. ${error.message}.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(
            `'${newPerson.name}' was successfully added to the phonebook.`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Failed to add '${newName}' to the phonebook. ${error.message}.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          getPersons();
          setMessage(`'${name}' was successfully deleted.`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Failed to delete '${name}'. ${error.message}.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  useEffect(getPersons, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Notification style="success" message={message} />
      <Notification style="error" message={errorMessage} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
