(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4793fbca"],{"25dc":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("V-container",{attrs:{header:!1,"bg-color":"#ffa5a5"}},[t.end?t._e():s("div",{staticClass:"main-home"},[s("div",{staticClass:"chest"},[s("div",{staticClass:"chest-text"},[s("p",[t._v(t._s(t.tellText))])]),s("div",{staticClass:"heart left sided top"}),s("div",{staticClass:"heart center"}),s("div",{staticClass:"heart right sided"})]),t.tellText.length===t.tellTexts.length?s("div",{staticClass:"circle"},[s("div",{staticClass:"circle-text"},[t.tellText.length===t.tellTexts.length?s("p",{staticClass:"van-multi-ellipsis--l2"},[t._v(t._s(t.askText))]):t._e()]),s("div",{staticClass:"c-circle first"}),s("div",{staticClass:"c-circle second"}),s("div",{staticClass:"c-circle third"}),s("div",{staticClass:"c-circle four"})]):t._e(),s("transition",{attrs:{name:"van-fade"}},[t.askText.length===2*t.askTexts.length+1?s("div",{staticClass:"swipe-text"},[s("van-swipe",{staticStyle:{width:"100%",height:"30px"},attrs:{autoplay:"1350",vertical:"","show-indicators":!1},on:{change:t.onChange}},t._l(t.likeText,(function(e,n){return s("van-swipe-item",{key:n},[s("p",[t._v(t._s(e))])])})),1)],1):t._e()]),s("transition",{attrs:{name:"van-fade"}},[t.askText.length===2*t.askTexts.length+1&&2===t.current?s("div",{staticClass:"button-group"},[s("button",{staticClass:"btn",on:{click:t.yesBtn}},[t._v("好")]),s("button",{staticClass:"btn",on:{click:t.noBtn}},[t._v("不好")])]):t._e()])],1),t.end?s("div",{staticClass:"main-home",staticStyle:{"justify-content":"center"}},[s("div",{staticClass:"jump-text"},[s("span",[t._v("你")]),s("span",[t._v("好")]),s("span",[t._v("！")]),s("span",[t._v("女")]),s("span",[t._v("朋")]),s("span",[t._v("友")])]),s("div",{staticClass:"jump-text"},[s("span",[t._v("我")]),s("span",[t._v("是")]),s("span",[t._v("你")]),s("span",[t._v("的")]),s("span",[t._v("男")]),s("span",[t._v("朋")]),s("span",[t._v("友")])]),s("div",{staticClass:"jump-text"},[s("span",[t._v("喜")]),s("span",[t._v("欢")]),s("span",[t._v("你")])]),s("div",{staticClass:"jump-text"},[s("span",[t._v("四")]),s("span",[t._v("天")]),s("span",[t._v("、")]),s("span",[t._v("三")]),s("span",[t._v("天")]),s("span",[t._v("、")]),s("span",[t._v("两")]),s("span",[t._v("天")]),s("span",[t._v("、")]),s("span",[t._v("一")]),s("span",[t._v("天")])])]):t._e()]),s("van-dialog",{staticClass:"dialog",attrs:{title:"别问~~ 问就是","show-cancel-button":6===t.noNum,width:"250px",confirmButtonColor:"#ff8c8c",confirmButtonText:"我知道了","cancel-button-color":"#d3d3d3","cancel-button-text":"上一条","before-close":t.noBeforeClose},on:{cancel:t.noCancel,confirm:t.noConfirm},model:{value:t.noDialog,callback:function(e){t.noDialog=e},expression:"noDialog"}},[s("p",{staticClass:"tip-text"},[t._v(t._s(t.noTexts[t.noNum]))])]),s("van-dialog",{staticClass:"dialog",attrs:{title:t.yesTitleTexts[t.yesNum],width:"250px",confirmButtonColor:"#ff8c8c",confirmButtonText:t.yesConfirmTexts[t.yesNum],"before-close":t.yesBeforeClose},on:{confirm:t.yesConfirm},model:{value:t.yesDialog,callback:function(e){t.yesDialog=e},expression:"yesDialog"}},[s("p",{staticClass:"tip-text"},[t._v(t._s(t.yesTexts[t.yesNum]))])])],1)},i=[],a=s("0270"),l={components:{VContainer:a["a"]},created:function(){this._tellTime()},data:function(){return{end:!1,tellText:"",tellTexts:["小","姐","姐","我","想","撩","你"],askText:"",askTexts:["做我","女朋友","好吗"],tellTime:0,askTime:0,likeText:["关注你很久了~~","世界上所有美好的词都不足以形容你~~","很喜欢你"],current:0,noDialog:!1,noNum:0,noTexts:["工资上交","家务全包","房产证写你的名字","我妈会游泳","保大","吵架都你对","即使你不对，参照上一条","没错也能让你骂几句","答应我吧"],yesDialog:!1,yesNum:0,yesTexts:["真的吗？你答应了？","终于等到你，还好我没放弃","给我发消息吧，爱你！！！"],yesConfirmTexts:["是的","我知道了","好的"],yesTitleTexts:["我要脱单了？","我好开心呀~~","就是你了"]}},watch:{tellTime:function(t){0===t&&(clearInterval(this.tellTimer),this._askTime())},askTime:function(t){0===t&&clearInterval(this.askTimer)}},methods:{yesBeforeClose:function(t,e){this.yesNum!==this.yesTexts.length-1?e(!1):e()},yesConfirm:function(){var t=this;this.yesNum!==this.yesTexts.length-1?setTimeout((function(){t.yesNum+=1}),400):setTimeout((function(){t.end=!0}),300)},yesBtn:function(){this.noNum=0,this.yesDialog=!0},noBeforeClose:function(t,e){this.noNum!==this.noTexts.length-1?e(!1):e()},noConfirm:function(){var t=this;this.noNum!==this.noTexts.length-1&&setTimeout((function(){t.noNum+=1}),400)},noBtn:function(){this.yesNum=0,this.noDialog=!0},noCancel:function(){var t=this;0!==this.noNum&&setTimeout((function(){t.noNum-=1}),400)},onChange:function(t){2===this.current||(this.current+=1)},_tellTime:function(){var t=this,e=this.tellTexts.length;this.tellTime=e,this.tellTimer=setInterval((function(){t.tellTime--,t.tellText=t.tellText+t.tellTexts[e-t.tellTime-1]}),500)},_askTime:function(){var t=this,e=this.askTexts.length;this.askTime=e,this.askTimer=setInterval((function(){t.askTime--,t.askText=t.askText+t.askTexts[e-t.askTime-1]}),700)},handleToJump:function(t){this.$router.push(t)}},beforeRouteLeave:function(t,e,s){}},o=l,c=(s("425f"),s("2877")),r=Object(c["a"])(o,n,i,!1,null,"298864d5",null);e["default"]=r.exports},"425f":function(t,e,s){"use strict";var n=s("f9e1"),i=s.n(n);i.a},f9e1:function(t,e,s){}}]);
//# sourceMappingURL=chunk-4793fbca.5840ac87.js.map