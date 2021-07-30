import './../../styles/global.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {showContent} from "../../redux/actions";


type propsType = {
    message: string | null
}

const UserPage = (props:propsType) => {

    const {message} = props
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
