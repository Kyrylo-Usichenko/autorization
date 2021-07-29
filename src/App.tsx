import * as React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";


function App() {
    const history = useHistory();
    const {email,password,message,data} = useSelector(({reducer}:any) => reducer)

    if (data && data.statusCode === 200 ) {
        history.push("/me");
    } else if (data && data.status_code === 401){
        history.push("/")
    }


    return (
        <div className="App">
            <Route exact path="/">
                <HomePage email={email} password={password}/>
            </Route>

            <Route exact path="/me">
                <UserPage  message={message}/>
            </Route>
        </div>
    );
}

export default App;
