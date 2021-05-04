import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Ball(props) {
    return (
        <div className='ball'>
            <ol>Ball</ol>
        </div>);
}

function Paddle(props) {
    return (
        <div className='paddle'>
            <ol>Paddle {props.value}</ol>
        </div>
    );
}

class Board extends React.Component {
    renderPaddle(i) {
        return (
            <Paddle
                value={i}
            />
        );
    }

    render() {
        return (
            <div>
                <div id='paddle0' style={{ position: 'absolute', zIndex: '10', top: '225px', left: '4px' }}>
                    {this.renderPaddle(0)}
                </div>
                <div id='paddle1' style={{ position: 'absolute', zIndex: '10', top: '225px', right: '4px' }}>
                    {this.renderPaddle(1)}
                </div>
                <div style={{ position: 'absolute', zIndex: '20', top: '247px', left:'50px' }}>
                    <Ball />
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.focusRef = React.createRef();

        // Setup event handler for keyboard input.
        this.keyPress = this.keyPress.bind(this);
    }

    // Set focus at first render.
    componentDidMount() {
        this.focusRef.current.focus();
    }

    //Set focus anytime a component updates.
    componentDidUpdate() {
        this.focusRef.current.focus();
    }

    // Handle user input.
    keyPress(e) {
        if (e.keyCode === 38) {
            console.log("Up was pressed");
            document.getElementById('paddle0').innerHTML = "hello";
        } else if (e.keyCode === 40) {
            console.log("Down was pressed");
            document.getElementById('paddle0').innerHTML = "no"
        }
    }

    render() {
        return (
            <div>
                <div className='gameboard' style={{ position: 'absolute' }} tabIndex="0" ref={this.focusRef} onKeyDown={(e) => this.keyPress(e)}>
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
