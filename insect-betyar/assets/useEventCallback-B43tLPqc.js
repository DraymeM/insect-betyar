import{_ as d}from"./Button-BvdC542z.js";import{r as c}from"./index-B8k1fdh0.js";function p(){return p=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var e in n)({}).hasOwnProperty.call(n,e)&&(r[e]=n[e])}return r},p.apply(null,arguments)}function b(r){return"default"+r.charAt(0).toUpperCase()+r.substr(1)}function y(r){var t=P(r,"string");return typeof t=="symbol"?t:String(t)}function P(r,t){if(typeof r!="object"||r===null)return r;var n=r[Symbol.toPrimitive];if(n!==void 0){var e=n.call(r,t);if(typeof e!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}function g(r,t,n){var e=c.useRef(r!==void 0),o=c.useState(t),u=o[0],v=o[1],i=r!==void 0,m=e.current;return e.current=i,!i&&m&&u!==t&&v(t),[i?r:u,c.useCallback(function(f){for(var a=arguments.length,l=new Array(a>1?a-1:0),s=1;s<a;s++)l[s-1]=arguments[s];n&&n.apply(void 0,[f].concat(l)),v(f)},[n])]}function S(r,t){return Object.keys(t).reduce(function(n,e){var o,u=n,v=u[b(e)],i=u[e],m=d(u,[b(e),e].map(y)),f=t[e],a=g(i,v,r[f]),l=a[0],s=a[1];return p({},m,(o={},o[e]=l,o[f]=s,o))},r)}function h(r){const t=c.useRef(r);return c.useEffect(()=>{t.current=r},[r]),t}function C(r){const t=h(r);return c.useCallback(function(...n){return t.current&&t.current(...n)},[t])}export{C as a,g as b,S as u};
