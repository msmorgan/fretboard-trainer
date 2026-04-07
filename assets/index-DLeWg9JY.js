(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:ee,getOwnPropertyNames:te,getOwnPropertySymbols:ne,getPrototypeOf:re}=Object,d=globalThis,ie=d.trustedTypes,ae=ie?ie.emptyScript:``,oe=d.reactiveElementPolyfillSupport,f=(e,t)=>e,p={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},m=(e,t)=>!l(e,t),se={attribute:!0,type:String,converter:p,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol(`metadata`),d.litPropertyMetadata??=new WeakMap;var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ee(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(f(`elementProperties`)))return;let e=re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f(`properties`))){let e=this.properties,t=[...te(e),...ne(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?p:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?p:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??m)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[f(`elementProperties`)]=new Map,h[f(`finalized`)]=new Map,oe?.({ReactiveElement:h}),(d.reactiveElementVersions??=[]).push(`2.1.2`);var ce=globalThis,le=e=>e,g=ce.trustedTypes,ue=g?g.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,de=`$lit$`,_=`lit$${Math.random().toFixed(9).slice(2)}$`,fe=`?`+_,pe=`<${fe}>`,v=document,y=()=>v.createComment(``),b=e=>e===null||typeof e!=`object`&&typeof e!=`function`,x=Array.isArray,me=e=>x(e)||typeof e?.[Symbol.iterator]==`function`,S=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ge=/>/g,w=RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),_e=/'/g,ve=/"/g,ye=/^(?:script|style|textarea|title)$/i,be=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),T=be(1),E=be(2),D=Symbol.for(`lit-noChange`),O=Symbol.for(`lit-nothing`),xe=new WeakMap,k=v.createTreeWalker(v,129);function Se(e,t){if(!x(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ue===void 0?t:ue.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=C;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===C?c[1]===`!--`?o=he:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=w):(ye.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=w):o=ge:o===w?c[0]===`>`?(o=i??C,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?w:c[3]===`"`?ve:_e):o===ve||o===_e?o=w:o===he||o===ge?o=C:(o=w,i=void 0);let ee=o===w&&e[t+1].startsWith(`/>`)?` `:``;a+=o===C?n+pe:l>=0?(r.push(s),n.slice(0,l)+de+n.slice(l)+_+ee):n+_+(l===-2?t:ee)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},A=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),k.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=k.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(de)){let t=u[o++],n=i.getAttribute(e).split(_),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ee:r[1]===`?`?De:r[1]===`@`?Oe:M}),i.removeAttribute(e)}else e.startsWith(_)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ye.test(i.tagName)){let e=i.textContent.split(_),t=e.length-1;if(t>0){i.textContent=g?g.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],y()),k.nextNode(),c.push({type:2,index:++a});i.append(e[t],y())}}}else if(i.nodeType===8)if(i.data===fe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(_,e+1))!==-1;)c.push({type:7,index:a}),e+=_.length-1}a++}}static createElement(e,t){let n=v.createElement(`template`);return n.innerHTML=e,n}};function j(e,t,n=e,r){if(t===D)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=b(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=j(e,i._$AS(e,t.values),i,r)),t}var we=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??v).importNode(t,!0);k.currentNode=r;let i=k.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Te(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ke(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=k.nextNode(),a++)}return k.currentNode=v,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Te=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),b(e)?e===O||e==null||e===``?(this._$AH!==O&&this._$AR(),this._$AH=O):e!==this._$AH&&e!==D&&this._(e):e._$litType$===void 0?e.nodeType===void 0?me(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==O&&b(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=A.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new we(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new A(e)),t}k(t){x(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(y()),this.O(y()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=le(e).nextSibling;le(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=O,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=O}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=j(this,e,t,0),a=!b(e)||e!==this._$AH&&e!==D,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=j(this,r[n+o],t,o),s===D&&(s=this._$AH[o]),a||=!b(s)||s!==this._$AH[o],s===O?e=O:e!==O&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ee=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===O?void 0:e}},De=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==O)}},Oe=class extends M{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??O)===D)return;let n=this._$AH,r=e===O&&n!==O||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==O&&(n===O||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}},Ae=ce.litHtmlPolyfillSupport;Ae?.(A,Te),(ce.litHtmlVersions??=[]).push(`3.3.2`);var je=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Te(t.insertBefore(y(),e),e,void 0,n??{})}return i._$AI(e),i},N=globalThis,P=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=je(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};P._$litElement$=!0,P.finalized=!0,N.litElementHydrateSupport?.({LitElement:P});var Me=N.litElementPolyfillSupport;Me?.({LitElement:P}),(N.litElementVersions??=[]).push(`4.2.2`);var F=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Ne={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},Pe=(e=Ne,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function I(e){return(t,n)=>typeof n==`object`?Pe(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function L(e){return I({...e,state:!0,attribute:!1})}var Fe=[`C`,`C♯`,`D`,`D♯`,`E`,`F`,`F♯`,`G`,`G♯`,`A`,`A♯`,`B`],Ie=[`C`,`D♭`,`D`,`E♭`,`E`,`F`,`G♭`,`G`,`A♭`,`A`,`B♭`,`B`],Le=[`C`,`C♯/D♭`,`D`,`D♯/E♭`,`E`,`F`,`F♯/G♭`,`G`,`G♯/A♭`,`A`,`A♯/B♭`,`B`];function Re(e,t){return(e+t)%12}function ze(e){return 440*2**((e-69)/12)}function Be(e){let t=12*Math.log2(e/440)+69,n=Math.round(t);return{midi:n,cents:(t-n)*100}}var Ve=[64,59,55,50,45,40],He=Ve.map(e=>e%12),Ue=[`high E`,`B`,`G`,`D`,`A`,`low E`];function R(e){let t=e.string-1,n=Ve[t]+e.fret;return{pitchClass:Re(He[t],e.fret),midi:n,octave:Math.floor(n/12)-1,frequency:ze(n)}}function z(e){return 1-1/2**(e/12)}function We(e){let t=[];for(let n=1;n<=e;n++)t.push(z(n));return t}function B(e){return e===0?-.015:(z(e)+(e>1?z(e-1):0))/2}var Ge=[3,5,7,9,15,17,19,21],Ke=[12,24],V=1e3,H=980,qe=H-30,Je=160;function Ye(e,t){if(!t)return H;let n=z(e);return n<=0?H:30+qe*.97/n}function Xe(e){switch(e){case`horizontal`:return 0;case`vertical`:return 90;case`classical`:return 55}}V/2;function Ze(e){if(e===`horizontal`)return{x:-5,y:0,w:V+10,h:200};let t=Xe(e)*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=[{x:-5,y:-5},{x:V+5,y:-5},{x:V+5,y:205},{x:-5,y:205}],a=1/0,o=1/0,s=-1/0,c=-1/0;for(let e of i){let t=e.x-500,i=e.y-100,l=500+t*n+i*r,u=100-t*r+i*n;a=Math.min(a,l),o=Math.min(o,u),s=Math.max(s,l),c=Math.max(c,u)}return{x:Math.floor(a-10),y:Math.floor(o-10),w:Math.ceil(s-a+20),h:Math.ceil(c-o+20)}}function U(e,t=H){return 30+e*(t-30)}function W(e){let t=Je/5;return 20+(e-1)*t}function Qe(){return E`
    <line class="nut"
      x1="${30}" y1="${15}"
      x2="${30}" y2="${185}"
      stroke="var(--color-nut)" stroke-width="4" />
  `}function $e(e,t=H){return E`
    ${We(e).map((e,n)=>E`
      <line class="fret"
        x1="${U(e,t)}" y1="${18}"
        x2="${U(e,t)}" y2="${182}"
        stroke="var(--color-fret)" stroke-width="${n===0?2:1.5}"
        data-fret="${n+1}" />
    `)}
  `}function et(e=H){return E`
    ${Array.from({length:6},(e,t)=>t+1).map(t=>{let n=W(t);return E`
        <line class="string"
          x1="${30}" y1="${n}"
          x2="${e}" y2="${n}"
          stroke="var(--color-string)" stroke-width="${.5+(t-1)*.3}"
          data-string="${t}" />
      `})}
  `}function tt(e,t=H){let n=Je/6;return E`
    ${Ge.filter(t=>t<=e).map(e=>E`
        <circle class="fret-marker" cx="${U(B(e),t)}" cy="${100}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
      `)}
    ${Ke.filter(t=>t<=e).map(e=>{let r=U(B(e),t);return E`
        <circle class="fret-marker" cx="${r}" cy="${100-n}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
        <circle class="fret-marker" cx="${r}" cy="${100+n}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
      `})}
  `}function nt(e,t=0,n=H){return E`
    ${[...Ge,...Ke].filter(t=>t<=e).map(e=>{let r=U(B(e),n),i=t?`rotate(${t}, ${r}, 197)`:``;return E`
        <text class="fret-number" x="${r}" y="${197}"
          text-anchor="middle" fill="var(--color-fret-number)"
          font-size="9" font-family="sans-serif"
          ${i?E`transform="${i}"`:E``}>${e}</text>
      `})}
  `}function rt(e=0){return E`
    ${[`E`,`B`,`G`,`D`,`A`,`E`].map((t,n)=>{let r=W(n+1)+4,i=e?`rotate(${e}, 4, ${r})`:``;return E`
        <text class="string-label" x="${4}" y="${r}"
          text-anchor="middle" fill="var(--color-string-label)"
          font-size="11" font-family="sans-serif" font-weight="bold"
          ${i?E`transform="${i}"`:E``}>${t}</text>
      `})}
  `}function it(e,t=H){let n=[],r=Je/5,i=r/2,a=We(e);for(let o=1;o<=6;o++)for(let s=0;s<=e;s++){let e=W(o),c,l;if(s===0)l=28,c=30-l;else{let e=s>1?U(a[s-2],t):30,n=U(a[s-1],t);c=e,l=n-e}n.push({string:o,fret:s,x:c,y:e-i,width:l,height:r})}return n}function at(e,t,n=H){return E`
    ${it(e,n).map(e=>E`
      <rect class="hit-target"
        x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}"
        fill="transparent" cursor="pointer"
        data-string="${e.string}" data-fret="${e.fret}"
        @click="${()=>t(e.string,e.fret)}" />
    `)}
  `}function ot(e,t,n=`var(--color-highlight)`,r=H){return E`
    <circle class="highlight" cx="${U(B(t),r)}" cy="${W(e)}" r="10"
      fill="${n}" opacity="0.9">
    </circle>
  `}function st(e,t,n,r=`var(--color-highlight)`,i=H){let a=U(B(t),i),o=W(e);return E`
    <circle class="highlight" cx="${a}" cy="${o}" r="12"
      fill="${r}" opacity="0.9" />
    <text x="${a}" y="${o+4}" text-anchor="middle"
      fill="var(--color-bg)" font-size="10" font-weight="bold"
      font-family="sans-serif">${n}</text>
  `}function ct(e){if(e<.5){let t=e/.5;return`rgba(248, ${Math.round(113+t*74)}, ${Math.round(113-t*77)}, 0.5)`}if(e<.75){let t=(e-.5)/.25;return`rgba(${Math.round(248-t*7)}, ${Math.round(187+t*4)}, ${Math.round(36+t*0)}, 0.45)`}let t=(e-.75)/.25;return`rgba(${Math.round(241-t*167)}, ${Math.round(191+t*31)}, ${Math.round(36+t*92)}, 0.4)`}var lt=3;function ut(e,t,n){let r=[];for(let i=1;i<=6;i++)for(let a=0;a<=t;a++){if(e.attempts(i,a)<lt)continue;let t=e.accuracy(i,a);if(t===null)continue;let o=U(B(a),n),s=W(i),c=ct(t);r.push(E`
        <circle cx="${o}" cy="${s}" r="9"
          fill="${c}" class="heatmap-dot" />
      `)}return E`<g class="heatmap">${r}</g>`}function G(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var K=class extends P{constructor(...e){super(...e),this.maxFret=12,this.interactive=!1,this.orientation=`horizontal`,this.highlightString=null,this.highlightFret=null,this.highlightLabel=null,this.highlightColor=`var(--color-highlight)`,this.feedbackString=null,this.feedbackFret=null,this.feedbackColor=null,this.tracker=null,this.showHeatmap=!1}static{this.styles=o`
    :host {
      display: block;
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
    }

    :host([orientation="vertical"]) {
      max-width: 280px;
    }

    :host([orientation="classical"]) {
      max-width: 700px;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .highlight {
      transition: opacity 0.2s ease;
    }

    .hit-target:hover {
      fill: rgba(255, 255, 255, 0.05);
    }
  `}_handleClick(e,t){this.dispatchEvent(new CustomEvent(`fret-click`,{detail:{string:e,fret:t},bubbles:!0,composed:!0}))}render(){let e=Xe(this.orientation),t=Ze(this.orientation),n=e===0?0:-e,r=this.orientation!==`classical`,i=Ye(this.maxFret,r),a=E`
      ${tt(this.maxFret,i)}
      ${$e(this.maxFret,i)}
      ${Qe()}
      ${et(i)}
      ${rt(n)}
      ${nt(this.maxFret,n,i)}
      ${this.showHeatmap&&this.tracker?ut(this.tracker,this.maxFret,i):E``}
      ${this._renderHighlights(i)}
      ${this.interactive?at(this.maxFret,(e,t)=>this._handleClick(e,t),i):E``}
    `;return T`
      <svg viewBox="${t.x} ${t.y} ${t.w} ${t.h}"
           xmlns="http://www.w3.org/2000/svg">
        ${e===0?a:E`<g transform="rotate(${e}, ${500}, ${100})">${a}</g>`}
      </svg>
    `}_renderHighlights(e){let t=[];return this.highlightString!=null&&this.highlightFret!=null&&(this.highlightLabel?t.push(st(this.highlightString,this.highlightFret,this.highlightLabel,this.highlightColor,e)):t.push(ot(this.highlightString,this.highlightFret,this.highlightColor,e))),this.feedbackString!=null&&this.feedbackFret!=null&&this.feedbackColor&&t.push(ot(this.feedbackString,this.feedbackFret,this.feedbackColor,e)),E`${t}`}};G([I({type:Number})],K.prototype,`maxFret`,void 0),G([I({type:Boolean})],K.prototype,`interactive`,void 0),G([I({reflect:!0})],K.prototype,`orientation`,void 0),G([I({type:Number})],K.prototype,`highlightString`,void 0),G([I({type:Number})],K.prototype,`highlightFret`,void 0),G([I({attribute:!1})],K.prototype,`highlightLabel`,void 0),G([I()],K.prototype,`highlightColor`,void 0),G([I({type:Number})],K.prototype,`feedbackString`,void 0),G([I({type:Number})],K.prototype,`feedbackFret`,void 0),G([I()],K.prototype,`feedbackColor`,void 0),G([I({attribute:!1})],K.prototype,`tracker`,void 0),G([I({type:Boolean})],K.prototype,`showHeatmap`,void 0),K=G([F(`fretboard-view`)],K);var dt=[0,2,4,5,7,9,11],ft={1:.95,3:2.05,6:3.9,8:5,10:6.1},pt=[1,3,6,8,10],q=class extends P{constructor(...e){super(...e),this.notes=[],this.disabled=!1,this.selectedPC=null,this.correctPC=null,this.showResult=!1}static{this.styles=o`
    :host {
      display: block;
    }

    .piano {
      position: relative;
      max-width: 420px;
      margin: 0 auto;
      height: 96px;
    }

    .white-keys {
      display: flex;
      gap: 3px;
      height: 100%;
    }

    .key {
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      transition: all 0.12s ease;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 8px;
    }

    .key:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .key.white {
      flex: 1;
      height: 100%;
      background: #e8e6ec;
      color: #1a1d27;
      font-size: 0.85rem;
      border-radius: 0 0 5px 5px;
      border: 1px solid #bbb;
      border-top: none;
    }

    .key.white:hover:not(:disabled) {
      background: #fff;
    }

    .key.black {
      position: absolute;
      top: 0;
      width: 11%;
      height: 58%;
      background: #1a1d27;
      color: #c0b8cc;
      font-size: 0.7rem;
      border-radius: 0 0 4px 4px;
      border: 1px solid #333;
      border-top: none;
      z-index: 1;
      align-items: flex-end;
      padding-bottom: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      overflow: visible;
      white-space: nowrap;
      transform: translateX(-50%);
    }

    .key.black.dual {
      font-size: 0.6rem;
      line-height: 1.2;
      white-space: normal;
      text-align: center;
    }

    .key.black:hover:not(:disabled) {
      background: #2e3345;
    }

    /* ── Result states ── */

    .key.correct {
      background: var(--color-correct) !important;
      border-color: var(--color-correct) !important;
      color: var(--color-bg) !important;
    }

    .key.incorrect {
      background: var(--color-incorrect) !important;
      border-color: var(--color-incorrect) !important;
      color: var(--color-bg) !important;
    }

    .key.reveal {
      background: var(--color-correct) !important;
      border-color: var(--color-correct) !important;
      color: var(--color-bg) !important;
      opacity: 0.7;
    }
  `}_handleClick(e){this.disabled||this.dispatchEvent(new CustomEvent(`note-selected`,{detail:{pc:e,label:this.notes[e]},bubbles:!0,composed:!0}))}_resultClass(e){return this.showResult?e===this.selectedPC&&e===this.correctPC?`correct`:e===this.selectedPC&&e!==this.correctPC?`incorrect`:e===this.correctPC?`reveal`:``:``}render(){return this.notes.length<12?T``:T`
      <div class="piano">
        <div class="white-keys">
          ${dt.map(e=>T`
            <button class="key white ${this._resultClass(e)}"
              ?disabled=${this.disabled}
              @click=${()=>this._handleClick(e)}>
              ${this.notes[e]}
            </button>
          `)}
        </div>
        ${pt.map(e=>{let t=ft[e]/7*100,n=this.notes[e].split(`/`),r=n.length>1;return T`
            <button class="key black ${r?`dual`:``} ${this._resultClass(e)}"
              style="left: ${t}%"
              ?disabled=${this.disabled}
              @click=${()=>this._handleClick(e)}>
              ${r?T`${n[0]}<br>${n[1]}`:this.notes[e]}
            </button>
          `})}
      </div>
    `}};G([I({type:Array})],q.prototype,`notes`,void 0),G([I({type:Boolean})],q.prototype,`disabled`,void 0),G([I({type:Number})],q.prototype,`selectedPC`,void 0),G([I({type:Number})],q.prototype,`correctPC`,void 0),G([I({type:Boolean})],q.prototype,`showResult`,void 0),q=G([F(`note-buttons`)],q);var mt=class{constructor(){this._state=`idle`,this._currentPrompt=null,this._mode=null,this._config=null,this._listeners=[],this._resultTimeoutId=null}get state(){return this._state}get currentPrompt(){return this._currentPrompt}on(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_emit(e){for(let t of this._listeners)t(e)}_setState(e){this._state=e,this._emit({type:`state-change`,state:e})}start(e,t){this._mode=e,this._config=t,this._nextPrompt()}stop(){this._resultTimeoutId&&=(clearTimeout(this._resultTimeoutId),null),this._state=`idle`,this._currentPrompt=null,this._emit({type:`state-change`,state:`idle`})}submitAnswer(e,t){if(this._state!==`awaiting-input`||!this._currentPrompt)return;let n=t===void 0?e===this._currentPrompt.correctAnswer:t===this._currentPrompt.correctPC,r={correct:n,givenAnswer:e,correctAnswer:this._currentPrompt.correctAnswer,position:this._currentPrompt.position};this._setState(`showing-result`),this._emit({type:`answer-result`,result:r}),this._resultTimeoutId=setTimeout(()=>{this._resultTimeoutId=null,this._nextPrompt()},n?800:1500)}_nextPrompt(){if(!this._mode||!this._config)return;this._setState(`prompting`);let e=this._mode.generatePrompt(this._config);this._currentPrompt=e,this._emit({type:`new-prompt`,prompt:e}),this._setState(`awaiting-input`)}},J=`♯`,Y=`♭`;function X(e,t,n,r){let i={C:0,[`C${J}`]:1,[`D${Y}`]:1,D:2,[`D${J}`]:3,[`E${Y}`]:3,E:4,[`F${Y}`]:4,[`E${J}`]:5,F:5,[`F${J}`]:6,[`G${Y}`]:6,G:7,[`G${J}`]:8,[`A${Y}`]:8,A:9,[`A${J}`]:10,[`B${Y}`]:10,B:11,[`C${Y}`]:11},a=r?[...Fe]:[...Ie];for(let e of n){let t=i[e];t!==void 0&&(a[t]=e)}return{name:e,mode:t,spelling:a}}var ht=X(`C major`,`major`,[`C`,`D`,`E`,`F`,`G`,`A`,`B`],!0),gt=X(`G major`,`major`,[`G`,`A`,`B`,`C`,`D`,`E`,`F${J}`],!0),_t=X(`D major`,`major`,[`D`,`E`,`F${J}`,`G`,`A`,`B`,`C${J}`],!0),vt=X(`A major`,`major`,[`A`,`B`,`C${J}`,`D`,`E`,`F${J}`,`G${J}`],!0),yt=X(`E major`,`major`,[`E`,`F${J}`,`G${J}`,`A`,`B`,`C${J}`,`D${J}`],!0),bt=X(`B major`,`major`,[`B`,`C${J}`,`D${J}`,`E`,`F${J}`,`G${J}`,`A${J}`],!0);X(`F${J} major`,`major`,[`F${J}`,`G${J}`,`A${J}`,`B`,`C${J}`,`D${J}`,`E${J}`],!0);var xt=X(`F major`,`major`,[`F`,`G`,`A`,`B${Y}`,`C`,`D`,`E`],!1),St=X(`B${Y} major`,`major`,[`B${Y}`,`C`,`D`,`E${Y}`,`F`,`G`,`A`],!1),Ct=X(`E${Y} major`,`major`,[`E${Y}`,`F`,`G`,`A${Y}`,`B${Y}`,`C`,`D`],!1),wt=X(`A${Y} major`,`major`,[`A${Y}`,`B${Y}`,`C`,`D${Y}`,`E${Y}`,`F`,`G`],!1);X(`D${Y} major`,`major`,[`D${Y}`,`E${Y}`,`F`,`G${Y}`,`A${Y}`,`B${Y}`,`C`],!1),X(`G${Y} major`,`major`,[`G${Y}`,`A${Y}`,`B${Y}`,`C${Y}`,`D${Y}`,`E${Y}`,`F`],!1);var Tt=X(`A minor`,`minor`,[`A`,`B`,`C`,`D`,`E`,`F`,`G`],!1),Et=X(`E minor`,`minor`,[`E`,`F${J}`,`G`,`A`,`B`,`C`,`D`],!0),Dt=X(`B minor`,`minor`,[`B`,`C${J}`,`D`,`E`,`F${J}`,`G`,`A`],!0),Ot=X(`F${J} minor`,`minor`,[`F${J}`,`G${J}`,`A`,`B`,`C${J}`,`D`,`E`],!0);X(`C${J} minor`,`minor`,[`C${J}`,`D${J}`,`E`,`F${J}`,`G${J}`,`A`,`B`],!0),X(`G${J} minor`,`minor`,[`G${J}`,`A${J}`,`B`,`C${J}`,`D${J}`,`E`,`F${J}`],!0);var kt=X(`D minor`,`minor`,[`D`,`E`,`F`,`G`,`A`,`B${Y}`,`C`],!1),At=X(`G minor`,`minor`,[`G`,`A`,`B${Y}`,`C`,`D`,`E${Y}`,`F`],!1),jt=X(`C minor`,`minor`,[`C`,`D`,`E${Y}`,`F`,`G`,`A${Y}`,`B${Y}`],!1),Mt=X(`F minor`,`minor`,[`F`,`G`,`A${Y}`,`B${Y}`,`C`,`D${Y}`,`E${Y}`],!1);X(`B${Y} minor`,`minor`,[`B${Y}`,`C`,`D${Y}`,`E${Y}`,`F`,`G${Y}`,`A${Y}`],!1),X(`E${Y} minor`,`minor`,[`E${Y}`,`F`,`G${Y}`,`A${Y}`,`B${Y}`,`C${Y}`,`D${Y}`],!1);var Z=[ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt];function Q(e,t){return t.spelling[e]}function Nt(){return Z[Math.floor(Math.random()*Z.length)]}var Pt=class{constructor(){this.name=`Name the Note`}generatePrompt(e){let t=Math.floor(Math.random()*6)+1,n=Math.floor(Math.random()*(e.maxFret+1)),r=R({string:t,fret:n}),i=Q(r.pitchClass,e.key);return{position:{string:t,fret:n},text:`What note is this?`,correctAnswer:i,correctPC:r.pitchClass}}},Ft=class{constructor(){this.name=`Find the Fret`}generatePrompt(e){let t=Math.floor(Math.random()*6)+1,n=Math.floor(Math.random()*(e.maxFret+1)),r=R({string:t,fret:n}),i=Q(r.pitchClass,e.key),a=Ue[t-1];return{position:{string:t,fret:n},text:`Find ${i} on the ${a} string`,correctAnswer:`${t}-${n}`,correctPC:r.pitchClass}}},It=[0,2,4,5,7,9,11],Lt=class{constructor(){this.name=`Audio Challenge`,this.difficulty=`naturals`}generatePrompt(e){let t=Math.floor(Math.random()*6)+1,n,r=0;do{n=Math.floor(Math.random()*(e.maxFret+1));let i=R({string:t,fret:n});if(this._isAllowed(i.pitchClass))break;r++}while(r<100);let i=R({string:t,fret:n}),a=Q(i.pitchClass,e.key),o=Ue[t-1];return{position:{string:t,fret:n},text:`Play ${a} on the ${o} string`,correctAnswer:a,correctPC:i.pitchClass}}_isAllowed(e){switch(this.difficulty){case`naturals`:return It.includes(e);case`sharps-flats`:return!0;case`chromatic`:return!0;default:return!0}}static isCorrectPitch(e,t,n=50){let r=440*2**((t-69)/12),i=1200*Math.log2(e/r);return Math.abs(i)<=n}};function Rt(e,t){return`s${e}f${t}`}function zt(){return{positions:{},notes:{},totalCorrect:0,totalIncorrect:0,bestStreak:0}}var Bt=class{constructor(e){this._state=e??zt()}get state(){return this._state}record(e,t,n,r){let i=Rt(e,t);this._state.positions[i]||(this._state.positions[i]={correct:0,total:0}),this._state.positions[i].total++,r&&this._state.positions[i].correct++,this._state.notes[n]||(this._state.notes[n]={correct:0,total:0}),this._state.notes[n].total++,r&&this._state.notes[n].correct++,r?this._state.totalCorrect++:this._state.totalIncorrect++}updateBestStreak(e){e>this._state.bestStreak&&(this._state.bestStreak=e)}accuracy(e,t){let n=this._state.positions[Rt(e,t)];return!n||n.total===0?null:n.correct/n.total}attempts(e,t){return this._state.positions[Rt(e,t)]?.total??0}overallAccuracy(){let e=this._state.totalCorrect+this._state.totalIncorrect;return e===0?null:this._state.totalCorrect/e}weakSpots(e=5,t=10){let n=[];for(let[t,r]of Object.entries(this._state.positions)){if(r.total<e)continue;let i=t.match(/^s(\d+)f(\d+)$/);i&&n.push({string:parseInt(i[1]),fret:parseInt(i[2]),accuracy:r.correct/r.total})}return n.sort((e,t)=>e.accuracy-t.accuracy),n.slice(0,t)}reset(){this._state=zt()}},Vt=`fretboard-trainer-v1`;function Ht(){try{let e=localStorage.getItem(Vt);if(!e)return null;let t=JSON.parse(e);return t.version===1?t.stats:null}catch{return null}}function Ut(e){let t={version:1,stats:e,lastSessionDate:new Date().toISOString().slice(0,10)};try{localStorage.setItem(Vt,JSON.stringify(t))}catch{}}var Wt=.15;function Gt(e,t,n=Wt){let r=Math.floor(e.length/2),i=new Float32Array(r);for(let t=0;t<r;t++){let n=0;for(let i=0;i<r;i++){let r=e[i]-e[i+t];n+=r*r}i[t]=n}let a=new Float32Array(r);a[0]=1;let o=0;for(let e=1;e<r;e++)o+=i[e],a[e]=i[e]/(o/e);let s=Math.floor(t/1200),c=Math.floor(t/60),l=-1;for(let e=s;e<Math.min(c,r);e++)if(a[e]<n){for(;e+1<r&&a[e+1]<a[e];)e++;l=e;break}if(l===-1)return null;let u;if(l>0&&l<r-1){let e=a[l-1],t=a[l],n=a[l+1],r=(e-n)/(2*(e-2*t+n));u=l+(isFinite(r)?r:0)}else u=l;return{frequency:t/u,confidence:1-a[l]}}var Kt=class{constructor(){this._audioContext=null,this._analyser=null,this._stream=null,this._running=!1,this._rafId=null,this._callback=null,this._buffer=null}get running(){return this._running}onPitch(e){this._callback=e}async start(){if(this._running)return;let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}});this._stream=e,this._audioContext=new AudioContext;let t=this._audioContext.createMediaStreamSource(e);this._analyser=this._audioContext.createAnalyser(),this._analyser.fftSize=4096,this._analyser.smoothingTimeConstant=0,t.connect(this._analyser),this._buffer=new Float32Array(this._analyser.fftSize),this._running=!0,this._poll()}stop(){if(this._running=!1,this._rafId!=null&&(cancelAnimationFrame(this._rafId),this._rafId=null),this._stream){for(let e of this._stream.getTracks())e.stop();this._stream=null}this._audioContext&&=(this._audioContext.close(),null),this._analyser=null,this._buffer=null}_poll(){if(!this._running||!this._analyser||!this._buffer||!this._audioContext)return;this._analyser.getFloatTimeDomainData(this._buffer);let e=0;for(let t=0;t<this._buffer.length;t++){let n=Math.abs(this._buffer[t]);n>e&&(e=n)}if(e>.05){let e=Gt(this._buffer,this._audioContext.sampleRate);e&&this._callback&&this._callback(e)}else this._callback&&this._callback(null);this._rafId=requestAnimationFrame(()=>this._poll())}},$=class extends P{constructor(...e){super(...e),this._modeId=`name-the-note`,this._maxFret=12,this._key=Z[0],this._useRandomKey=!0,this._showHeatmap=!1,this._orientation=`horizontal`,this._prompt=null,this._lastResult=null,this._selectedPC=null,this._showResult=!1,this._score={correct:0,incorrect:0,streak:0},this._micActive=!1,this._detectedNote=``,this._detectedCents=0,this._audioDifficulty=`naturals`,this._engine=new mt,this._nameMode=new Pt,this._findMode=new Ft,this._audioMode=new Lt,this._tracker=new Bt(Ht()??void 0),this._mic=new Kt,this._stableCount=0,this._lastDetectedMidi=-1,this._awaitingSilence=!1}static{this.styles=o`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    header {
      text-align: center;
      padding: 1.5rem 1rem 0.5rem;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin: 0.25rem 0 0;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      flex-wrap: wrap;
    }

    .toolbar label {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .toolbar select {
      padding: 0.3rem 0.5rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 0.85rem;
      font-family: inherit;
    }

    .heatmap-toggle {
      padding: 0.3rem 0.6rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text-muted);
      font-size: 0.8rem;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    .heatmap-toggle[aria-pressed="true"] {
      background: var(--color-accent-dim);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .mode-selector {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      padding: 0.75rem 1rem;
      flex-wrap: wrap;
    }

    .mode-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      background: var(--color-surface);
      color: var(--color-text);
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .mode-btn:hover {
      border-color: var(--color-accent);
      background: var(--color-surface-hover);
    }

    .mode-btn[aria-pressed="true"] {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-bg);
      font-weight: 600;
    }

    .fretboard-container {
      padding: 0.5rem 1rem;
    }

    .controls {
      max-width: 960px;
      margin: 0 auto;
      padding: 1rem;
    }

    .prompt-text {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      min-height: 1.5em;
    }

    .result-text {
      text-align: center;
      font-size: 1rem;
      margin-top: 0.75rem;
      font-weight: 600;
      min-height: 1.5em;
    }

    .result-text.correct {
      color: var(--color-correct);
    }

    .result-text.incorrect {
      color: var(--color-incorrect);
    }

    .score-bar {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      padding: 0.5rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .score-bar .correct {
      color: var(--color-correct);
    }

    .score-bar .incorrect {
      color: var(--color-incorrect);
    }

    .score-bar .streak {
      color: var(--color-accent);
    }

    .find-fret-prompt {
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
      color: var(--color-accent);
      font-weight: 600;
    }

    .audio-controls {
      text-align: center;
    }

    .audio-prompt {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-accent);
      margin-bottom: 0.75rem;
    }

    .audio-status {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
    }

    .audio-status.listening {
      color: var(--color-correct);
    }

    .detected-note {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0.5rem 0;
      min-height: 2em;
    }

    .mic-btn {
      padding: 0.6rem 1.2rem;
      border: 1px solid var(--color-accent);
      border-radius: 6px;
      background: var(--color-accent-dim);
      color: var(--color-accent);
      font-size: 0.9rem;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    .mic-btn:hover {
      background: var(--color-accent);
      color: var(--color-bg);
    }

    .mic-btn.active {
      background: var(--color-incorrect);
      border-color: var(--color-incorrect);
      color: white;
    }

    .difficulty-selector {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 0.75rem;
    }

    .diff-btn {
      padding: 0.3rem 0.7rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text-muted);
      font-size: 0.8rem;
      cursor: pointer;
      font-family: inherit;
    }

    .diff-btn[aria-pressed="true"] {
      background: var(--color-accent-dim);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
  `}connectedCallback(){super.connectedCallback(),this._engine.on(e=>{if(e.type===`new-prompt`)this._prompt=e.prompt,this._lastResult=null,this._selectedPC=null,this._showResult=!1,this._detectedNote=``,this._detectedCents=0,this._stableCount=0,this._lastDetectedMidi=-1,this._awaitingSilence=!0;else if(e.type===`answer-result`){this._lastResult=e.result,this._showResult=!0,e.result.correct?this._score={...this._score,correct:this._score.correct+1,streak:this._score.streak+1}:this._score={...this._score,incorrect:this._score.incorrect+1,streak:0};let t=e.result.position,n=(this._useRandomKey,this._key),r=Q(R(t).pitchClass,n);this._tracker.record(t.string,t.fret,r,e.result.correct),this._tracker.updateBestStreak(this._score.streak),Ut(this._tracker.state),this.requestUpdate()}}),this._mic.onPitch(e=>{if(this._modeId!==`audio-challenge`||this._showResult||!this._prompt)return;if(e===null){this._awaitingSilence&&(this._awaitingSilence=!1,this._stableCount=0,this._lastDetectedMidi=-1);return}if(this._awaitingSilence)return;let{midi:t,cents:n}=Be(e.frequency),r=(this._useRandomKey,this._key);if(this._detectedNote=Q((t%12+12)%12,r),this._detectedCents=Math.round(n),t===this._lastDetectedMidi?this._stableCount++:(this._stableCount=1,this._lastDetectedMidi=t),this.requestUpdate(),this._stableCount>=12){let t=R(this._prompt.position);Lt.isCorrectPitch(e.frequency,t.midi)?this._engine.submitAnswer(this._prompt.correctAnswer):this._stableCount>=18&&this._engine.submitAnswer(this._detectedNote)}}),this._startGame()}disconnectedCallback(){super.disconnectedCallback(),this._mic.stop()}_startGame(){let e=this._useRandomKey?Nt():this._key;this._useRandomKey&&(this._key=e);let t;this._modeId===`find-the-fret`?t=this._findMode:this._modeId===`audio-challenge`?(this._audioMode.difficulty=this._audioDifficulty,t=this._audioMode):t=this._nameMode,this._score={correct:0,incorrect:0,streak:0},this._engine.start(t,{maxFret:this._maxFret,key:e})}_setMode(e){e!==this._modeId&&(this._engine.stop(),this._modeId===`audio-challenge`&&(this._mic.stop(),this._micActive=!1),this._modeId=e,this._startGame())}_handleNoteSelected(e){this._showResult||(this._selectedPC=e.detail.pc,this._engine.submitAnswer(e.detail.label,e.detail.pc))}_handleFretClick(e){if(this._showResult||this._modeId!==`find-the-fret`)return;let{string:t,fret:n}=e.detail;this._engine.submitAnswer(`${t}-${n}`)}_handleKeyChange(e){let t=e.target;t.value===`random`?this._useRandomKey=!0:(this._useRandomKey=!1,this._key=Z[parseInt(t.value)]),this._engine.stop(),this._startGame()}_toggleHeatmap(){this._showHeatmap=!this._showHeatmap}async _toggleMic(){this._micActive?(this._mic.stop(),this._micActive=!1):(await this._mic.start(),this._micActive=!0)}_setAudioDifficulty(e){this._audioDifficulty=e,this._audioMode.difficulty=e,this._engine.stop(),this._startGame()}_getNoteNames(){return this._useRandomKey?[...Le]:Array.from({length:12},(e,t)=>Q(t,this._key))}_displayName(e){return this._getNoteNames()[e]}_promptText(){if(!this._prompt)return``;if(!this._useRandomKey)return this._prompt.text;let e=this._displayName(this._prompt.correctPC);return this._prompt.text.replace(this._prompt.correctAnswer,e)}render(){return T`
      <header>
        <h1>Fretboard Trainer</h1>
        <p class="subtitle">Learn the notes on your guitar</p>
      </header>

      <div class="toolbar">
        <label for="key-select">Key:</label>
        <select id="key-select" @change=${this._handleKeyChange}>
          ${Z.map((e,t)=>T`<option value=${t} ?selected=${!this._useRandomKey&&this._key===e}>${e.name}</option>`)}
          <option value="random" ?selected=${this._useRandomKey}>Random</option>
        </select>

        <label for="fret-select">Frets:</label>
        <select id="fret-select" @change=${e=>{this._maxFret=parseInt(e.target.value),this._engine.stop(),this._startGame()}}>
          ${[12,15,17,19,20].map(e=>T`<option value=${e} ?selected=${e===this._maxFret}>${e}</option>`)}
        </select>

        <label for="orient-select">View:</label>
        <select id="orient-select" @change=${e=>{this._orientation=e.target.value}}>
          <option value="horizontal" ?selected=${this._orientation===`horizontal`}>Horizontal</option>
          <option value="vertical" ?selected=${this._orientation===`vertical`}>Vertical</option>
          <option value="classical" ?selected=${this._orientation===`classical`}>Classical</option>
        </select>

        <button class="heatmap-toggle"
          aria-pressed="${this._showHeatmap}"
          @click=${this._toggleHeatmap}>
          Heatmap
        </button>
      </div>

      <nav class="mode-selector">
        ${this._renderModeButton(`name-the-note`,`Name the Note`)}
        ${this._renderModeButton(`find-the-fret`,`Find the Fret`)}
        ${this._renderModeButton(`audio-challenge`,`Audio Challenge`)}
      </nav>

      <div class="score-bar">
        <span class="correct">${this._score.correct} correct</span>
        <span class="incorrect">${this._score.incorrect} wrong</span>
        <span class="streak">streak: ${this._score.streak}</span>
      </div>

      <div class="fretboard-container">
        <fretboard-view
          .maxFret=${this._maxFret}
          .interactive=${this._modeId===`find-the-fret`}
          .orientation=${this._orientation}
          .tracker=${this._tracker}
          .showHeatmap=${this._showHeatmap}
          .highlightString=${this._modeId===`name-the-note`&&this._prompt?this._prompt.position.string:null}
          .highlightFret=${this._modeId===`name-the-note`&&this._prompt?this._prompt.position.fret:null}
          .feedbackString=${this._showResult&&this._lastResult?this._lastResult.position.string:null}
          .feedbackFret=${this._showResult&&this._lastResult?this._lastResult.position.fret:null}
          .feedbackColor=${this._showResult&&this._lastResult?this._lastResult.correct?`var(--color-correct)`:`var(--color-incorrect)`:null}
          @fret-click=${this._handleFretClick}
        ></fretboard-view>
      </div>

      <div class="controls">
        ${this._renderControls()}
      </div>
    `}_renderControls(){return this._modeId===`name-the-note`?T`
        <p class="prompt-text">${this._promptText()}</p>
        <note-buttons
          .notes=${this._getNoteNames()}
          .disabled=${this._showResult}
          .selectedPC=${this._selectedPC}
          .correctPC=${this._showResult&&this._prompt?this._prompt.correctPC:null}
          .showResult=${this._showResult}
          @note-selected=${this._handleNoteSelected}
        ></note-buttons>
        ${this._renderResultText()}
      `:this._modeId===`find-the-fret`?T`
        <p class="find-fret-prompt">${this._promptText()}</p>
        ${this._renderResultText()}
      `:T`
      <div class="audio-controls">
        <p class="audio-prompt">${this._promptText()||`Starting...`}</p>

        <button class="mic-btn ${this._micActive?`active`:``}"
          @click=${this._toggleMic}>
          ${this._micActive?`Stop Listening`:`Start Listening`}
        </button>

        <p class="audio-status ${this._micActive?`listening`:``}">
          ${this._micActive?this._detectedNote?`Hearing: ${this._detectedNote} (${this._detectedCents>=0?`+`:``}${this._detectedCents}c)`:`Listening...`:`Click to start microphone`}
        </p>

        ${this._renderResultText()}

        <div class="difficulty-selector">
          ${this._renderDiffButton(`naturals`,`Naturals`)}
          ${this._renderDiffButton(`sharps-flats`,`+ Accidentals`)}
          ${this._renderDiffButton(`chromatic`,`Full Chromatic`)}
        </div>
      </div>
    `}_renderDiffButton(e,t){return T`
      <button class="diff-btn"
        aria-pressed="${this._audioDifficulty===e}"
        @click=${()=>this._setAudioDifficulty(e)}>
        ${t}
      </button>
    `}_renderResultText(){return!this._showResult||!this._lastResult?T`<p class="result-text">&nbsp;</p>`:this._lastResult.correct?T`<p class="result-text correct">Correct!</p>`:T`<p class="result-text incorrect">
      Wrong — it was ${this._prompt?this._displayName(this._prompt.correctPC):this._lastResult.correctAnswer}
    </p>`}_renderModeButton(e,t){return T`
      <button class="mode-btn"
        aria-pressed="${this._modeId===e}"
        @click=${()=>this._setMode(e)}>
        ${t}
      </button>
    `}};G([L()],$.prototype,`_modeId`,void 0),G([L()],$.prototype,`_maxFret`,void 0),G([L()],$.prototype,`_key`,void 0),G([L()],$.prototype,`_useRandomKey`,void 0),G([L()],$.prototype,`_showHeatmap`,void 0),G([L()],$.prototype,`_orientation`,void 0),G([L()],$.prototype,`_prompt`,void 0),G([L()],$.prototype,`_lastResult`,void 0),G([L()],$.prototype,`_selectedPC`,void 0),G([L()],$.prototype,`_showResult`,void 0),G([L()],$.prototype,`_score`,void 0),G([L()],$.prototype,`_micActive`,void 0),G([L()],$.prototype,`_detectedNote`,void 0),G([L()],$.prototype,`_detectedCents`,void 0),G([L()],$.prototype,`_audioDifficulty`,void 0),$=G([F(`app-shell`)],$);