// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Canvas from "./Canvas";

//加入 VueDraggableResizable 插件
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
});
