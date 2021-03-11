<template>
  <div id="app">
    <div
      v-bind:style="{
        height: CanvasStyle.height + 'px',
        width: CanvasStyle.width + 'px',
        border: CanvasStyle.border,
        position: CanvasStyle.position,
      }"
      class="myCanvas"
    >
      <vue-draggable-resizable
        :w="value.width"
        :h="value.height"
        :x="value.x"
        :y="value.y"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(key)"
        @deactivated="onDeactivated"
        :parent="true"
        v-for="(value, key) in DraggableComponentList"
        v-bind:key="key"
      >
        <p>
          Hello! I'm a flexible component. You can drag me around and you can
          resize me.<br />
          X: {{ value.x }} / Y: {{ value.y }} - Width: {{ value.width }} /
          Height: {{ value.height }}
        </p>
      </vue-draggable-resizable>
    </div>
    <div>
      <button v-on:click="onDraggableComponentCreate">添加一个元素</button>
    </div>
    <div>
      <div v-for="(value, key) in DraggableComponentList" v-bind:key="key">
        <div>元素 {{ key }}</div>
        <div>
          <span>水平坐标(x):</span>
          <input
            class="input_x"
            :value="DraggableComponentList[key].x"
            @input="onComponentPropertyLineChanges"
            :name="key"
            title="x"
          />
        </div>
        <div>
          <span>竖直坐标(y):</span>
          <input
            class="input_y"
            :value="DraggableComponentList[key].y"
            @input="onComponentPropertyLineChanges"
            :name="key"
            title="y"
          />
        </div>
        <div>
          <span>高度(height):</span>
          <input
            class="input_height"
            :value="DraggableComponentList[key].height"
            @input="onComponentPropertyLineChanges"
            :name="key"
            title="height"
          />
        </div>
        <div>
          <span>宽度(width):</span>
          <input
            class="input_width"
            :value="DraggableComponentList[key].width"
            @input="onComponentPropertyLineChanges"
            :name="key"
            title="width"
          />
        </div>
      </div>
      <button class="smaller_canvas" v-on:click="onResizeCanvas">
        画布尺寸减半
      </button>
    </div>
  </div>
</template>

<script>
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
export default {
  data: function () {
    return {
      CanvasStyle: {
        height: 800,
        width: 800,
        border: "1px solid red",
        position: "relative",
      },
      WarningColor: "crimson",
      PlainColor: "black",
      DraggableComponentList: [],
      ActivitedInstance: 0,
      Activited: false,
      X: 0,
      Y: 0,
      Height: 0,
      Width: 0,
    };
  },
  methods: {
    onDraggableComponentCreate: function () {
      let myComponent = new DraggableData(0, 0, 300, 300);
      this.DraggableComponentList.push(myComponent);
    },
    onResize: function (x, y, width, height) {
      let myInstance = this.DraggableComponentList[this.ActivitedInstance];
      myInstance.x = x;
      myInstance.y = y;
      myInstance.width = width;
      myInstance.height = height;
    },
    onActivated: function (val) {
      this.ActivitedInstance = val;
      this.Activited = true;
    },
    onDeactivated: function () {
      //this.Activited = false;
    },
    onInputFocus: function () {
      console.log("AAAAAAA");
      this.Activited = true;
    },
    onDrag: function (x, y) {
      let myInstance = this.DraggableComponentList[this.ActivitedInstance];
      myInstance.x = x;
      myInstance.y = y;
    },
    onResizeCanvas: function () {
      this.CanvasStyle.height = this.CanvasStyle.height / 2;
      this.CanvasStyle.width = this.CanvasStyle.width / 2;
    },
    onComponentPropertyLineChanges: function (event) {
      console.log(event.srcElement.name);
      let Instance = this.DraggableComponentList[
        parseInt(event.srcElement.name)
      ];
      if (Instance === undefined || isNaN(event.srcElement.name)) return;
      let val = event.srcElement.value;
      switch (event.srcElement.title) {
        case "x": {
          Instance.x = val;
          break;
        }
        case "y": {
          Instance.y = val;
          break;
        }
        case "height": {
          Instance.height = val;
          break;
        }
        case "width": {
          Instance.width = val;
          break;
        }
      }
    },
  },
};
class DraggableData {
  x = 0;
  y = 0;
  width = 100;
  height = 100;
  display = true;
  background_color = "#FFFFFF";
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
</script>

<style>
.finished {
  text-decoration: line-through;
}
li {
  list-style: none;
  font-size: 1.6em;
  margin-top: 10px;
}
.myCanvas {
  float: left;
}

#app {
  /*
  background-image: url(./576df1167c887_1024.jpg); 
  */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
