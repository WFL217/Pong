function Paddle(props) {
  return (
      <div className='paddle' style={{ top: props.top + 'px', left: props.left, right: props.right }} />
  );
}

export default Paddle;