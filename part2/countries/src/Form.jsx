const Form = ({filterInput,filterString}) =>{

    return (
        <form>
            <div>Find countries
                <input type="text" onChange={filterInput} value = {filterString} />
            </div>
        </form>
    )
}




export default Form