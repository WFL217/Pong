import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BALL_SPEED = 15;
const PADDLE_SPEED = 20;

function Ball(props) {
    return (
        <div className='ball' style={{ position: props.position, zIndex: props.zIndex, top: props.top + 'px', left: props.left + 'px' }}>
        </div>
    );
}

function Paddle(props) {
    return (
        <div className='paddle' id={'paddle' + props.value} style={{ position: props.position, zIndex: props.zIndex, top: props.top + 'px', left: props.left}}>
        </div>
    );
}

function Board(props) {
    return (
        <div className='gameboard' style={{ position: 'absolute' }} tabIndex="0">
            <Paddle position={'absolute'} zIndex={'10'} left={'2px'} top={props.leftPaddleTop} />
            <Paddle position={'absolute'} zIndex={'10'} left={'786px'} top={props.rightPaddleTop} />
            <Ball position={'absolute'} zIndex={'20'} left={props.ballLeft} top={props.ballTop} />
        </div>
    );
}

function Score(props){
    return (
        <div style={{ position: 'absolute', left: '407px', top: '500px' }}>
            <div style={{ position: 'absolute', right: '10px'}}>
                <h2>{props.playerOneScore}</h2>
            </div>
            <h2 style={{ position: 'absolute'}}>:</h2>
            <div style={{ position: 'absolute', left: '20px' }}>
                <h2>{props.playerTwoScore}</h2>
            </div>
        </div>
    );
}

function Timer(props) {
    return (
        <div style={{ position: 'absolute', top: '10px', left: '407px'}}>
            <h2>{props.timeRemaining}</h2>
        </div>
    );
}

function Result(props) {
    return (
        <div style={{ position: 'absolute', top: '150px', left: '325px', textAlign: 'center' }}>
            <h2>{props.winMessage}</h2>
        </div>
    );
}

function Menu(props) {
    return (
        <div style={{ position: 'absolute', left: '370px', top: '550px' }}>
            <button disabled={props.buttonDisabled} onClick={props.onClick}>{props.buttonText}</button>
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
            ballTopDirection: 1,
            ballLeftDirection: 1,
            playerOneScore: 0,
            playerTwoScore: 0,
            goalMade: false,
            timer: '',
            winMessage: '',
            buttonText: "Start Game",
            buttonDisabled: false,
            buttonFunction: () => { this.startGame() },
        }

        // Array to handle key inputs.
        this.keysPressed = [];

        // Setup event handler for keyboard input when pressing a key.
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);

        // Setup event handler for keyboard input when releasing a key.
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.handleKeyUp); 

        // This will hold the wait timer for when a goal is scored in order to give the players time between rounds to get ready.
        this.waitTimer = null;

        // This will hold the game loop interval and will be set when the game starts, cleared when the game ends.
        this.gameLoopInterval = null;
    }

    // The loop of the game that will handle user input and updating the ball's position and movement.
    gameLoop() {
        this.resolvePressedKeys();
        this.checkForBallCollision();
        this.updateBallPosition();
        if (this.state.goalMade) {
            this.checkGameProgress();
        }
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
                leftPaddleTop: (this.state.leftPaddleTop - PADDLE_SPEED <= 1) ? 1 : (this.state.leftPaddleTop - PADDLE_SPEED)
            });
        }

        // S key.
        if (this.keysPressed[83]) {
            this.setState({
                leftPaddleTop: (this.state.leftPaddleTop + PADDLE_SPEED >= 447) ? 447 : (this.state.leftPaddleTop + PADDLE_SPEED)
            });
        }

        // Right paddle movement.
        // Up arrow.
        if (this.keysPressed[38]) {
            this.setState({
                rightPaddleTop: (this.state.rightPaddleTop - PADDLE_SPEED <= 1) ? 1 : (this.state.rightPaddleTop - PADDLE_SPEED)
            });
        }

        // Down arrow.
        if (this.keysPressed[40]) {
            this.setState({
                rightPaddleTop: (this.state.rightPaddleTop + PADDLE_SPEED >= 447) ? 447 : (this.state.rightPaddleTop + PADDLE_SPEED)
            });
        }
    }

    updateBallPosition() {
        this.setState({
            ballTop: this.state.ballTop + (BALL_SPEED * this.state.ballTopDirection),
            ballLeft: this.state.ballLeft + (BALL_SPEED * this.state.ballLeftDirection),
        });
    }

    checkForBallCollision() {
        // Collision with left goal bounds.
        if ((this.state.ballLeftDirection < 0) &&           // If ball is moving left AND
            (this.state.ballLeft - BALL_SPEED <= 13)) {     // If the current ball left position minus its speed is <= to the position of the right side of the left paddle.
            // Check to see if ball collides with left paddle or makes it into the left goal.
            if ((this.state.ballTop + 10 >= this.state.leftPaddleTop) &&    // If the ball is below the top position of the left paddle AND
                (this.state.ballTop <= this.state.leftPaddleTop + 50)) {    // If the ball is above the bottom position of the left paddle.
                // Make the ball hit the left paddle and change the left/right direction of the ball.
                this.setState({
                    ballLeft: 13,
                    ballLeftDirection: this.state.ballLeftDirection * -1,
                });
            }
            else {
                // Update player two's score and set the goalMade flag to true.
                this.setState({
                    playerTwoScore: this.state.playerTwoScore + 1,
                    goalMade: true,
                });

                // Stop the game loop to avoid unnecessary function calls between rounds.
                clearInterval(this.gameLoopInterval);
            }
        }

        // Collision with right goal bounds.
        if ((this.state.ballLeftDirection > 0) &&           // If the ball is moving right AND
            (this.state.ballLeft + BALL_SPEED >= 775)) {    // If the current ball right position plus its speed is >= to the position of the left side of the right paddle.
            // Check to see if ball collides with right paddle or makes it into the right goal.
            if ((this.state.ballTop + 10 >= this.state.rightPaddleTop) &&   // If the ball is below the top position of the right paddle AND
                (this.state.ballTop <= this.state.rightPaddleTop + 50)) {   // If the ball is above the bottom position of the right paddle.
                // Make the ball hit the right paddle and change the left/right direction of the ball.
                this.setState({
                    ballLeft: 775,
                    ballLeftDirection: this.state.ballLeftDirection * -1,
                });
            }
            else {
                // Update player one's score and set the goalMade flag to true.
                this.setState({
                    playerOneScore: this.state.playerOneScore + 1,
                    goalMade: true,
                });

                // Stop the game loop to avoid unnecessary function calls between rounds.
                clearInterval(this.gameLoopInterval);
            }
        }

        // Collision with top wall.
        if ((this.state.ballTopDirection < 0) &&        // If the ball is moving up AND
            (this.state.ballTop - BALL_SPEED <= -1)) {  // If the current ball top position minus its speed is <= to the position of the top wall.
            // Make the ball hit the top wall and change the up/down direction of the ball.
            this.setState({
                ballTop: -1,
                ballTopDirection: this.state.ballTopDirection * -1,
            });
        }

        // Collision with bottom wall.
        if ((this.state.ballTopDirection > 0) &&        // If the ball is moving up AND
            (this.state.ballTop + BALL_SPEED >= 489)) { // If the current ball bottom position plus its speed is >= to the position of the bottom wall.
            // Make the ball hit the bottom wall and change the up/down direction of the ball.
            this.setState({
                ballTop: 489,
                ballTopDirection: this.state.ballTopDirection * -1,
            });
        }
    }

    checkGameProgress() {
        // One of the players has hit the max score, so end the game.
        if (this.state.playerOneScore >= 5 || this.state.playerTwoScore >= 5) {
            this.setState({
                winMessage: (this.state.playerOneScore >= 5) ? "Player 1 Wins!" : "Player 2 Wins!",
                buttonDisabled: false,
            });
        }
        // Reset positions of assets and have the players wait 3 seconds before the next round starts.
        else {
            // Need to wait a second before starting the next round so the players can see where the ball landed in the goal space.
            setTimeout(() => {
                this.setState({
                    ballTop: 245,
                    ballLeft: 395,
                    leftPaddleTop: 225,
                    rightPaddleTop: 225,
                    ballTopDirection: 1,
                    ballLeftDirection: 1,
                    goalMade: false,
                    timer: 3,
                });
                this.createAndStartCountdownTimer();
            }, 1000);
        }
    }

    // Reduce the count of the timer if the count is above 1,
    // Else remove the timer and resume the game.
    reduceTimer() {
        if (this.state.timer > 1) {
            this.setState({
                timer: this.state.timer - 1,
            });
        }
        else {
            this.setState({
                timer: '',
            });
            clearInterval(this.waitTimer);
            this.createAndStartGameLoopInterval();
        }
    }

    startGame() {
        this.setState({
            buttonText: "Play Again",
            buttonDisabled: true,
            buttonFunction: () => { this.resetGame() },
            timer: '3',
        });

        this.createAndStartCountdownTimer();
    }

    resetGame() {
        this.setState({
            ballTop: 245,
            ballLeft: 395,
            leftPaddleTop: 225,
            rightPaddleTop: 225,
            ballTopDirection: 1,
            ballLeftDirection: 1,
            playerOneScore: 0,
            playerTwoScore: 0,
            goalMade: false,
            timer: '3',
            winMessage: '',
            buttonDisabled: true,
        });

        this.createAndStartCountdownTimer();
    }

    createAndStartGameLoopInterval() {
        // Call the gameLoop every 33.3 milliseconds, 30 times a second.
        this.gameLoopInterval = setInterval(() => { this.gameLoop(); }, 33.3);
    }

    createAndStartCountdownTimer() {
        // Have reduceTimer called every second until it gets cleared.
        this.waitTimer = setInterval(() => { this.reduceTimer() }, 1000);
    }

    render() {
        return (
            <div>
                <Board leftPaddleTop={this.state.leftPaddleTop} rightPaddleTop={this.state.rightPaddleTop} ballLeft={this.state.ballLeft} ballTop={this.state.ballTop} />
                <Score playerOneScore={this.state.playerOneScore} playerTwoScore={this.state.playerTwoScore} />
                <Timer timeRemaining={this.state.timer} />
                <Result winMessage={this.state.winMessage} />
                <Menu buttonText={this.state.buttonText} onClick={this.state.buttonFunction} buttonDisabled={this.state.buttonDisabled} />
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
