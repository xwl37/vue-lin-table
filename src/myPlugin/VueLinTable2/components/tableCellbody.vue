<template>
  <div
    class="table-cell-body"
    :style="{textAlign:columnsItem.align}"
  >
    <template v-if="showTableCellKey==0">{{dataItem[columnsItem.key]}}</template>
    <template v-if="showTableCellKey==1">
      <component
        :render="columnsItem.render"
        :params="{row:dataItem,column:columnsItem,index:dataItem._index}"
        :is="currentView"
      ></component>
    </template>
    <template v-if="showTableCellKey==2">
      <input
        class="fixed-checkbox"
        type="checkbox"
        v-model="dataItem._checked"
        :disabled="dataItem._disabled"
        @click="checkOne"
      >
    </template>
    <template v-if="showTableCellKey==3">
      <!-- <Tooltip
        :transfer="true"
        max-width="400"
        :content="dataItem[columnsItem.key]"
      >
        <div class="tool-tip-text">{{dataItem[columnsItem.key]}}</div>
      </Tooltip> -->
    </template>
    <template v-if="showTableCellKey==4">
      <div>{{dataItem._index+1}}</div>
    </template>
  </div>
</template>
<script>
import child from "./child.js";
export default {
  name: "table-cell-body",
  props: {
    columnsItem: {
      type: Object,
      default: () => {}
    },
    dataItem: {
      type: Object,
      default: () => {}
    },
    dataKey: Number
  },
  data() {
    return {
      currentView: child
    };
  },
  computed: {
    showTableCellKey() {
      let columnsItem = this.columnsItem;
      if (typeof columnsItem.render != "undefined") {
        return 1; //render渲染
      }
      if (typeof columnsItem.type != "undefined") {
        switch (columnsItem.type) {
          case "selection":
            return 2; //显示多选框
            break;
          case "index": //显示序号
            return 4;
            break;
        }
      }
      if (
        typeof columnsItem.tooltip != "undefined" &&
        this.getTextLength(this.dataItem[this.columnsItem.key]) >
          this.columnsItem.width
      ) {
        return 3; //气泡弹窗渲染
      }
      return 0; //普通渲染
    }
  },
  methods: {
    getTextLength(str) {
      var width = 0;
      var html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();
      return width;
    },
    checkOne(event) {
      this.$emit("checkOne", {
        isCheck: event.target.checked,
        dataKey: this.dataKey
      });
    }
  }
};
</script>
<style lang="less" scoped>
.table-cell-body {
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tool-tip-text {
  width: 200px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fixed-checkbox {
  margin: 0;
}
</style>
