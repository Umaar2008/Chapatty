import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post('http://192.168.0.107:5000/User/Create', {
        UserName: name,
        UserEmail: email,
        UserPassword: password
      });
      set({ user: res.data.user, loading: false });
      console.log(res.data);
      return res.data;
    } catch (err) {
        const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },
  Login : async ({email , password}) => {
    set({loading: true , error:null});

    try {
        const res = await axios.post('http://192.168.0.107:5000/User/Login', {
            UserEmail: email,
            UserPassword: password
        } )
        set({ user: res.data.user, loading: false });   
    }
    catch(err) {
        const message = err.response?.data?.message || 'Login Failed';
        set({ error: message, loading: false });
      throw new Error(message);
    }
  }
}));

export default useAuthStore;
