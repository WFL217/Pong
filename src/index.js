import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

console.log("sin of 30 degrees ", Math.sin(30 * Math.PI / 180));

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
        
        this.focusRef = React.createRef();

        // Setup event handler for keyboard input.
        this.handleKeyPress = this.handleKeyPress.bind(this);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    // Set focus at first render.
    componentDidMount() {
        this.focusRef.current.focus();
    }

    /*//Set focus anytime a component updates.
    componentDidUpdate() {
        this.focusRef.current.focus();
    }*/

    // Handle user input.
    handleKeyPress(e) {
        if (e.keyCode === 38) {
            console.log("Up was pressed");
            let currentPosition = this.state.leftPaddleTop;
            this.setState({
                leftPaddleTop: currentPosition - PADDLE_SPEED,
            });
        } else if (e.keyCode === 40) {
            console.log("Down was pressed");
            let currentPosition = this.state.leftPaddleTop;
            this.setState({
                leftPaddleTop: currentPosition + PADDLE_SPEED,
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
