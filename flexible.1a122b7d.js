"use strict";(()=>{var z=Object.create;var S=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var V=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty;var C=(e,r)=>()=>(e&&(r=e(e=0)),r);var F=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var K=(e,r,n,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of N(r))!B.call(e,t)&&t!==n&&S(e,t,{get:()=>r[t],enumerable:!(i=P(r,t))||i.enumerable});return e};var Y=(e,r,n)=>(n=e!=null?z(V(e)):{},K(r||!e||!e.__esModule?S(n,"default",{value:e,enumerable:!0}):n,e));var f=C(()=>{});var I=F((fe,W)=>{"use strict";f();var q=function(r){return G(r)&&!H(r)};function G(e){return!!e&&typeof e=="object"}function H(e){var r=Object.prototype.toString.call(e);return r==="[object RegExp]"||r==="[object Date]"||X(e)}var J=typeof Symbol=="function"&&Symbol.for,Q=J?Symbol.for("react.element"):60103;function X(e){return e.$$typeof===Q}function Z(e){return Array.isArray(e)?[]:{}}function b(e,r){return r.clone!==!1&&r.isMergeableObject(e)?s(Z(e),e,r):e}function k(e,r,n){return e.concat(r).map(function(i){return b(i,n)})}function ee(e,r){if(!r.customMerge)return s;var n=r.customMerge(e);return typeof n=="function"?n:s}function re(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(r){return Object.propertyIsEnumerable.call(e,r)}):[]}function x(e){return Object.keys(e).concat(re(e))}function R(e,r){try{return r in e}catch{return!1}}function ne(e,r){return R(e,r)&&!(Object.hasOwnProperty.call(e,r)&&Object.propertyIsEnumerable.call(e,r))}function te(e,r,n){var i={};return n.isMergeableObject(e)&&x(e).forEach(function(t){i[t]=b(e[t],n)}),x(r).forEach(function(t){ne(e,t)||(R(e,t)&&n.isMergeableObject(r[t])?i[t]=ee(t,n)(e[t],r[t],n):i[t]=b(r[t],n))}),i}function s(e,r,n){n=n||{},n.arrayMerge=n.arrayMerge||k,n.isMergeableObject=n.isMergeableObject||q,n.cloneUnlessOtherwiseSpecified=b;var i=Array.isArray(r),t=Array.isArray(e),c=i===t;return c?i?n.arrayMerge(e,r,n):te(e,r,n):b(r,n)}s.all=function(r,n){if(!Array.isArray(r))throw new Error("first argument should be an array");return r.reduce(function(i,t){return s(i,t,n)},{})};var ie=s;W.exports=ie});f();f();var _=Y(I(),1);f();function E(e,r,n){var i=n||{},t=i.noTrailing,c=t===void 0?!1:t,o=i.noLeading,m=o===void 0?!1:o,a=i.debounceMode,u=a===void 0?void 0:a,l,M=!1,y=0;function j(){l&&clearTimeout(l)}function U(g){var v=g||{},d=v.upcomingOnly,w=d===void 0?!1:d;j(),M=!w}function D(){for(var g=arguments.length,v=new Array(g),d=0;d<g;d++)v[d]=arguments[d];var w=this,A=Date.now()-y;if(M)return;function h(){y=Date.now(),r.apply(w,v)}function T(){l=void 0}!m&&u&&!l&&h(),j(),u===void 0&&A>e?m?(y=Date.now(),c||(l=setTimeout(u?T:h,e))):h():c!==!0&&(l=setTimeout(u?T:h,u===void 0?e-A:e))}return D.cancel=U,D}function L(e,r,n){var i=n||{},t=i.atBegin,c=t===void 0?!1:t;return E(e,r,{debounceMode:c!==!1})}function p(e){return`[flexible.js]: ${e}`}var ce={rootValue:16,resizeOption:{type:"debounce",delay:60}};function $(e){if(typeof window>"u"||typeof document>"u")return;e=(0,_.default)(e,ce);let{rootValue:r,resizeOption:n,distinctDevice:i}=e;if(!r||r<=0)throw new Error(p("rootValue must be greater than 0"));if(!i||!i.length)throw new Error(p("distinctDevice needed"));function t(){let o=document.documentElement.clientWidth,m=i[i.length-1],a=i.find(u=>typeof u.isDevice=="boolean"?u.isDevice:u.isDevice(o))||m;if(a.deviceWidthRange.length!==2)throw new Error(p("deviceWidthRange length must be 2"));if(a)o>=a.deviceWidthRange[1]?o=a.deviceWidthRange[1]:o<=a.deviceWidthRange[0]&&(o=a.deviceWidthRange[0]),document.documentElement&&(document.documentElement.style.fontSize=`${o/a.UIWidth*r}px`);else throw new Error(p("no device matched"))}t();function c(){return n?.type==="debounce"?L(n.delay,t,n.options):n?.type==="throttle"?E(n.delay,t,n.options):t}window.addEventListener("resize",c()),window.addEventListener("pageshow",o=>{o.persisted&&c()()}),window.addEventListener("DOMContentLoaded",c()),window.addEventListener("pushState",c())}$({distinctDevice:[{isDevice:e=>e<750,UIWidth:375,deviceWidthRange:[375,750]},{isDevice:e=>e>=750,UIWidth:1920,deviceWidthRange:[1080,1920]}]});})();