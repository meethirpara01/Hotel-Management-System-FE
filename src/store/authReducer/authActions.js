import { useDispatch, useSelector } from "react-redux"
import { setUser, setLoading, setError } from "../authReducer/authSlice.js"
import { getMe, login, logout, register } from "../../services/auth.api.js";

export const authActions = () => {

    const dispatch = useDispatch();

    const loginCurrentUser = async ({ email, password }) => {
        
        try {
            dispatch(setLoading(true))
            
            const data = await login({ email, password });
            
            dispatch(setUser(data.user));
            console.log(data.user);
            

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
            console.log(error.response?.data?.message || "Login failed");
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const registerUser = async (user) => {
        try {
            const data = await register(user);
            return data;

        } catch (error) {
            console.log(error.response?.data?.message || "Registration failed");
            return error.response?.data?.message || "Registration failed";
        }
    }

    const fetchUserData = async () => {
        try {
            dispatch(setLoading(true))
            
            const data = await getMe();
            
            dispatch(setUser(data.user));
            // console.log(data.user);

        } catch (error) {
            console.log(error.response?.data?.message || "Fetching User Fail");
            return error.response?.data?.message || "Fetching User Fail";
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const logoutUser = async () => {
        try {
            dispatch(setLoading(true))
            
            const data = await logout();

            dispatch(setUser(null));

        } catch (error) {
            console.log(error.response?.data?.message || "Fetching User Fail");
            return error.response?.data?.message || "Fetching User Fail";
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return {
        loginCurrentUser, registerUser, fetchUserData, logoutUser
    }
}