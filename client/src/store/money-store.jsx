import {create }from 'zustand'
import axios from 'axios'
import { persist,createJSONStorage } from 'zustand/middleware'
const moneyStore = (set) => ({
    user:null,
    token:null,

    actionLogin:async(form)=> {
       const res = await axios.post('http://172.24.96.1:8000/api/login',form)
    //    console.log(res.data.token)
       set({
        user:res.data.payload,
        token:res.data.token
       })
       return res
    }
})


const usePersist = {
    name:'money-store',
    storage:createJSONStorage(()=>localStorage)
}

const useMoneyStore = create(persist(moneyStore,usePersist))

export default useMoneyStore