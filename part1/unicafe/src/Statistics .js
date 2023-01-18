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
                <StatisticLine text="good" value ={good} />
                <StatisticLine text="neutral" value ={neutral} />
                <StatisticLine text="bad" value ={bad} />
                
                <tr>
                    <td>all</td>
                    <td>{all()}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average()}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{positive()}</td>
                </tr>
            </tbody>
        </table>
        )
  }
  
  export default Statistics 