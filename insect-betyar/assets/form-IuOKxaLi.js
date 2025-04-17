import{r as N,f as L,j as e}from"./router-Cj35iyZR.js";import{d as G,e as I,c as w}from"./index-CHifeliK.js";import{z as n}from"./index-osC7Gmze.js";import{F as r}from"./Form-HNhptAMN.js";import{R as C,C as c}from"./Row-DuKvbJf5.js";import{B as z}from"./Button-C0XCOhVB.js";import"./react-DbHEDQBy.js";import"./index-CscOspqo.js";import"./FormControl-CCI0jK-w.js";import"./warning-C13o4bTx.js";import"./ElementChildren-B-26LL-j.js";import"./Button-DSZG8cj7.js";const M=n.object({firstName:n.string().min(3,"Kérlek add meg a keresztneved."),lastName:n.string().min(3,"Kérlek add meg a vezetékneved."),email:n.string().email("Érvényes email cím szükséges."),country:n.string().min(1,"Válassz országot."),city:n.string().min(1,"Kérlek add meg a várost."),street:n.string().min(1,"Kérlek add meg az utcát."),houseNumber:n.string().min(1,"Kérlek add meg a házszámot."),deliveryMethod:n.string().min(1,"Válassz szállítási módot."),paymentMethod:n.string().min(1,"Válassz fizetési módot.")}),E=["Magyarország","Szlovákia","Szlovénia","Csehország","Románia","Szerbia","Lengyelország"],R=()=>{const[a,f]=N.useState({firstName:"",lastName:"",email:"",country:"",city:"",street:"",houseNumber:"",deliveryMethod:"",paymentMethod:""}),[t,g]=N.useState({}),[V,_]=N.useState(!1),F=L(),l=s=>{var x,u,p,y,b,v,j,o,k;const{name:d,value:m}=s.target;f(i=>({...i,[d]:m}));const h=M.safeParse(a);if(h.success)g({});else{const i=h.error.format();g({firstName:(x=i.firstName)==null?void 0:x._errors[0],lastName:(u=i.lastName)==null?void 0:u._errors[0],email:(p=i.email)==null?void 0:p._errors[0],country:(y=i.country)==null?void 0:y._errors[0],city:(b=i.city)==null?void 0:b._errors[0],street:(v=i.street)==null?void 0:v._errors[0],houseNumber:(j=i.houseNumber)==null?void 0:j._errors[0],deliveryMethod:(o=i.deliveryMethod)==null?void 0:o._errors[0],paymentMethod:(k=i.paymentMethod)==null?void 0:k._errors[0]})}},S=s=>{var m,h,x,u,p,y,b,v,j;s.preventDefault();const d=M.safeParse(a);if(!d.success){const o=d.error.format();g({firstName:(m=o.firstName)==null?void 0:m._errors[0],lastName:(h=o.lastName)==null?void 0:h._errors[0],email:(x=o.email)==null?void 0:x._errors[0],country:(u=o.country)==null?void 0:u._errors[0],city:(p=o.city)==null?void 0:p._errors[0],street:(y=o.street)==null?void 0:y._errors[0],houseNumber:(b=o.houseNumber)==null?void 0:b._errors[0],deliveryMethod:(v=o.deliveryMethod)==null?void 0:v._errors[0],paymentMethod:(j=o.paymentMethod)==null?void 0:j._errors[0]});return}_(!0)};return e.jsxs("div",{className:"container mt-5 mb-5 pt-5 flex",children:[e.jsx("h2",{children:"Megrendelési adatok"}),e.jsxs(r,{onSubmit:S,children:[e.jsxs(C,{className:"mb-3",children:[e.jsx(c,{children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Vezetéknév"}),e.jsx(r.Control,{type:"text",name:"lastName",value:a.lastName,onChange:l,isInvalid:!!t.lastName,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.lastName})]})}),e.jsx(c,{children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Keresztnév"}),e.jsx(r.Control,{type:"text",name:"firstName",value:a.firstName,onChange:l,isInvalid:!!t.firstName,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.firstName})]})})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"E-mail"}),e.jsx(r.Control,{type:"email",name:"email",value:a.email,onChange:l,isInvalid:!!t.email,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.email})]}),e.jsxs(C,{className:"mb-3",children:[e.jsx(c,{md:3,children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Ország"}),e.jsxs(r.Select,{name:"country",value:a.country,onChange:l,isInvalid:!!t.country,className:"bg-dark text-light border border-secondary",children:[e.jsx("option",{value:"",children:"Válassz országot"}),E.map(s=>e.jsx("option",{value:s,children:s},s))]}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.country})]})}),e.jsx(c,{md:3,children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Város"}),e.jsx(r.Control,{type:"text",name:"city",value:a.city,onChange:l,isInvalid:!!t.city,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.city})]})}),e.jsx(c,{md:4,children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Utca"}),e.jsx(r.Control,{type:"text",name:"street",value:a.street,onChange:l,isInvalid:!!t.street,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.street})]})}),e.jsx(c,{md:2,children:e.jsxs(r.Group,{children:[e.jsx(r.Label,{children:"Házszám"}),e.jsx(r.Control,{type:"text",name:"houseNumber",value:a.houseNumber,onChange:l,isInvalid:!!t.houseNumber,className:"bg-dark text-light border border-secondary"}),e.jsx(r.Control.Feedback,{type:"invalid",children:t.houseNumber})]})})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Szállítási mód"}),e.jsx("div",{className:"d-flex gap-3 flex-wrap",children:["foxpost","packeta","easybox"].map(s=>{const d=a.deliveryMethod===s;return e.jsxs("div",{onClick:()=>f(m=>({...m,deliveryMethod:s})),style:{minWidth:"120px",textAlign:"center",border:"1px solid",borderColor:d?"#0d6efd":"#6c757d",backgroundColor:d?"#0d6efd":"#212529",color:"white",borderRadius:"0.375rem",padding:"1rem",boxShadow:"0 0 5px rgba(0,0,0,0.3)",cursor:"pointer",position:"relative",transition:"all 0.2s ease-in-out"},children:[s==="foxpost"&&"FoxPost",s==="packeta"&&"Packeta",s==="easybox"&&"EasyBox",d&&e.jsx(G,{style:{position:"absolute",top:5,right:8}})]},s)})}),t.deliveryMethod&&e.jsx("div",{className:"text-danger",children:t.deliveryMethod})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Fizetési mód"}),e.jsx(r.Check,{type:"radio",label:"Előre utalás",name:"paymentMethod",value:"előre utalás",checked:a.paymentMethod==="előre utalás",onChange:l,isInvalid:!!t.paymentMethod}),e.jsx(r.Check,{type:"radio",label:"Utánvét",name:"paymentMethod",value:"utánvét",checked:a.paymentMethod==="utánvét",onChange:l,isInvalid:!!t.paymentMethod}),t.paymentMethod&&e.jsx("div",{className:"text-danger",children:t.paymentMethod})]}),e.jsxs(r.Group,{className:"d-flex justify-content-between mt-4",children:[e.jsxs(z,{variant:"secondary",onClick:()=>F({to:"/cart"}),children:[e.jsx(I,{})," Vissza"]}),e.jsxs(z,{variant:"primary",type:"submit",disabled:Object.keys(t).length>0,children:[e.jsx(w,{})," Tovább"]})]})]})]})},Q=R;export{Q as component};
