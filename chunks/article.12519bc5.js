import{s as t,e as a}from"../index.4bf87375.js";const r=10;async function e(r){try{const{data:a}=await t.get("articles/"+r);return a.article}catch(e){throw a(e,"error while fetching article")}}async function c(r=1){try{const a={limit:10,offset:10*(r-1)},{data:e}=await t.get("articles/feed",a);return e}catch(e){throw a(e,"error while fetching feed")}}async function i(r=1,e){try{let a={limit:10,offset:10*(r-1)};e&&(a={...a,...e});const{data:c}=await t.get("articles",a);return c}catch(c){throw a(c,"error while fetching articles")}}async function n(r){try{const{data:a}=await t.post("articles",{article:r});return a.article}catch(e){throw a(e,"error while creating article")}}async function o(r,e){try{const{data:a}=await t.put("articles/"+r,{article:e});return a.article}catch(c){throw a(c,"error while updating article")}}async function s(r){try{const{data:a}=await t.post(`articles/${r}/favorite`);return a.article}catch(e){throw a(e,"error while favoriting article")}}async function l(r){try{const{data:a}=await t.delete(`articles/${r}/favorite`);return a.article}catch(e){throw a(e,"error while unfavoriting article")}}async function h(r){try{await t.delete("articles/"+r)}catch(e){throw a(e,"error while deleting article")}}export{i as a,c as b,l as c,s as d,r as e,h as f,e as g,o as h,n as i};