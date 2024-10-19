const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h1>Statistics</h1>
      {props.all !== 0 ? (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={props.good} />
              <StatisticLine text="neutral" value={props.neutral} />
              <StatisticLine text="bad" value={props.bad} />
              <StatisticLine text="all" value={props.all} />
              <StatisticLine text="average" value={props.average} />
              <StatisticLine
                text="positive"
                value={`${props.positive.toFixed(1)} %`}
              />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default Statistics;
