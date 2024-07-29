export const Persons = ({persons, handleDelete}) => {
    return (<ul>{persons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}</ul>)
}

const Person = ({person, handleDelete}) => {
    return (
      <div>
        <li>
          {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
        </li>
        
      </div>
    )
}
