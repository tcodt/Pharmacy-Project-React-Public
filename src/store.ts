import createStore from 'react-auth-kit/createStore';
import refresh from './refresh';

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    refresh: refresh
});

export default store