import{a as r,m as e}from"../index.05617924.js";function s(){const{error:s}=r(r=>({error:r.error}));return 0===Object.keys(s).length?null:e`<ul class="error-messages">${Object.keys(s).map(r=>e`<li key=${r} aria-label=${r+" error"}>${r} ${s[r]}</li>`)}</ul>`}export{s as A};