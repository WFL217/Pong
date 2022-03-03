import Ball from './Ball';
import Paddle from './Paddle';

function Board(props) {
  return (
      <div className='gameboard' tabIndex="0">
          <Paddle left={'1%'} top={props.leftPaddleTop} />
          <Paddle right={'1%'} top={props.rightPaddleTop} />
          <Ball left={props.ballLeft} top={props.ballTop} />
      </div>
  );
}

export default Board;