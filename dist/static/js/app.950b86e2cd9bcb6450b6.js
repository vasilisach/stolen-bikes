webpackJsonp([1],{NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app-content"}},[t("router-view")],1)},staticRenderFns:[]},o=s("VU/8")({name:"App"},a,!1,null,null,null).exports,n=s("/ocq"),l=s("yviF"),c=s.n(l),r={name:"theftReportModal",data:function(){return{bikeModel:"",image:"",city:"",description:""}},props:{value:{required:!0}},methods:{addStolenBike:function(e,t,s,i){var a=this.$el.querySelector(".error-msg");if(e&&t&&s&&i){a.style="display: none;";var o=new Date,n="";k.collection("stolenBikes").add({bikeModel:e,image:t,city:s,description:i,createdAt:o,status:"submitted"}).then(function(e){n=e.id}),k.collection("police").where("status","==","free").limit(1).get().then(function(e){e.empty||(k.collection("police").doc(e.docs[0].id).update({status:"booked"}),k.collection("stolenBikes").doc(n).update({policeman:e.docs[0].id,status:"accepted"}))}),this.bikeModel="",this.city="",this.description="",this.image="",this.$emit("input",!this.value)}else a.style="display: block;"}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"modal"},[s("form",{on:{submit:function(t){return e.addStolenBike(e.bikeModel,e.image,e.city,e.description)}}},[s("div",{staticClass:"error-msg"},[e._v("Please fill in all fields")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.bikeModel,expression:"bikeModel"}],staticClass:"input",attrs:{placeholder:"Bike Model"},domProps:{value:e.bikeModel},on:{input:function(t){t.target.composing||(e.bikeModel=t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.image,expression:"image"}],staticClass:"input",attrs:{placeholder:"Bike Image URL"},domProps:{value:e.image},on:{input:function(t){t.target.composing||(e.image=t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.city,expression:"city"}],staticClass:"input",attrs:{placeholder:"City"},domProps:{value:e.city},on:{input:function(t){t.target.composing||(e.city=t.target.value)}}}),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"description"}],staticClass:"input textarea",attrs:{placeholder:"Description"},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value)}}}),e._v(" "),s("button",{staticClass:"send-report",attrs:{type:"submit"}},[e._v("Register stolen bike")])])])},staticRenderFns:[]};var p={name:"StolenBikes",data:function(){return{modalOpen:!1,stolenBikes:[],bikeModel:"",image:"",city:"",description:"",policemanName:""}},components:{theftReportModal:s("VU/8")(r,d,!1,function(e){s("qXgS")},"data-v-78d2d37e",null).exports},firestore:function(){return{stolenBikes:k.collection("stolenBikes").orderBy("createdAt")}},methods:{openModal:function(){(this.modalOpen=!this.modalOpen,this.modalOpen)||(this.$el.querySelector(".error-msg").style="display: none;")},resolvedReport:function(e,t,s){"accepted"==s&&(k.collection("stolenBikes").where("status","==","submitted").orderBy("createdAt").limit(1).get().then(function(e){e.empty?k.collection("police").doc(t).update({status:"free"}):k.collection("stolenBikes").doc(e.docs[0].id).update({status:"accepted",policeman:t})}),k.collection("stolenBikes").doc(e).update({status:"resolved",policeman:c.a.firestore.FieldValue.delete()})),"submitted"==s&&k.collection("stolenBikes").doc(e).update({status:"resolved"})}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"all-stolen-bikes"},[s("button",{staticClass:"add-stolen-bike",attrs:{title:"Add a stolen bike"},on:{click:e.openModal}},[s("i",{staticClass:"material-icons"},[e._v("add")])]),e._v(" "),s("theftReportModal",{model:{value:e.modalOpen,callback:function(t){e.modalOpen=t},expression:"modalOpen"}}),e._v(" "),e._l(e.stolenBikes,function(t,i){return s("div",{key:i,staticClass:"card"},[s("div",{staticClass:"status",class:t.status},[e._v(e._s(t.status))]),e._v(" "),s("span",{staticClass:"bike-model"},[e._v(e._s(t.bikeModel))]),e._v(" "),s("img",{staticClass:"bike-image",attrs:{src:t.image}}),e._v(" "),s("span",{staticClass:"city"},[e._v(e._s(t.city))]),e._v(" "),s("span",{staticClass:"description"},[e._v(e._s(t.description))]),e._v(" "),"accepted"==t.status||"submitted"==t.status?s("i",{staticClass:"material-icons done",on:{click:function(s){return e.resolvedReport(t.id,t.policeman,t.status)}}},[e._v("done_outline")]):e._e()])})],2)},staticRenderFns:[]},m=s("VU/8")(p,u,!1,null,null,null).exports;i.a.use(n.a);var v=new n.a({routes:[{path:"/",name:"StolenBikes",component:m}]}),f=s("hnaQ");s("881v"),s("PBss");s.d(t,"db",function(){return k}),i.a.config.productionTip=!0,i.a.use(f.a);c.a.initializeApp({apiKey:"AIzaSyAt7zT2BhegRBrKLKGramLY4Af4coUJS4s",authDomain:"stolen-bikes-57254.firebaseapp.com",databaseURL:"https://stolen-bikes-57254.firebaseio.com",projectId:"stolen-bikes-57254",storageBucket:"stolen-bikes-57254.appspot.com",messagingSenderId:"346570891936",appId:"1:346570891936:web:511656f05b54c87f115fc5",measurementId:"G-DWMELJC4CC"});var k=c.a.firestore();new i.a({el:"#app-content",router:v,components:{App:o},template:"<App/>"})},PBss:function(e,t){},qXgS:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.950b86e2cd9bcb6450b6.js.map