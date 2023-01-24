const Status = ({status}) => {


    if (status === null){
        return null
    }
    
    if (status.error){
        return (
            <div className = 'error'> 
                {status.message}
            </div>
        )
    }
    
    
    if (!status.error){       
        return (
            <div className = 'status'> 
                {status.message}
            </div>
        )
    }

}



export default Status