import{j as e,m as a,C as j}from"./index-B8k1fdh0.js";import{S as f}from"./Section-Cuz9FD1M.js";import{C as c,R as u}from"./Row-XdZjjiY_.js";const r={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},v="https://archive.org/download/placeholder-image/placeholder-image.jpg",C=({mode:l="default",imageUrl:m,title:d,paragraphs:h,className:t="",imageAlt:p="Biography image",imageClassName:i="",textClassName:x=""})=>{const n=e.jsx(c,{md:5,className:`mb-4 mb-md-0 px-0 ${i}`,children:e.jsx(a.div,{variants:r,whileHover:{scale:1.02},transition:{type:"spring",stiffness:300},className:"text-center",children:e.jsx("img",{src:m,alt:p,className:`img-fluid rounded shadow w-100 ml-1 ${i}`,style:{maxHeight:"400px",objectFit:"cover"},onError:s=>{s.currentTarget.src=v}})})}),o=e.jsx(c,{md:7,className:`mb-4 mb-md-0 ps-md-4 ${x}`,children:e.jsxs(a.div,{variants:r,children:[e.jsx("h2",{className:"mb-4",children:d}),h.map((s,g)=>e.jsx(a.p,{variants:r,children:s},g))]})});return e.jsx(f,{className:t,children:e.jsx(j,{className:`py-4 d-flex bg-dark text-light rounded shadow-sm mt-5 ${t}`,children:e.jsx(u,{className:"align-items-center g-0",children:l==="default"?e.jsxs(e.Fragment,{children:[n,o]}):e.jsxs(e.Fragment,{children:[o,n]})})})})};export{C as BiographySection,C as default};
