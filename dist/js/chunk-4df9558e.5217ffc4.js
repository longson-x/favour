(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4df9558e"],{"0836":function(t,e,n){"use strict";var o=n("ec31"),a=n.n(o);a.a},1603:function(t,e,n){},"451e":function(t,e,n){},"77b8":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("v-header",{attrs:{title:"首页"}}),n("V-container",{attrs:{header:!1,footer:!0,"footer-height":100}},[n("div",{staticClass:"main-home"},t._l(t.routerList.filter((function(t,e){return 0!==e})),(function(e,o){return n("button",{key:o,on:{click:function(n){return t.handleToJump(e.path)}}},[t._v(" "+t._s(e.meta.title)+" ")])})),0)]),n("V-footer",{attrs:{height:100}},[n("div",{staticClass:"footer-content"},[n("div",{staticClass:"footer-detail"},[n("button",{staticClass:"footer-item footer-submit"},[t._v("这是底部")])])])])],1)},a=[],i=n("a18c"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.showHeader?o("header",{staticClass:"head-view",style:{backgroundColor:t.bgColor}},[t.showBack?o("div",{staticClass:"back-view",on:{click:t.back}},[o("img",{staticClass:"icon",attrs:{src:n("dfa3"),alt:"back"}})]):t._e(),o("p",{staticClass:"title single-line",style:{fontSize:t.$px2vw(t.titleSize),color:t.titleColor}},[t._v(t._s(t.title))])]):t._e()},s=[],c=(n("a9e3"),n("b4af")),A={props:{bgColor:{type:String,default:"#F3F3F3"},titleColor:{type:String,default:"#333333"},titleSize:{type:Number,default:34},title:{type:String,default:"标题栏组件是根据环境进行显示的组件是根据环境进行显示的"},showBack:{type:Boolean,default:!0},backHandler:{type:Function,default:function(){}}},data:function(){return{showHeader:c["a"].isH5()}},methods:{back:function(){"function"===typeof this.backHandler&&this.backHandler(),this.$router.back()}}},l=A,u=(n("e324"),n("2877")),f=Object(u["a"])(l,r,s,!1,null,"54d9b355",null),d=f.exports,h=n("0270"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"foot-view",style:{backgroundColor:t.bgColor,height:t.$px2vw(t.heightNumber)}},[t._t("default")],2)},b=[],g={props:{bgColor:{type:String,default:"#F3F3F3"},height:{type:[Number,String],default:100}},computed:{heightNumber:function(){return Number(this.height)||100}}},C=g,m=(n("0836"),Object(u["a"])(C,p,b,!1,null,null,null)),v=m.exports,k={components:{VHeader:d,VContainer:h["a"],VFooter:v},created:function(){this.routerList=i["a"].options.routes},data:function(){return{routerList:[]}},methods:{handleToJump:function(t){this.$router.push(t)}}},w=k,_=(n("cc12b"),Object(u["a"])(w,o,a,!1,null,"82e6ec10",null));e["default"]=_.exports},cc12b:function(t,e,n){"use strict";var o=n("451e"),a=n.n(o);a.a},dfa3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMAAQJ0g4SLmvT9m5spTgAAAElJREFUKM9jYEAClg4MaIB51RJ0IatVqzAUrVqOqagQU5HAsFXEMGvVCgU0oaxVqwLQhNhWYYYnUJnDiFHGgKEMPeUAlRUyYAcAaa5BlCFNTVMAAAAASUVORK5CYII="},e324:function(t,e,n){"use strict";var o=n("1603"),a=n.n(o);a.a},ec31:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4df9558e.5217ffc4.js.map