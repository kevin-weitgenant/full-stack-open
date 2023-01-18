import StatisticLine from "./StatisticLine"

const Statistics = ({good,neutral,bad}) => {


    const all = () => good+neutral+bad
    const average = () => (good + neutral+bad)/3
    const positive = () => good/all() * 100

    if (all() === 0){
        return <p>No feedback given</p>

    }

    return (
        <table>
            <tbody>
                <tr><StatisticLine text="good" value ={good}/></tr>
                <tr><StatisticLine text="neutral" value ={neutral}/></tr>
                <tr><StatisticLine text="bad" value ={bad}/></tr>
                <tr>all {all()}</tr>
                <tr>average {average()}</tr>
                <tr>positive {positive()}</tr>
            </tbody>
        </table>
        
        )
  }
  
  export default Statistics 