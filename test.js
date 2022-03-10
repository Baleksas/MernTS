import cx from 'classnames';
import { Component, useState } from 'react';
// Component is not being rendered from the beggining of the task. No availability to test and see if it works.

export default class Counter extends Component {
    render() {
    const initialCount=42
    const [counter, setCounter]=useState(initialCount);
        return (
            <>
                <div>
                    <h2 className="counter">{counter}</h2>
                    <button onClick={()=>setCounter(counter+1)} className="counter-button">Click</button>
                </div>
                <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
            </>
        );
    }
}
