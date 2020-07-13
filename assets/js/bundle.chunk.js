(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{145:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return g}));n(163),n(166);var s=n(21),o=n.n(s),a=n(82),i=n.n(a),r=(n(114),n(146)),c=n.n(r),u=n(147),l=n.n(u),d=n(22),p=n.n(d),h=n(50),f=n.n(h),v=n(83),m=n(16),g=function t(){var n=this;f()(this,t),this.setSortValue=function(e){n.state=p()(p()({},n.state),{sortValue:e,defaultValue:!1,page:1}),Object(m.a)(),n.setRepos()},this.setLanguageValue=function(e){n.state=p()(p()({},n.state),{languageValue:e,defaultValue:!1,page:1}),Object(m.a)(),n.setRepos()},this.setTextValue=function(e){n.state=p()(p()({},n.state),{textValue:e,defaultValue:!1,page:1}),Object(m.a)(),n.setRepos()},this.createLoaders=function(){n.searchAmountBlock.classList.add("state-loading"),Object(m.e)()},this.removeLoaders=function(){n.searchAmountBlock.classList.remove("state-loading"),Object(m.e)()},this.setRepos=function(){n.createLoaders();var e=n.createLink();n.getRepos(e).then((function(e){if(e.message)return n.showError(e.message),!1;0===l()(e.total_count,10)&&n.showError('We couldn\u2019t find any repositories matching "'.concat(n.state.textValue,'"')),n.createSearchAmount(e.total_count),Object(m.b)(e.items),n.removeLoaders()})).catch((function(e){n.showError(e.message)}))},this.getRepos=function(){var e=c()(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((n=e.sent).ok){e.next=5;break}throw new Error("Oops! Something went wrong");case 5:return e.next=7,n.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.getNextPage=function(e,t){e[0].isIntersecting&&(n.state.page+=1,n.setRepos())},this.createLink=function(){var e,t,s;return o()(e=o()(t=o()(s="https://api.github.com/search/repositories?q=".concat(""!==n.state.textValue?n.state.textValue:"stars:10000..400000"," sort:")).call(s,n.state.sortValue," language:")).call(t,n.state.languageValue,"&page=")).call(e,n.state.page,"&per_page=20")},this.createSearchAmount=function(e){var t;n.searchAmountBlock.textContent=o()(t="".concat(e," ")).call(t,"repository results")},this.showError=function(e){Object(m.c)(e),n.removeLoaders()},this.searchInputObserve=function(t){n.delayTimer&&clearTimeout(n.delayTimer),n.delayTimer=e.setTimeout((function(){var e=t.target;n.setTextValue(e.value)}),n.delayCounter)},this.init=function(){n.setRepos(),Object(m.d)(n.getNextPage),n.searchInput.addEventListener("input",n.searchInputObserve)},this.searchInput=document.querySelector("#searchInput"),this.sortSelect=new v.a("#sortSelect",{name:"sort",defaultValue:"stars-desc",onChoice:this.setSortValue}),this.languagesSelect=new v.a("#languagesSelect",{name:"languages",defaultValue:"all",onChoice:this.setLanguageValue}),this.searchAmountBlock=document.querySelector(".search-amount"),this.delayCounter=1e3,this.delayTimer=null,this.state={textValue:"",sortValue:this.sortSelect.getValue(),languageValue:this.languagesSelect.getValue(),defaultValue:!0,page:1},this.init()}}).call(this,n(51))},153:function(e,t,n){},154:function(e,t,n){},155:function(e,t,n){},156:function(e,t,n){},157:function(e,t,n){},158:function(e,t,n){},159:function(e,t,n){},16:function(e,t,n){"use strict";n.d(t,"b",(function(){return m})),n.d(t,"a",(function(){return g})),n.d(t,"c",(function(){return O})),n.d(t,"d",(function(){return b})),n.d(t,"e",(function(){return E}));var s=n(19),o=n.n(s),a=function(e,t,n){var s=window.document.createElement(e);return t=t||"",n=n||"",s.className=t,void 0!==n&&(s.textContent=n),s},i=(n(249),n(256),n(138),n(152)),r=n.n(i),c=function(e,t){var n=a("div","repo-item__avatar"),s=a("img","repo-item__avatar-image");return s.setAttribute("src",e),s.setAttribute("alt",t),n.appendChild(s),n},u=function(e,t,n,s,o,i){var c=a("div","repo-item__info"),u=a("h3","repo-item__header",e);u.setAttribute("title",e);var d=a("p","repo-item__description","".concat(t&&r()(t).call(t,0,100),"...")),p=l([{label:"stars: ",amount:n},{label:"watchers: ",amount:s},{label:"size: ",amount:o},{label:"language: ",amount:i}]);return c.appendChild(u),c.appendChild(d),c.appendChild(p),c},l=function(e){var t=a("ul","repo-item__params-list");return o()(e).call(e,(function(e){var n=d(e.label,e.amount);t.appendChild(n)})),t},d=function(e,t){var n=a("li","repo-item__params-item");if(!t)return n;var s=a("span","repo-item__params-label",e),o=a("span","repo-item__params-amount",t);return n.appendChild(s),n.appendChild(o),n},p=function(e){var t=a("a","repo-item__link");return t.setAttribute("href",e),t.setAttribute("title","github page"),t.setAttribute("rel","noreferrer noopener"),t.setAttribute("target","blank"),t.insertAdjacentHTML("afterbegin",'<svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>'),t},h=document.querySelector(".result-list"),f=null,v=null,m=function(e){var t=window.document.createDocumentFragment();o()(e).call(e,(function(e){var n=function(e){var t=a("div","repo-item"),n=c(e.owner.avatar_url,e.name),s=u(e.full_name,e.description,e.stargazers_count,e.watchers_count,e.size,e.language),o=p(e.html_url);return t.appendChild(n),t.appendChild(s),t.appendChild(o),t}(e);t.appendChild(n)})),h.appendChild(t),w()},g=function(){!function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(h)},b=function(e){f=new IntersectionObserver(e,{root:null,rootMargin:"0px",threshold:.1})},w=function(){var e=document.querySelector(".repo-item:last-child");f&&f.observe(e),v&&f.unobserve(v),v=e},O=function(e){g();var t=a("div","result-list__message",e);h.appendChild(t)},E=function(){document.querySelector(".result-section__preloader").classList.toggle("state-visible")}},160:function(e,t,n){},161:function(e,t,n){},162:function(e,t,n){},261:function(e,t,n){},263:function(e,t,n){"use strict";n.r(t);n(153),n(154),n(155),n(156),n(157),n(158),n(159),n(160),n(161),n(162);var s=n(145),o=0,a=document.querySelector(".search-section__inner"),i=document.querySelector(".search-section"),r=function(){i.style.height="".concat(i.offsetHeight,"px");var e=window.pageYOffset;e>o?document.body.classList.remove("down-search"):document.body.classList.add("down-search"),o=e<=0?0:e,window.pageYOffset>400?(document.body.classList.add("hide-search"),a.style.position="fixed"):(document.body.classList.remove("hide-search"),a.style.position="relative")};new s.a,document.addEventListener("scroll",r);n(261);n(262).install()},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));n(138);var s=n(21),o=n.n(s),a=n(148),i=n.n(a),r=n(149),c=n.n(r),u=n(19),l=n.n(u),d=n(50),p=n.n(d),h=n(150),f=n.n(h),v=n(151),m=n.n(v)()({TAB:9,ENTER:13,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40}),g=function(){function e(t,n){var s=this;p()(this,e),this.checkOpened=function(e){"keydown"!==e.type?s.state.opened?s.close():s.open():s.checkKeyPress(e)},this.open=function(){s.registerEvents(),s.select.classList.add(s.openDropdownClass),s.dropdown.focus(),s.state.opened=!0,s.selectButton.setAttribute("aria-expanded","true")},this.close=function(){s.unRegisterEvents(),s.select.classList.remove(s.openDropdownClass),s.unFocusedOption(),s.state.opened=!1,s.focusedIndex=0,s.selectButton.setAttribute("aria-expanded","false")},this.registerEvents=function(){var e;document.dispatchEvent(new CustomEvent("openSelect",{detail:{name:s.params.name}})),document.addEventListener("openSelect",s.close),s.dropdown.addEventListener("keydown",s.checkKeyPress),s.dropdown.addEventListener("blur",s.close),s.dropdown.addEventListener("mouseleave",s.unFocusedOption),l()(e=s.options).call(e,(function(e){e.addEventListener("mouseenter",s.hoveredOption),e.addEventListener("click",s.clickedOption)}))},this.unRegisterEvents=function(){var e;document.removeEventListener("openSelect",s.close),s.dropdown.removeEventListener("keydown",s.checkKeyPress),s.dropdown.removeEventListener("blur",s.close),s.dropdown.removeEventListener("blur",s.close),l()(e=s.options).call(e,(function(e){e.removeEventListener("mouseenter",s.hoveredOption),e.removeEventListener("click",s.clickedOption)}))},this.checkKeyPress=function(e){switch(e.keyCode){case m.ESC:e.preventDefault(),s.selectButton.focus(),s.close();break;case m.PAGE_DOWN:case m.DOWN:e.preventDefault(),s.state.opened?s.moveDown():(s.open(),s.moveStart());break;case m.PAGE_UP:case m.UP:e.preventDefault(),s.state.opened||s.open(),s.moveUp();break;case m.HOME:s.focusedOption(s.options[0]);break;case m.END:s.focusedOption(s.options[s.options.length-1]);break;case m.SPACE:s.open(),s.moveStart();break;case m.ENTER:s.state.opened?(s.choiceOption(s.options[s.focusedIndex]),s.close()):(s.open(),s.moveStart())}},this.focusedOption=function(e){var t;s.options[s.focusedIndex].removeAttribute("aria-selected"),s.options[s.focusedIndex].classList.remove(s.hoverOptionClass),e.classList.add(s.hoverOptionClass),e.setAttribute("aria-selected","true"),s.focusedIndex=c()(t=i()(s.options)).call(t,e)},this.unFocusedOption=function(){s.options[s.focusedIndex].classList.remove(s.hoverOptionClass)},this.choiceOption=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e.textContent,o=e.dataset.value;s.state.value=o||n,s.valueTitle.textContent=n,s.currentOption&&s.currentOption.classList.remove("state-active"),s.currentOption=e,e.classList.add("state-active"),s.dropdown.setAttribute("aria-activedescendant",e.getAttribute("id")),s.params.onChoice&&t&&s.params.onChoice(s.state.value,s.params.name,s.valueTitle.textContent)},this.getValue=function(){return s.state.value},this.moveStart=function(){s.focusedOption(s.options[0])},this.moveUp=function(){var e=s.focusedIndex-1;e<0?s.focusedOption(s.options[s.options.length-1]):s.focusedOption(s.options[e])},this.moveDown=function(){var e=s.focusedIndex+1;e>s.options.length-1?s.focusedOption(s.options[0]):s.focusedOption(s.options[e])},this.hoveredOption=function(e){var t=e.currentTarget;s.focusedOption(t)},this.clickedOption=function(e){s.choiceOption(e.currentTarget)},this.fixFocus=function(e){e.preventDefault()},this.setAttributes=function(){var e;s.label.setAttribute("id",s.labelId),s.selectButton.setAttribute("aria-labelledby",s.labelId),s.dropdown.setAttribute("aria-labelledby",s.labelId),l()(e=s.options).call(e,(function(e){var t;e.setAttribute("id",o()(t="".concat(s.params.name,"-")).call(t,e.dataset.value))}))},this.setDefaultValue=function(){var e=s.dropdown.querySelector(".select-item[data-value='".concat(s.params.defaultValue,"']"));s.choiceOption(e,!1)},this.select="string"===typeof t?document.querySelector(t):t,this.params=n,this.selectButton=this.select.querySelector(".select-button"),this.label=this.select.querySelector(".select-label"),this.valueTitle=this.select.querySelector(".select-button__title"),this.dropdown=this.select.querySelector(".select-dropdown"),this.options=this.select.querySelectorAll(".select-item"),this.currentOption=null,this.focusedIndex=0,this.state={opened:!1,value:!1},this.labelId="".concat(this.params.name,"-label"),this.openDropdownClass="state-opened",this.hoverOptionClass="state-hovered",this.focusOptionClass="state-focused",this.init()}return f()(e,[{key:"init",value:function(){this.selectButton.addEventListener("click",this.checkOpened),this.selectButton.addEventListener("keydown",this.checkOpened),this.select.addEventListener("mousedown",this.fixFocus),this.setAttributes(),this.params.defaultValue&&this.setDefaultValue()}}]),e}()}},[[263,7,3,2,1,4,5,6]]]);