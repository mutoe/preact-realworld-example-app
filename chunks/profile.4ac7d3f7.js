import{f as o,g as r}from"../index.49b2c7ee.js";async function t(t){try{const{data:r}=await o.get(`profiles/${t}`);return r.profile}catch(e){throw r(e,"error while fetching profile data")}}async function e(t){try{const{data:r}=await o.post(`profiles/${t}/follow`);return r.profile}catch(e){throw r(e,"error while following profile")}}async function a(t){try{const{data:r}=await o.delete(`profiles/${t}/follow`);return r.profile}catch(e){throw r(e,"error while unfollowing profile")}}export{a,e as b,t as c};