import{j as s}from"./router-CuCJBdoM.js";import{g as r,i as l}from"./index-BuUMi195.js";import"./react-DbHEDQBy.js";import"./index-DYXuOJkO.js";const x=({currentPage:i,totalPages:e,onPageChange:o})=>s.jsx("nav",{"aria-label":"Page navigation",className:"mt-4",children:s.jsxs("ul",{className:"pagination justify-content-center",children:[s.jsx("li",{className:`page-item ${i===1?"disabled":""}`,children:s.jsx("button",{className:`page-link mx-1 ${i===1?"bg-dark border-secondary text-secondary":"bg-info border-secondary text-white"}`,onClick:()=>o(i-1),disabled:i===1,children:s.jsx(r,{})})}),Array.from({length:e},(a,d)=>d+1).map(a=>s.jsx("li",{className:`page-item ${a===i?"active":""}`,children:s.jsx("button",{className:`page-link mx-1 ${a===i?"bg-info border-info text-white":"bg-dark border-secondary text-secondary"}`,onClick:()=>o(a),children:a})},a)),s.jsx("li",{className:`page-item ${i===e?"disabled":""}`,children:s.jsx("button",{className:`page-link mx-1 ${i===e?"bg-dark border-secondary text-secondary":"bg-info border-secondary text-white"}`,onClick:()=>o(i+1),disabled:i===e,children:s.jsx(l,{})})})]})});export{x as default};
