import Cookie from "@/service/cookie";
import axios from "axios";
import store from "@/store";
export default {
    redirectIfAuthenticated(to, from, next){
        const token = Cookie.getToken();
        let n;
        if(token){
            n = ({ name: 'index' });
        }
        next(n);
    },
    async redirectIfNotAuthenticated(to, from, next){
        const token = Cookie.getToken();
        let n;
        if(!token){
            n = ({ name: 'login' });
        }

        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = token;

        await axios.get('http://127.0.0.1:8000/api/v1/me')
            .then((response)=>{
                if(!store?.state?.user?.id) {
                    store.commit('user/STORE_USER', response.data.data);
                }
            })
            .catch(()=>{
                Cookie.deleteToken();
                n = ({ name: 'login' });
            }
        );
        next(n);
    },
}