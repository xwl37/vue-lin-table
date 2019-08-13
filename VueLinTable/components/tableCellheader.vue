<template>
  <div
    class="lin-table-header"
    :style="{textAlign:columnsItem.align}"
  >
    <template v-if="showModuleKey=='selection'">
      <checkBox
        v-model="isAllCheck"
        @on-change="checkAll"
      ></checkBox>
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
export default {
  name: "lin-table-header",
  components: {
    checkBox
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
    columnsKey: Number,
    isAllCheckProp: {
      type: Boolean,
      default: false
    }
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
      } else if (typeof this.columnsItem.renderHeader == "undefined") {
        return "default";
      } else {
        return "renderHeader";
      }
    }
  },
  methods: {
    checkAll(item) {
      eventBus.$emit("checkAll", item);
    }
  }
};
</script>
<style lang="less" scoped>
.lin-table-header {
  padding: 0px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
