import StatisticLine from "./StatisticLine"

const Statistics = ({good,neutral,bad}) => {


    const all = () => good+neutral+bad
    const average = () => (good + neutral+bad)/3
    const positive = () => good/all() * 100

    if (all() === 0){
        return <p>No feedback given</p>

    }

    return (
        <div>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        
        <p>all {all()} </p>
        <p>average {average()} </p>
        <p>positive {positive()} </p>
        
        </div>
        
        )
  }
  
  export default Statistics 