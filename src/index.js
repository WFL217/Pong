import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

console.log("sin of 30 degrees ", Math.sin(30 * Math.PI/180));

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
        this.state = {
            value: props.value,
            position: props.position,
            top: props.top,
            left: props.left,
            zIndex: props.zIndex,
        };
    }

    render() {
        return (
            <div className='paddle' style={{ position: this.state.position, zIndex: this.state.zIndex, top: this.state.top, left: this.state.left }}>
                <ol>Paddle {this.state.value}</ol>
            </div>
        );
    }
}


class Board extends React.Component {
    render() {
        return (
            <div>
                <Paddle value={0} position={'absolute'} zIndex={'10'} top={'225px'} left={'4px'} />
                <Paddle value={1} position={'absolute'} zIndex={'10'} top={'225px'} left={'786px'} />
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
            //document.getElementById('paddle0').innerHTML = "hello";
        } else if (e.keyCode === 40) {
            console.log("Down was pressed");
            //document.getElementById('paddle0').innerHTML = "no";
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
