import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ENDPOINTS } from "../api/api";

export const AuthProvider = ({ children }) => {
    const loginUrl = ENDPOINTS.LOGIN;
    const refreshUrl = ENDPOINTS.REFRESH_TOKEN;
    const meUrl = ENDPOINTS.ME;

    const [token, setToken] = useState();
    const [userData, setUserData] = useState(null);

    const login = async (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        axios
            .post(loginUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            .then((res) => {
                setToken(res.data.access_token);
                setUserData(res.data.user);
            })
            .catch(() => {
                setToken(null);
                setUserData(null);
            });
    };

    const logout = () => {
        setToken(null);
        setUserData(null);
    };

    useLayoutEffect(() => {
        if (!token) {
            axios.get(refreshUrl, { withCredentials: true }).then((res) => {
                setToken(res.data.access_token);
                axios
                    .get(meUrl, {
                        headers: {
                            Authorization: `Bearer ${res.data.access_token}`,
                        },
                    })
                    .then((res) => setUserData(res.data));
            });
        }
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = axios.interceptors.request.use((config) => {
            config.headers.Authorization =
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization;

            return config;
        });

        return () => {
            axios.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = axios.interceptors.response.use(
            (res) => res,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response.status === 403 &&
                    error.response.data.message === "Unauthorized"
                ) {
                    axios
                        .get(refreshUrl)
                        .then((res) => {
                            setToken(res.data.access_token);
                            setUserData(res.data.user);

                            originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
                            originalRequest._retry = true;

                            return axios(originalRequest);
                        })
                        .catch(() => {
                            setToken(null);
                            setUserData(null);
                        });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    const contextData = {
        login,
        logout,
        userData,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
