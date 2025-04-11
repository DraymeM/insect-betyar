import{q as Et,s as m,k as vt,w as K,x as Tt,f as bt,i as Rt}from"./index-DYXuOJkO.js";import{a as $,b as yt,c as xt,r as H,d as U,h as Ct}from"./hasClass-CIrHpRcW.js";import{r as a,j as c,b as wt}from"./router-CuCJBdoM.js";import{u as g}from"./useEventCallback-DfW3uSuk.js";function Mt(e){const t=a.useRef(null);return a.useEffect(()=>{t.current=e}),t.current}var Ot=Function.prototype.bind.call(Function.prototype.call,[].slice);function u(e,t){return Ot(e.querySelectorAll(t))}const kt="data-rr-ui-",At="rrUi";function Bt(e){return`${kt}${e}`}function $t(e){return`${At}${e}`}function O(e){e===void 0&&(e=Et());try{var t=e.activeElement;return!t||!t.nodeName?null:t}catch{return e.body}}function Nt(e){const t=a.useRef(e);return t.current=e,t}function Lt(e){const t=Nt(e);a.useEffect(()=>()=>t.current(),[])}function Ft(e=document){const t=e.defaultView;return Math.abs(t.innerWidth-e.documentElement.clientWidth)}const G=Bt("modal-open");class B{constructor({ownerDocument:t,handleContainerOverflow:n=!0,isRTL:r=!1}={}){this.handleContainerOverflow=n,this.isRTL=r,this.modals=[],this.ownerDocument=t}getScrollbarWidth(){return Ft(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(t){}removeModalAttributes(t){}setContainerStyle(t){const n={overflow:"hidden"},r=this.isRTL?"paddingLeft":"paddingRight",o=this.getElement();t.style={overflow:o.style.overflow,[r]:o.style[r]},t.scrollBarWidth&&(n[r]=`${parseInt(m(o,r)||"0",10)+t.scrollBarWidth}px`),o.setAttribute(G,""),m(o,n)}reset(){[...this.modals].forEach(t=>this.remove(t))}removeContainerStyle(t){const n=this.getElement();n.removeAttribute(G),Object.assign(n.style,t.style)}add(t){let n=this.modals.indexOf(t);return n!==-1||(n=this.modals.length,this.modals.push(t),this.setModalAttributes(t),n!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n}remove(t){const n=this.modals.indexOf(t);n!==-1&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(t))}isTopModal(t){return!!this.modals.length&&this.modals[this.modals.length-1]===t}}const St=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function jt(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}let k;function Dt(e){return k||(k=new B({ownerDocument:e==null?void 0:e.document})),k}function Pt(e){const t=$(),n=e||Dt(t),r=a.useRef({dialog:null,backdrop:null});return Object.assign(r.current,{add:()=>n.add(r.current),remove:()=>n.remove(r.current),isTopModal:()=>n.isTopModal(r.current),setDialogRef:a.useCallback(o=>{r.current.dialog=o},[]),setBackdropRef:a.useCallback(o=>{r.current.backdrop=o},[])})}const X=a.forwardRef((e,t)=>{let{show:n=!1,role:r="dialog",className:o,style:i,children:T,backdrop:h=!0,keyboard:b=!0,onBackdropClick:N,onEscapeKeyDown:L,transition:q,runTransition:Y,backdropTransition:z,runBackdropTransition:J,autoFocus:Q=!0,enforceFocus:Z=!0,restoreFocus:tt=!0,restoreFocusOptions:et,renderDialog:F,renderBackdrop:nt=s=>c.jsx("div",Object.assign({},s)),manager:rt,container:ot,onShow:S,onHide:j=()=>{},onExit:st,onExited:D,onExiting:at,onEnter:it,onEntering:lt,onEntered:ct}=e,dt=jt(e,St);const d=$(),p=yt(ot),l=Pt(rt),ut=xt(),ft=Mt(n),[R,P]=a.useState(!n),E=a.useRef(null);a.useImperativeHandle(t,()=>l,[l]),vt&&!ft&&n&&(E.current=O(d==null?void 0:d.document)),n&&R&&P(!1);const W=g(()=>{if(l.add(),C.current=K(document,"keydown",mt),x.current=K(document,"focus",()=>setTimeout(ht),!0),S&&S(),Q){var s,_;const M=O((s=(_=l.dialog)==null?void 0:_.ownerDocument)!=null?s:d==null?void 0:d.document);l.dialog&&M&&!U(l.dialog,M)&&(E.current=M,l.dialog.focus())}}),y=g(()=>{if(l.remove(),C.current==null||C.current(),x.current==null||x.current(),tt){var s;(s=E.current)==null||s.focus==null||s.focus(et),E.current=null}});a.useEffect(()=>{!n||!p||W()},[n,p,W]),a.useEffect(()=>{R&&y()},[R,y]),Lt(()=>{y()});const ht=g(()=>{if(!Z||!ut()||!l.isTopModal())return;const s=O(d==null?void 0:d.document);l.dialog&&s&&!U(l.dialog,s)&&l.dialog.focus()}),gt=g(s=>{s.target===s.currentTarget&&(N==null||N(s),h===!0&&j())}),mt=g(s=>{b&&Tt(s)&&l.isTopModal()&&(L==null||L(s),s.defaultPrevented||j())}),x=a.useRef(),C=a.useRef(),pt=(...s)=>{P(!0),D==null||D(...s)};if(!p)return null;const I=Object.assign({role:r,ref:l.setDialogRef,"aria-modal":r==="dialog"?!0:void 0},dt,{style:i,className:o,tabIndex:-1});let w=F?F(I):c.jsx("div",Object.assign({},I,{children:a.cloneElement(T,{role:"document"})}));w=H(q,Y,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!n,onExit:st,onExiting:at,onExited:pt,onEnter:it,onEntering:lt,onEntered:ct,children:w});let v=null;return h&&(v=nt({ref:l.setBackdropRef,onClick:gt}),v=H(z,J,{in:!!n,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:v})),c.jsx(c.Fragment,{children:wt.createPortal(c.jsxs(c.Fragment,{children:[v,w]}),p)})});X.displayName="Modal";const Xt=Object.assign(X,{Manager:B});function Wt(e,t){e.classList?e.classList.add(t):Ct(e,t)||(typeof e.className=="string"?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}function V(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function It(e,t){e.classList?e.classList.remove(t):typeof e.className=="string"?e.className=V(e.className,t):e.setAttribute("class",V(e.className&&e.className.baseVal||"",t))}const f={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class _t extends B{adjustAndStore(t,n,r){const o=n.style[t];n.dataset[t]=o,m(n,{[t]:`${parseFloat(m(n,t))+r}px`})}restore(t,n){const r=n.dataset[t];r!==void 0&&(delete n.dataset[t],m(n,{[t]:r}))}setContainerStyle(t){super.setContainerStyle(t);const n=this.getElement();if(Wt(n,"modal-open"),!t.scrollBarWidth)return;const r=this.isRTL?"paddingLeft":"paddingRight",o=this.isRTL?"marginLeft":"marginRight";u(n,f.FIXED_CONTENT).forEach(i=>this.adjustAndStore(r,i,t.scrollBarWidth)),u(n,f.STICKY_CONTENT).forEach(i=>this.adjustAndStore(o,i,-t.scrollBarWidth)),u(n,f.NAVBAR_TOGGLER).forEach(i=>this.adjustAndStore(o,i,t.scrollBarWidth))}removeContainerStyle(t){super.removeContainerStyle(t);const n=this.getElement();It(n,"modal-open");const r=this.isRTL?"paddingLeft":"paddingRight",o=this.isRTL?"marginLeft":"marginRight";u(n,f.FIXED_CONTENT).forEach(i=>this.restore(r,i)),u(n,f.STICKY_CONTENT).forEach(i=>this.restore(o,i)),u(n,f.NAVBAR_TOGGLER).forEach(i=>this.restore(o,i))}}let A;function qt(e){return A||(A=new _t(e)),A}const Kt=a.createContext({onHide(){}}),Yt=a.forwardRef(({closeLabel:e="Close",closeVariant:t,closeButton:n=!1,onHide:r,children:o,...i},T)=>{const h=a.useContext(Kt),b=bt(()=>{h==null||h.onHide(),r==null||r()});return c.jsxs("div",{ref:T,...i,children:[o,n&&c.jsx(Rt,{"aria-label":e,variant:t,onClick:b})]})});export{Yt as A,Xt as B,Kt as M,$t as a,_t as b,Bt as d,qt as g,u as q};
