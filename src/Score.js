function Score(props) {
  return (
      <div className='score'>
          <h2>{props.playerOneScore} : {props.playerTwoScore}</h2>
      </div>
  );
}

export default Score;