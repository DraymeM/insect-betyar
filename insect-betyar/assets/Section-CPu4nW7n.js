import{r as x,j as m,a as $,u as h,b as w,d as y,m as B}from"./index-D00fTWig.js";function j({as:n,bsPrefix:s,className:f,...o}){s=h(s,"col");const u=w(),c=y(),i=[],d=[];return u.forEach(r=>{const l=o[r];delete o[r];let e,a,t;typeof l=="object"&&l!=null?{span:e,offset:a,order:t}=l:e=l;const p=r!==c?`-${r}`:"";e&&i.push(e===!0?`${s}${p}`:`${s}${p}-${e}`),t!=null&&d.push(`order${p}-${t}`),a!=null&&d.push(`offset${p}-${a}`)}),[{...o,className:$(f,...i,...d)},{as:n,bsPrefix:s,spans:i}]}const v=x.forwardRef((n,s)=>{const[{className:f,...o},{as:u="div",bsPrefix:c,spans:i}]=j(n);return m.jsx(u,{...o,ref:s,className:$(f,!i.length&&c)})});v.displayName="Col";const N=x.forwardRef(({bsPrefix:n,className:s,as:f="div",...o},u)=>{const c=h(n,"row"),i=w(),d=y(),r=`${c}-cols`,l=[];return i.forEach(e=>{const a=o[e];delete o[e];let t;a!=null&&typeof a=="object"?{cols:t}=a:t=a;const p=e!==d?`-${e}`:"";t!=null&&l.push(`${r}${p}-${t}`)}),m.jsx(f,{ref:u,...o,className:$(s,c,...l)})});N.displayName="Row";const R={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.8,ease:"easeOut"}}},E=({children:n,className:s=""})=>m.jsx(B.div,{initial:"hidden",whileInView:"visible",viewport:{once:!1,margin:"-100px 0px -100px 0px"},variants:R,className:s,children:n});export{v as C,N as R,E as S};
