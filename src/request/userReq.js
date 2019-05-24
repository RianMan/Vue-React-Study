import axios from 'axios';
const host ='http://localhost:9898';
export const getUser = () => new Promise((res,rej)=>{
    axios.get(host + '/user').then((resp)=>{
      res(resp.data);
    }).catch((err)=>{
        rej(err);
    })
});

export const loginApi = (objData) => new Promise((res,rej)=>{
    axios.post(host + '/login',objData).then((resp)=>{
      res(resp.data);
    }).catch((err)=>{
        rej(err);
    })
})