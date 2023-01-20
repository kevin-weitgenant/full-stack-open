const Filter = ({filterString,filterHandler}) => 
{
    return( <div>filter shown with: <input value = {filterString} onChange = {filterHandler}  /> </div>)
}






export default Filter 