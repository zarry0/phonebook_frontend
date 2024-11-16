import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { Persons } from './components/Persons'
import communicationUtils from './services/communicationUtils'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    console.log("Inisde effect hook")

    communicationUtils.getAll()
      .then(fetchedPersons => {
        console.log(fetchedPersons)
        setPersons(fetchedPersons)
        setPersonsFiltered(fetchedPersons)
      })
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson === undefined) {
      console.log("About to add a new person");
      const personObj = { 
        name : newName,
        number : newPhone
      };

      communicationUtils.post(personObj)
        .then(addedNumber => {
          console.log(addedNumber)
          const newPersons = persons.concat(addedNumber);
          setPersons(newPersons)
          const filteredNewPerson = newName.toLowerCase().includes(filter.toLowerCase()) ? newPersons : personsFiltered
          setPersonsFiltered(filteredNewPerson)
          setMessage(`Added ${newName}`)
          setIsErrorMessage(false)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
      })
      .catch(error => {
        console.log(error.response)
        setMessage(error.response.data.error)
        setIsErrorMessage(true)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })

    }else {
      console.log("Repeated person");
      // const confirmation = false;
      // alert("That person is already added to the phonebook");
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmation){
        console.log("updating number")
        communicationUtils.uptate(foundPerson.id, {...foundPerson, number: newPhone})
        .then(updatedPerson => {
          console.log(updatedPerson)
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          setPersonsFiltered(personsFiltered.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          
          setMessage(`Updated ${newName}`)
          setIsErrorMessage(false)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error)
          setIsErrorMessage(true)
          setMessage(`Information ${newName} has already been deleted from server`)
          setTimeout(() => {
            setMessage(null)
            setIsErrorMessage(false)
          }, 3000)
        })
      }
    }
    setNewName('')
    setNewPhone('')
    
  }

  const handleFilter = (e) => {
    const newFilter = e.target.value
    if (newFilter !== "") {
      const newPersons = persons.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
      setPersonsFiltered(newPersons)
      console.log(newPersons)
    }else {
      setPersonsFiltered(persons)
    }
    setFilter(newFilter)
  }

  const handleDelete = ({name, id}) => {
    console.log("number id: " + id)
    const confirmation = window.confirm(`Delete ${name} ?`)
    if (!confirmation) {
      console.log("Aborted deletion")
      return 
    }
    console.log(confirmation)
    communicationUtils.remove(id)
      .then(deletedPerson => {
        console.log(deletedPerson)
        console.log(persons.filter(person => person.id !== id))
        
      })
      .catch((error) => {
        console.log(error)
        alert("This person was already removed from server")
      })
      setPersons(persons.filter(person => person.id !== id))
      setPersonsFiltered(personsFiltered.filter(person => person.id !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isErrorMsg={isErrorMessage}/>
      <Filter value={filter} handler={handleFilter}/>

      <h2>add a new</h2>
  
      <PersonForm 
        nameValue={newName}
        numberValue={newPhone}
        handlers={{
          nameHandler: handleNameChange,
          numberHandler: handlePhoneChange,
          btnHandler : handleAdd
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} handleDelete={handleDelete}/>
    </div>
  )
}







export default App