function Timer(props) {
  return (
      <div className='timer'>
          <h1>{props.timeRemaining}</h1>
      </div>
  );
}

export default Timer;