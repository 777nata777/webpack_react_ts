import React, {useState} from 'react';
import * as styles from './App.module.scss';


const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1)

    console.log("CSS Modules:", styles);

    return (

        <div>
            <h1>{count}</h1>
            <button className={styles.button} onClick={increment}><span>
                asdf
            </span></button>
        </div>
    );
};

export default App;