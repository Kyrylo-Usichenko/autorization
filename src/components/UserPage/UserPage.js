import './../../styles/global.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {showContent} from "../../redux/actions";


const UserPage = ({message}) => {


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showContent(window.sessionStorage.access_token))
    },[dispatch]);

    return (
        <div className='container'>

            <h1>{message}</h1>

        </div>
    );
};

export default UserPage;
