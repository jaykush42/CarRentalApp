import axios from 'axios';

export const register = ({name, email, password}) => async (dispatch) => {
    

    // const { data } = await axios.post("http://localhost:5000/api/user", { name, email, password }, config);
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await axios.post('http://localhost:5000/api/users/signup', {name, email, password}, config);
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (err) {
        dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.message });
        throw err; // Optionally re-throw to handle errors in SignUp.jsx
    }
};

export const login = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/users/login', userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
        dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.message });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
};
