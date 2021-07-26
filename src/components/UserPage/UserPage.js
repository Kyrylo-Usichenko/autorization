import './../../styles/global.css'

const UserPage = ({message}) => {

    return (
        <div className='container'>
            {
                !message ? <h1>loading...</h1> : <h1>{message}</h1>
            }
        </div>
    );
};

export default UserPage;
