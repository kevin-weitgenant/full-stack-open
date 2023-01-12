const Content = ({parts,exercises}) => {

    let zipped = parts.map((x, i) => [x, exercises[i]]);

    if(parts.length > 0){
        return zipped.map(function(each){
          return(<p>{each[0]} {each[1]} </p>)
        })
      } 
}

export default Content