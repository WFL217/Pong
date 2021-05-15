import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BALL_SPEED = 1;
const PADDLE_SPEED = 17;

function Ball(props) {
    return (
        <div className='ball' style={{ position: props.position, zIndex: props.zIndex, top: props.top + 'px', left: props.left + 'px' }}>
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
            <Paddle value={0} position={'absolute'} zIndex={'10'} left={'4px'} top={props.leftPaddleTop} />
            <Paddle value={1} position={'absolute'} zIndex={'10'} left={'786px'} top={props.rightPaddleTop} />
            <Ball position={'absolute'} zIndex={'20'} left={props.ballLeft} top={props.ballTop} />
        </div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ballTop: 245,
            ballLeft: 395,
            leftPaddleTop: 225,
            rightPaddleTop: 225,
        }

        // Ref to set focus on the Game.
        this.focusRef = React.createRef();

        // Array to handle key inputs.
        this.keysPressed = [];

        // Setup event handler for keyboard input when pressing a key.
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);

        // Setup event handler for keyboard input when releasing a key.
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.handleKeyUp); 

        // Call the gameLoop every 33.3 milliseconds (30 fps).
        setInterval(() => { this.gameLoop(); }, 33.3);
    }

    // Set focus at first render.
    componentDidMount() {
        this.focusRef.current.focus();
    }

    // The loop of the game that will handle user input and updating the ball's position and movement.
    gameLoop() {
        this.updateBallPosition();
        this.resolvePressedKeys();
    }

    updateBallPosition() {
        this.setState({
            ballLeft: this.state.ballLeft + BALL_SPEED,
        });
    }

    // Set index of keyCode in keysPressed to true when a key is pressed.
    handleKeyDown(e) {
        this.keysPressed[e.keyCode] = true;
    }

    // Set index of keyCode in keysPressed to empty when a key is released.
    handleKeyUp(e) {
        delete this.keysPressed[e.keyCode];
    }

    // Update the position of a paddle depending on which key was pressed.
    resolvePressedKeys() {
        // Left paddle movement.
        // W key.
        if (this.keysPressed[87]) {
            this.setState({
                leftPaddleTop: this.state.leftPaddleTop - PADDLE_SPEED,
            });
        }

        // S key.
        if (this.keysPressed[83]) {
            this.setState({
                leftPaddleTop: this.state.leftPaddleTop + PADDLE_SPEED,
            });
        }

        // Right paddle movement.
        // Up arrow.
        if (this.keysPressed[38]) {
            this.setState({
                rightPaddleTop: this.state.rightPaddleTop - PADDLE_SPEED,
            });
        }

        // Down arrow.
        if (this.keysPressed[40]) {
            this.setState({
                rightPaddleTop: this.state.rightPaddleTop + PADDLE_SPEED,
            });
        }
    }

    render() {
        return (
            <div>
                <div className='gameboard' style={{ position: 'absolute' }} tabIndex="0" ref={this.focusRef}>
                    <Board leftPaddleTop={this.state.leftPaddleTop} rightPaddleTop={this.state.rightPaddleTop} ballLeft={this.state.ballLeft} ballTop={this.state.ballTop}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
