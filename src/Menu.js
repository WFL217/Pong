function Menu(props) {
  return (
      <div className='menu'>
          <div>
              <button disabled={props.buttonDisabled} onClick={props.onClick}>{props.buttonText}</button>
          </div>
          <div style={{ position: 'absolute', bottom: '10%', left: '0%', right: '0%', margin: '0 auto' }}>
              <a href='https://github.com/WFL217/Pong' target='_blank' rel='noreferrer'>View on GitHub!</a>
          </div>
      </div>
  );
}

export default Menu;