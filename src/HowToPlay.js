function HowToPlay() {
  return (
      <div className='instructions'>
          <div style={{ position: 'absolute', left: '3%' }}>
              <h3>Player 1</h3>
              <p>W: Up</p>
              <p>S: Down</p>
          </div>
          <div style={{ position: 'absolute', right: '3%' }}>
              <h3>Player 2</h3>
              <p>&#x2191; : Up</p>
              <p>&#x2193; : Down</p>
          </div>
      </div>
  );
}

export default HowToPlay;