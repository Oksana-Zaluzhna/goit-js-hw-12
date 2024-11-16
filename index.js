import{a as v,i as w,S as L}from"./assets/vendor-D73Uttp0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const S="https://pixabay.com/api/",q="47094803-b94033d9110faf4ab5c097a20";async function f(s,t,a){return(await v.get(S,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a,page:t}})).data}function m(s){return s.map(({webformatURL:t,largeImageURL:a,tags:i,likes:e,views:r,comments:l,downloads:b})=>`<li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${i}"
              width="360"
            />
          </a>
          <div class="gallery-info">
            <div class="gallery-info-item">
              <h2 class="tittle">Likes</h2>
              <p class="amount">${e}</p>
            </div>
            <div class="gallery-info-item">
              <h2 class="tittle">Views</h2>
              <p class="amount">${r}</p>
            </div>
            <div class="gallery-info-item">
              <h2 class="tittle">Comments</h2>
              <p class="amount">${l}</p>
            </div>
            <div class="gallery-info-item">
              <h2 class="tittle">Downloads</h2>
              <p class="amount">${b}</p>
            </div>
          </div>
        </li>`).join("")}function c(s){w.error({title:"",message:s,position:"topRight"})}const h=document.querySelector(".search-form"),M=document.querySelector('input[name="query"]'),u=document.querySelector(".gallery"),n=document.querySelector(".loader"),o=document.querySelector(".load-more");h.addEventListener("submit",P);o.addEventListener("click",$);o.style.display="none";n.style.display="none";const p=15;let y=1,d="",g=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});async function P(s){if(s.preventDefault(),y=1,u.innerHTML="",n.style.display="block",o.style.display="none",d=M.value.trim(),!d){c("Please enter a search query!"),o.style.display="none",n.style.display="none";return}try{const t=await f(d,y,p);if(!t.hits.length){c("Sorry, there are no images matching your search query. Please try again!"),n.style.display="none";return}t.hits.length<15?o.style.display="none":o.style.display="block",u.insertAdjacentHTML("beforeend",m(t.hits)),g.refresh()}catch{c("Sorry, but something went wrong!")}finally{n.style.display="none",h.reset()}}async function $(){y+=1;try{o.style.display="none",n.style.display="block";const s=await f(d,y,p);u.insertAdjacentHTML("beforeend",m(s.hits)),g.refresh();const t=document.querySelector(".gallery-item");if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,left:0,behavior:"smooth"})}s.totalHits<=Math.ceil(y*p)?(o.style.display="none",c("We're sorry, but you've reached the end of search results.")):o.style.display="block"}catch{c("Sorry, but something went wrong!")}finally{n.style.display="none"}}
//# sourceMappingURL=index.js.map
