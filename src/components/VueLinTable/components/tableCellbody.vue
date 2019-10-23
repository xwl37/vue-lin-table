<template>
  <div
    class="lin-table-body"
    :style="{textAlign:tableAlign==''?columnsItem.align:tableAlign}"
  >
    <template v-if="showModuleKey=='selection'">
      <checkBox
        v-model="dataItem._checked"
        :disabled="dataItem._disabled"
        @on-change="checkOne"
      ></checkBox>
    </template>
    <template v-if="showModuleKey=='index'">
      <span>{{dataKey+1}}</span>
    </template>
    <template v-if="showModuleKey=='tooltip'">
      <tip :eventCreateTime="eventCreateTime">{{dataItem[columnsItem.key]}}</tip>
    </template>
    <template v-if="showModuleKey=='default'">
      <span>{{dataItem[columnsItem.key]}}</span>
    </template>
    <template v-if="showModuleKey=='render'">
      <component
        :render="columnsItem.render"
        :params="{row:dataItem,column:columnsItem,index:dataItem._index}"
        :is="currentView"
      ></component>
    </template>
  </div>
</template>
<script>
import child from "./child.js";
import eventBus from "./eventBus.js";
import checkBox from "./components/checkBox";
import tip from "./components/tip";
export default {
  name: "table-cell-body",
  components: {
    checkBox,
    tip
  },
  props: {
    columnsItem: {
      type: Object,
      default: () => {}
    },
    dataItem: {
      type: Object,
      default: () => {}
    },
    dataKey: Number,
    //表格列位置
    tableAlign: {
      type: String,
      default: ""
    },
    eventCreateTime: String
  },
  data() {
    return {
      currentView: child
    };
  },
  computed: {
    showModuleKey() {
      if (this.columnsItem.type == "selection") {
        return "selection";
      } else if (this.columnsItem.type == "index") {
        return "index";
      } else if (this.columnsItem.tooltip) {
        return "tooltip";
      } else if (typeof this.columnsItem.render == "undefined") {
        return "default";
      } else {
        return "render";
      }
    }
  },
  methods: {
    checkOne(item) {
      eventBus.$emit("checkOne" + this.eventCreateTime, item, this.dataItem);
    }
  }
};
</script>
<style lang="less" scoped>
.lin-table-body {
  padding: 0 10px;
}

.lin-table-body,
.lin-table-body * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>