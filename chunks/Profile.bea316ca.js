import{b as s,l as a,y as i,k as l,m as e,D as t,u as o,L as c,a as n,A as r,P as d}from"../index.a1bc8b39.js";import{c as u,a as v,b as f}from"./profile.2dc205f6.js";function $(s){let a=void 0,i=s[0],l=1;for(;l<s.length;){const e=s[l],t=s[l+1];if(l+=2,("optionalAccess"===e||"optionalCall"===e)&&null==i)return;"access"===e||"optionalAccess"===e?(a=i,i=t(i)):"call"!==e&&"optionalCall"!==e||(i=t((...s)=>i.call(a,...s)),a=void 0)}return i}export default function(m){const p=$([m,"access",s=>s.username,"optionalAccess",s=>s.replace,"call",s=>s(/^@/,"")])||"",{url:g}=s(),[b,w]=a({}),[h,y]=a([]),[A,x]=a(0),[C,k]=a(1),[P,j]=a(!1);return i(()=>{!async function(){w(await u(p))}()},[p]),i(()=>{!async function(){j(!0);const{articles:s,articlesCount:a}=await l(C,{[/.*\/favorites/g.test(g)?"favorited":"author"]:p});y(s),x(a),j(!1)}()},[g,C,p]),e`<div class="profile-page"><div class="user-info"><div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><img src=${b.image||t} class="user-img"/><h4>${p}</h4><p>${b.bio}</p>${p==o(s=>$([s,"access",s=>s.user,"optionalAccess",s=>s.username]))?e`<${c} href="/settings" class="btn btn-sm btn-outline-secondary action-btn"><i class="ion-gear-a"/>Edit Profile Settings<//>`:e`<button class="btn btn-sm btn-outline-secondary action-btn" onClick=${async()=>{b.following?(w(s=>({...s,following:!1})),await v(p)):(w(s=>({...s,following:!0})),await f(p))}}><i class="ion-plus-round"/>${b.following?"Unfollow":"Follow"} ${p}</button>`}</div></div></div></div><div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><div class="articles-toggle"><ul class="nav nav-pills outline-active"><li class="nav-item"><${c} href=${"/@"+b.username}>My Articles<//></li><li class="nav-item"><${c} href=${`/@${b.username}/favorites`}>Favorited Articles<//></li></ul></div>${P?e`<${n} show=${P} style=${{margin:"1rem auto",display:"flex"}} width="2rem"/>`:h.length>0?h.map(s=>e`<${r} key=${s.slug} article=${s}/>`):e`<div class="article-preview">No articles are here... yet.</div>`}<${d} count=${A} page=${C} setPage=${k}/></div></div></div></div>`}