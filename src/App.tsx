import * as React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";
import { State } from './index';


function App() {
    const history = useHistory();

    const {message ,data} = useSelector(({reducer}: State) => reducer)
    if (data  === 200 ) {
        history.push("/me");
    } else if (data === 401){
        history.push("/")
    }


    return (
        <div className="App">
            <Route exact path="/">
                <HomePage />
            </Route>

            <Route exact path="/me">
                <UserPage  message={message} />
            </Route>
        </div>
    );
}

export default App;
