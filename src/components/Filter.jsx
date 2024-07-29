import Input from './InputBox'


const Filter = ({value, handler}) => {
    return (
     <Input 
           display='filter shown with' 
           value={value} 
           handleChange={handler} 
     />
    )
}

export default Filter