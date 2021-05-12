import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PADDLE_SPEED = 10;

function Ball(props) {
    return (
        <div className='ball'>
            <ol>Ball</ol>
        </div>
    );
}

class Paddle extends React.Component {
    constructor(props) {
        super(props);

        console.log("Paddle top value:", this.props.top);
    }

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

        // Call the gameLoop every ### milliseconds to handle pressed keys.
        setInterval(() => { this.gameLoop(); }, 1000);
    }

    // Set focus at first render.
    componentDidMount() {
        this.focusRef.current.focus();
    }

    gameLoop() {
        console.log(this.keysPressed);
    }

    // Handle user input when key is pressed.
    handleKeyDown(e) {
        this.keysPressed[e.keyCode] = true;


        /*let currentLeftPosition = this.state.leftPaddleTop;
        let currentRightPosition = this.state.rightPaddleTop;

        switch (e.keyCode) {
            // Up arrow.
            case 38:
                this.setState({
                    leftPaddleTop: currentLeftPosition - PADDLE_SPEED,
                });
                break;

            // Down arrow.
            case 40:
                this.setState({
                    leftPaddleTop: currentLeftPosition + PADDLE_SPEED,
                });
                break;

            // W key.
            case 87:
                this.setState({
                    rightPaddleTop: currentRightPosition - PADDLE_SPEED,
                });
                break;

            // S key.
            case 83:
                this.setState({
                    rightPaddleTop: currentRightPosition + PADDLE_SPEED,
                });
                break;
            default:
                break;
        }*/
    }

    // Handle user input when key is released.
    handleKeyUp(e) {
        delete this.keysPressed[e.keyCode];
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
