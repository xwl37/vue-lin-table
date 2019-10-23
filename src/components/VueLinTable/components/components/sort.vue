<template>
  <div class="sort">
    <span
      class="sort-text"
      @click="sortChange(-1)"
    >
      <slot></slot>
    </span>
    <div class="sort-group">
      <span
        class="up"
        :style="{borderColor:columnsItem.sortKey==0?'transparent #3792F1 transparent transparent':'transparent #c5c8ce transparent transparent'}"
        @click="sortChange(0)"
      ></span>
      <span
        class="down"
        :style="{borderColor:columnsItem.sortKey==1?'#3792F1 transparent transparent transparent':'#c5c8ce transparent transparent transparent'}"
        @click="sortChange(1)"
      ></span>
    </div>
  </div>
</template>
<script>
import eventBus from "../eventBus";
export default {
  name: "sort",
  data() {
    return {
      sortArr: []
    };
  },
  props: {
    columnsItem: {
      type: Object,
      default: () => {}
    },
    columnsKey: Number,
    columnsType: String,
    eventCreateTime: String
  },
  methods: {
    sortChange(type) {
      switch (type) {
        case -1:
          switch (this.columnsItem.sortKey) {
            case -1:
              this.sortChange(0);
              break;
            case 0:
              this.sortChange(1);
              break;
            case 1:
              eventBus.$emit("table-sort-change" + this.eventCreateTime, {
                sortKey: -1,
                sort: this.columnsItem.key,
                columnsKey: this.columnsKey,
                columnsType: this.columnsType
              });
              break;
          }
          break;
        case 0:
          eventBus.$emit("table-sort-change" + this.eventCreateTime, {
            sortKey: 0,
            sort: this.columnsItem.key,
            columnsKey: this.columnsKey,
            columnsType: this.columnsType
          });
          break;
        case 1:
          eventBus.$emit("table-sort-change" + this.eventCreateTime, {
            sortKey: 1,
            sort: this.columnsItem.key,
            columnsKey: this.columnsKey,
            columnsType: this.columnsType
          });
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sort-text {
  cursor: pointer;
}
.sort-group {
  display: inline-block;
  height: 100%;
  position: relative;
}
.up {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  transform: rotate(90deg); /*顺时针旋转90°*/
  cursor: pointer;
  &:hover {
    border-color: transparent #000 transparent transparent;
  }
}
.down {
  position: absolute;
  left: 5px;
  top: -3px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  cursor: pointer;
  &:hover {
    border-color: #000 transparent transparent transparent;
  }
}
</style>