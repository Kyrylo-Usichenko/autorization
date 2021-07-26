import React from "react";
import {Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";


function App() {
    const history = useHistory();
    const selectEmail = ({reducer}) => reducer.email
    const selectPassword = ({reducer}) => reducer.password
    const selectMessage = ({reducer}) => reducer.message
    const selectData = ({reducer}) => reducer.data
    const email = useSelector(selectEmail)
    const password = useSelector(selectPassword)
    const message = useSelector(selectMessage)
    const data = useSelector(selectData)
    if (data && data.statusCode === 200) {
        history.push("/me");
    } else {
        history.push("/")
    }
    return (
        <div className="App">
            <Route exact path="/">
                <HomePage email={email} password={password}/>
            </Route>

            <Route exact path="/me">
                <UserPage message={message}/>
            </Route>
            <Route history={history}/>

        </div>
    );
}

export default App;
