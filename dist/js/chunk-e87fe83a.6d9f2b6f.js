(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e87fe83a"],{"0818":function(t,e,i){"use strict";var o=i("fabc"),n=i.n(o);n.a},"0cbe":function(t,e,i){},"2a7d":function(t,e,i){"use strict";var o=i("0cbe"),n=i.n(o);n.a},"2ac8":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"center"},[i("luck-card",{attrs:{option:t.option}})],1)])},n=[],c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"canvasBox"},[i("div",{staticClass:"award"},[i("div",{staticClass:"title"},[i("p",{style:[{fontSize:this.fontSize/75*t.option.scratchFontSize+"px"},t.option.scratchTextStyle]},[t._v(" 恭喜中奖 ")])])]),i("canvas",{ref:"canvas",on:{touchmove:t.touchmove,touchstart:t.touchstart,touchend:t.touchend}})])},a=[],s=(i("cb29"),i("4de4"),i("a15b"),i("a434"),i("e25e"),i("ac1f"),i("1276"),{props:{option:{type:Object,default:function(){return{scratchFontSize:0,scratchTextStyle:{},scratchColor:"",placeholder:"",fontStyle:"",fontSize:0,fontColor:"",img:"",radio:.25}}}},data:function(){return{left:0,top:0,width:0,height:0,canvas:null,ctx:null,fontSize:0}},created:function(){},mounted:function(){this.fontSize=parseInt(window.getComputedStyle(document.documentElement,null)["font-size"]),this.initSetting()},methods:{initSetting:function(){this.canvas=this.$refs.canvas;var t=this.canvas.getBoundingClientRect(),e=t.left,i=t.top,o=t.width,n=t.height;console.log(this.canvas.getBoundingClientRect()),this.left=e,this.top=i,this.width=o,this.height=n,this.canvas.width=o,this.canvas.height=n,this.ctx=this.canvas.getContext("2d"),this.initCanvas()},initCanvas:function(){var t=this;if(this.option.placeholder){if(this.ctx.fillStyle=this.option.scratchColor,this.ctx.fillRect(0,0,this.width,this.height),this.ctx.fill(),this.option.fontStyle){var e=[];e=this.option.fontStyle.split(" "),e.splice(1,0,"".concat(this.option.fontSize*this.fontSize/75+"px")),this.ctx.font=e.join(" ")}this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle=this.option.fontColor,this.ctx.fillText(this.option.placeholder,this.width/2,this.height/2),this.ctx.globalCompositeOperation="destination-out"}else if(this.option.img){var i=new Image;i.src=this.option.img,i.onload=function(){console.log("图片加载成功"),t.ctx.drawImage(i,0,0,t.width,t.height),t.ctx.globalCompositeOperation="destination-out"}}},touchstart:function(t){t.preventDefault()},touchmove:function(t){t.preventDefault();var e=t.touches[0],i=this.canvas.getBoundingClientRect(),o=i.left,n=i.top,c=document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.scrollLeft||document.body.scrollLeft,s=e.pageX-o-a,h=e.pageY-n-c;this.ctx.beginPath(),this.ctx.fillStyle="#FFFFFF",this.ctx.arc(s,h,.5*this.fontSize,0,2*Math.PI,!0),this.ctx.fill()},touchend:function(t){t.preventDefault(),this.checkComplete()},checkComplete:function(){for(var t=this.ctx.getImageData(0,0,this.width,this.height),e=t.data,i=e.length,o=0,n=0;n<i;n+=4){var c=e[n+3];c<10&&o++}console.log("count",o);var a=o/(i/4);console.log("percent",a),a>=this.option.radio&&this.showResult()},showResult:function(){this.ctx.clearRect(0,0,this.width,this.height);var t=[0,0,0,0,0,0,0,0,0,0],e=0;while(7!==e)for(var i=0;i<10;i++){var o=0;if(t[Math.floor(Math.random()*t.length)]=Math.round(Math.random()),o=t.filter((function(t){return 1===t})).length,e=o,7===e)break}var n=t[Math.floor(Math.random()*t.length)];1===n?this.$toast("恭喜您中奖了"):this.$toast("很遗憾，您未中奖")}}}),h=s,l=(i("2a7d"),i("2877")),r=Object(l["a"])(h,c,a,!1,null,"65b12614",null),f=r.exports,u={components:{luckCard:f},data:function(){return{option:{scratchFontSize:32,scratchTextStyle:{color:"red","font-weight":"800"},scratchColor:"#e5e5e5",placeholder:"刮开涂层",fontSize:32,fontStyle:"800 Arial",fontColor:"#a0a0a0",radio:.1}}}},d=u,p=(i("0818"),Object(l["a"])(d,o,n,!1,null,"e6f0c2ba",null));e["default"]=p.exports},fabc:function(t,e,i){}}]);
//# sourceMappingURL=chunk-e87fe83a.6d9f2b6f.js.map