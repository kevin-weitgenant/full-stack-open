const Content = ({parts}) => {
    console.log('content props = ', parts)


    let paragraphs = parts.map(  (x) => [<p key={x.id}> {x.name} {x.exercises} </p>]);

    return paragraphs
}

export default Content