import{r as m,j as e,m as t}from"./index-Cx1FZqZK.js";import{c as p}from"./About-DpRg4rBE.js";import"./index-DFUFaVJQ.js";import"./useLocation-Pmimf7Z-.js";import"./repo-Dmkhlz7d.js";import"./FormControl-B9d5uh4U.js";import"./warning-C69parn0.js";import"./Button-CDHd72D7.js";import"./index-bzScCH3g.js";import"./Fade-CCPIUCJC.js";import"./useTimeout-DU18Ng8Y.js";import"./CloseButton-DM_vxMhB.js";const r="https://archive.org/download/placeholder-image/placeholder-image.jpg",C=({category:o,image:i,onClick:a,index:s=0})=>{const[d,c]=m.useState(i||r),l=p(()=>{a()},300),n={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,ease:"easeOut",delay:s*.1}},hover:{boxShadow:"0 8px 16px rgba(0, 0, 0, 0.3)"},tap:{scale:.98}};return e.jsxs(t.div,{className:"card bg-dark mt-1 mb-1 border border-2 border-secondary rounded-4 overflow-hidden h-100",variants:n,initial:"hidden",animate:"visible",whileHover:"hover",whileTap:"tap",onClick:l,style:{cursor:"pointer"},children:[e.jsx("div",{className:"p-3 pb-0",children:e.jsx("div",{className:"border rounded-3 overflow-hidden bg-dark",style:{position:"relative",paddingBottom:"100%",width:"100%",maxWidth:"12rem",minWidth:"10rem"},children:e.jsx(t.img,{src:d,className:"w-100 h-100",style:{position:"absolute",top:0,left:0,objectFit:"cover",objectPosition:"center"},onError:()=>c(r)})})}),e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center p-3 pt-0",children:[e.jsx("h5",{className:"text-center text-light mb-0 mt-2",children:o}),e.jsx("div",{className:"text-center mt-2",children:e.jsx(t.span,{className:"text-muted small",whileHover:{scale:1.05}})})]})]})};export{C as default};
