import{r as s,Y as le,Z as ie,Q as q,$ as ce,a0 as ue,a1 as de,a2 as A,a3 as fe,a4 as B,a5 as he,a6 as pe}from"./index-CDuyu8Ry.js";const ve="Error preloading route! ☝️";function me(n,m){const a=le(),[u,y]=s.useState(!1),v=s.useRef(!1),l=ie(m),{activeProps:T=()=>({className:"active"}),inactiveProps:O=()=>({}),activeOptions:o,to:g,preload:w,preloadDelay:j,hashScrollIntoView:V,replace:$,startTransition:Q,resetScroll:W,viewTransition:Y,children:C,target:f,disabled:r,style:P,className:b,onClick:S,onFocus:k,onMouseEnter:x,onMouseLeave:E,onTouchStart:_,ignoreBlocker:Z,...G}=n,{params:Te,search:ge,hash:Pe,state:be,mask:Se,reloadDocument:ke,...I}=G,F=s.useMemo(()=>{try{return new URL(`${g}`),"external"}catch{}return"internal"},[g]),J=q({select:e=>e.location.search,structuralSharing:!0}),N=ce({select:e=>{var t;return n.from??((t=e[e.length-1])==null?void 0:t.fullPath)}}),i=s.useMemo(()=>({...n,from:N}),[n,N]),c=s.useMemo(()=>a.buildLocation(i),[a,i,J]),h=s.useMemo(()=>i.reloadDocument?!1:w??a.options.defaultPreload,[a.options.defaultPreload,w,i.reloadDocument]),X=j??a.options.defaultPreloadDelay??0,L=q({select:e=>{if(o!=null&&o.exact){if(!fe(e.location.pathname,c.pathname,a.basepath))return!1}else{const t=B(e.location.pathname,a.basepath).split("/");if(!B(c.pathname,a.basepath).split("/").every((oe,se)=>oe===t[se]))return!1}return((o==null?void 0:o.includeSearch)??!0)&&!he(e.location.search,c.search,{partial:!(o!=null&&o.exact),ignoreUndefined:!(o!=null&&o.explicitUndefined)})?!1:o!=null&&o.includeHash?e.location.hash===c.hash:!0}}),d=s.useCallback(()=>{a.preloadRoute(i).catch(e=>{console.warn(e),console.warn(ve)})},[i,a]),ee=s.useCallback(e=>{e!=null&&e.isIntersecting&&d()},[d]);if(ue(l,ee,{rootMargin:"100px"},{disabled:!!r||h!=="viewport"}),de(()=>{v.current||!r&&h==="render"&&(d(),v.current=!0)},[r,d,h]),F==="external")return{...I,ref:l,type:F,href:g,...C&&{children:C},...f&&{target:f},...r&&{disabled:r},...P&&{style:P},...b&&{className:b},...S&&{onClick:S},...k&&{onFocus:k},...x&&{onMouseEnter:x},...E&&{onMouseLeave:E},..._&&{onTouchStart:_}};const te=e=>{if(!r&&!ye(e)&&!e.defaultPrevented&&(!f||f==="_self")&&e.button===0){e.preventDefault(),pe.flushSync(()=>{y(!0)});const t=a.subscribe("onResolved",()=>{t(),y(!1)});return a.navigate({...i,replace:$,resetScroll:W,hashScrollIntoView:V,startTransition:Q,viewTransition:Y,ignoreBlocker:Z})}},z=e=>{r||h&&d()},ae=z,re=e=>{if(r)return;const t=e.target||{};if(h){if(t.preloadTimeout)return;t.preloadTimeout=setTimeout(()=>{t.preloadTimeout=null,d()},X)}},ne=e=>{if(r)return;const t=e.target||{};t.preloadTimeout&&(clearTimeout(t.preloadTimeout),t.preloadTimeout=null)},p=e=>t=>{var M;(M=t.persist)==null||M.call(t),e.filter(Boolean).forEach(U=>{t.defaultPrevented||U(t)})},R=L?A(T,{})??{}:{},D=L?{}:A(O,{}),H=[b,R.className,D.className].filter(Boolean).join(" "),K={...P,...R.style,...D.style};return{...I,...R,...D,href:r?void 0:c.maskedLocation?a.history.createHref(c.maskedLocation.href):a.history.createHref(c.href),ref:l,onClick:p([S,te]),onFocus:p([k,z]),onMouseEnter:p([x,re]),onMouseLeave:p([E,ne]),onTouchStart:p([_,ae]),disabled:!!r,target:f,...Object.keys(K).length&&{style:K},...H&&{className:H},...r&&{role:"link","aria-disabled":!0},...L&&{"data-status":"active","aria-current":"page"},...u&&{"data-transitioning":"transitioning"}}}const Ee=s.forwardRef((n,m)=>{const{_asChild:a,...u}=n,{type:y,ref:v,...l}=me(u,m),T=typeof u.children=="function"?u.children({isActive:l["data-status"]==="active"}):u.children;return typeof a>"u"&&delete l.disabled,s.createElement(a||"a",{...l,ref:v},T)});function ye(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}export{Ee as L};
