<template>
  <div
    class="lin-table-header"
    :style="{textAlign:tableAlign==''?columnsItem.align:tableAlign}"
  >
    <template v-if="showModuleKey=='selection'">
      <checkBox
        v-model="isAllCheck"
        @on-change="checkAll"
      ></checkBox>
    </template>
    <template v-if="showModuleKey=='sortable'">
      <sort
        :eventCreateTime="eventCreateTime"
        :columnsType="columnsType"
        :columnsKey="columnsKey"
        :columnsItem="columnsItem"
      >{{columnsItem.title}}</sort>
    </template>
    <template v-if="showModuleKey=='default'">
      <span>{{columnsItem.title}}</span>
    </template>
    <template v-if="showModuleKey=='renderHeader'">
      <component
        :render="columnsItem.renderHeader"
        :params="{column:columnsItem,index:columnsKey}"
        :is="currentView"
      ></component>
    </template>
  </div>
</template>
<script>
import child from "./child.js";
import eventBus from "./eventBus.js";
import checkBox from "./components/checkBox";
import sort from "./components/sort";
export default {
  name: "lin-table-header",
  components: {
    checkBox,
    sort
  },
  watch: {
    isAllCheckProp(newVal) {
      this.isAllCheck = newVal;
    }
  },
  props: {
    columnsItem: {
      type: Object,
      default: () => {}
    },
    columnsType: String,
    columnsKey: Number,
    isAllCheckProp: {
      type: Boolean,
      default: false
    },
    //表格列位置
    tableAlign: {
      type: String,
      default: ""
    },
    eventCreateTime: String
  },
  data() {
    return {
      currentView: child,
      isAllCheck: false
    };
  },
  computed: {
    showModuleKey() {
      if (this.columnsItem.type == "selection") {
        return "selection";
      } else if (this.columnsItem.sortable) {
        return "sortable";
      } else if (typeof this.columnsItem.renderHeader == "undefined") {
        return "default";
      } else {
        return "renderHeader";
      }
    }
  },
  methods: {
    checkAll(item) {
      eventBus.$emit("checkAll" + this.eventCreateTime, item);
    }
  }
};
</script>
<style lang="less" scoped>
.lin-table-header {
  padding: 0px 10px;
}
.lin-table-header,
.lin-table-header * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
