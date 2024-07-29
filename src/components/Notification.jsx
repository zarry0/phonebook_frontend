
const Notification = ({message, isErrorMsg}) => {
    if (message === null)
        return null;
    
    console.log(`Showing notification of type "${isErrorMsg ? 'error' : 'message'}", with message: "${message}"`)
    const baseStyle = {
        color: isErrorMsg ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    return (
        <div style={baseStyle}>
            {message}
        </div>
    );
}

export default Notification;