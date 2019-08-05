<template>
  <div
    class="table-cell-header"
    :style="{textAlign:columnsItem.align}"
  >
    <template v-if="showTableCellKey==0">
      <span
        :class="{'ivu-table-cell-sort':columnsItem.sortable}"
        @click.stop="sortChange(-1)"
      >{{columnsItem.title}}</span>
      <span
        v-if="columnsItem.sortable"
        class="ivu-table-sort"
      >
        <i
          :class="{'ivu-icon':true,'ivu-icon-md-arrow-dropup':true,'on':columnsItem.sortKey==0}"
          @click.stop="sortChange(0)"
        ></i>
        <i
          :class="{'ivu-icon':true,'ivu-icon-md-arrow-dropdown':true,'on':columnsItem.sortKey==1}"
          @click.stop="sortChange(1)"
        ></i>
      </span>
    </template>
    <template v-if="showTableCellKey==1">
      <component
        @click.stop
        :render="columnsItem.renderHeader"
        :params="{column:columnsItem,index:columnsKey}"
        :is="currentView"
      ></component>
    </template>
    <template v-if="showTableCellKey==2">
      <input
        class="fixed-checkbox"
        type="checkbox"
        v-model="isAllCheck"
        @click="checkAll"
      >
    </template>
    <template v-if="showTableCellKey==3">
      <span @click.stop>序号</span>
    </template>
  </div>
</template>
<script>
import child from "./child.js";
export default {
  name: "table-cell-header",
  watch: {
    allCheck(newVal) {
      this.isAllCheck = newVal;
    }
  },
  props: {
    columnsItem: {
      type: Object,
      default: () => {}
    },
    columnsKey: Number,
    allCheck: {
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
    showTableCellKey() {
      let columnsItem = this.columnsItem;
      if (typeof columnsItem.renderHeader != "undefined") {
        return 1; //render渲染
      } else if (typeof columnsItem.type != "undefined") {
        switch (columnsItem.type) {
          case "selection":
            return 2; //显示多选框
            break;
          case "index":
            return 3; //显示序号
            break;
        }
      } else {
        return 0; //普通渲染
      }
    }
  },
  methods: {
    checkAll(event) {
      this.$emit("checkAll", event.target.checked);
    },
    sortChange(key) {
      if (!this.columnsItem.sortable) return;
      this.$emit("sortChange", {
        columnsKey: this.columnsKey,
        key: key
      });
    }
  }
};
</script>
<style lang="less" scoped>
.table-cell-header {
  padding: 0px 10px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fixed-checkbox {
  margin: 0;
}
</style>
