const InputBox = ({display, value, handleChange}) => {
    return (
      <div>
          {display} <input value={value} onChange={handleChange}/>
      </div>
    )
}

export default InputBox