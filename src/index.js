import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PADDLE_SPEED = 17;

function Ball(props) {
    return (
        <div className='ball'>
            <ol>Ball</ol>
        </div>
    );
}

class Paddle extends React.Component {
    render() {
        return (
            <div className='paddle' id={'paddle' + this.props.value} style={{ position: this.props.position, zIndex: this.props.zIndex, top: this.props.top + 'px', left: this.props.left }}>
                <ol>Paddle {this.props.value}</ol>
            </div>
        );
    }
}


function Board(props) {
    return (
        <div>
            <Paddle value={0} position={'absolute'} zIndex={'10'} left={'4px'} top={props.leftPaddleTop}/>
            <Paddle value={1} position={'absolute'} zIndex={'10'} left={'786px'} top={props.rightPaddleTop}/>
            <div style={{ position: 'absolute', zIndex: '20', top: '247px', left: '50px' }}>
                <Ball />
            </div>
        </div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftPaddleTop: 225,
            rightPaddleTop: 225,
        }

        // Array to handle key inputs.
        this.keysPressed = [];

        // Ref to keep focus on the board.
        this.focusRef = React.createRef();

        // Setup event handler for keyboard input when pressing a key.
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);

        // Setup event handler for keyboard input when releasing a key.
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.handleKeyUp); 

        // Bind this to resolvePressedKeys so it knows what this is.
        this.resolvePressedKeys = this.resolvePressedKeys.bind(this);

        // Call the gameLoop every ### milliseconds (## fps) to handle pressed keys.
        setInterval(() => { this.gameLoop(); }, 33.3);
    }

    // Set focus at first render.
    componentDidMount() {
        this.focusRef.current.focus();
    }

    gameLoop() {
        this.resolvePressedKeys();
    }

    // Handle user input when key is pressed.
    handleKeyDown(e) {
        this.keysPressed[e.keyCode] = true;
    }

    // Handle user input when key is released.
    handleKeyUp(e) {
        delete this.keysPressed[e.keyCode];
    }

    resolvePressedKeys() {
        let currentLeftPosition = this.state.leftPaddleTop;
        let currentRightPosition = this.state.rightPaddleTop;

        // W key.
        if (this.keysPressed[87]) {
            this.setState({
                leftPaddleTop: currentLeftPosition - PADDLE_SPEED,
            });
        }

        // S key.
        if (this.keysPressed[83]) {
            this.setState({
                leftPaddleTop: currentLeftPosition + PADDLE_SPEED,
            });
        }

        // Up arrow.
        if (this.keysPressed[38]) {
            this.setState({
                rightPaddleTop: currentRightPosition - PADDLE_SPEED,
            });
        }

        // Down arrow.
        if (this.keysPressed[40]) {
            this.setState({
                rightPaddleTop: currentRightPosition + PADDLE_SPEED,
            });
        }
    }

    render() {
        return (
            <div>
                <div className='gameboard' style={{ position: 'absolute' }} tabIndex="0" ref={this.focusRef}>
                    <Board leftPaddleTop={this.state.leftPaddleTop} rightPaddleTop={this.state.rightPaddleTop}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
