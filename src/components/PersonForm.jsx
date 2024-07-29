import Input from './InputBox'

const PersonForm = ({nameValue, numberValue, handlers:{nameHandler,numberHandler,btnHandler}}) => {
    return (
      <form>
        <Input display="name" value={nameValue} handleChange={nameHandler}/>
        <Input display="number" value={numberValue} handleChange={numberHandler}/>
         <div>
            <button type="submit" onClick={btnHandler}>add</button>
          </div>
      </form>
    )
}

  export default PersonForm