const Status = ({status}) => {

    if (status === null){
        return null
    }

    return (
        <div className = 'status'> 
            {status}
        </div>
    )




}



export default Status