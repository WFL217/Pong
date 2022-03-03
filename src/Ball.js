function Ball(props) {
  return (
      <div className='ball' style={{ top: props.top + 'px', left: props.left + 'px' }} />
  );
}

export default Ball;