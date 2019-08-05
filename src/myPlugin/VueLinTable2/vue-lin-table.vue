<template>
  <div
    class="lin-table"
    :style="{height:height+'px'}"
  >
    <!-- 模拟内容高度 -->
    <div
      ref="lin-table-hide-main"
      class="lin-table-hide-main"
    >
      <div
        v-for="hideBoxHeight in hideBoxHeightArr"
        class="lin-table-hide-main-box"
        :style="{height:hideBoxHeight+'px'}"
      ></div>
    </div>
    <!-- 主体表格 -->
    <div class="lin-table-main">
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
        :style="{width:'100%'}"
      >
        <thead>
          <tr>
            <th
              :class="{'hide-cell':!columnsItem.isShow,'header-th':true}"
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <span>{{columnsItem.title}}</span>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <tr v-for="(dataItem,dataKey) in showData">
            <td
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
              :class="columnsItem.isShow?'':'hide-cell'"
            >
              <span>{{dataItem[columnsItem.key]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import tableCellheader from "./components/tableCellheader";
import tableCellbody from "./components/tableCellbody";
export default {
  name: "lin-table",
  components: {
    tableCellheader,
    tableCellbody
  },
  props: {
    //整体高度
    height: {
      type: [Number, String],
      default: 600
    },
    //原始列数据
    columns: {
      type: Array,
      default: () => []
    },
    //原始数据
    data: {
      type: Array,
      default: () => []
    },
    //头部高度
    headerHeight: {
      type: [Number, String],
      default: 40
    },
    //主体行高
    bodyRowHeight: {
      type: [Number, String],
      default: 30
    }
  },
  data() {
    return {
      hideHeight: null, //模拟总高度
      mainData: [], //处理后总数据
      mainColumns: [], //主体列数据
      leftColumns: [], //左侧浮动列数据
      rightColumns: [], //右侧浮动列数据
      firstDataKey: null //显示数据首个数据key值
    };
  },
  computed: {
    //每个模拟盒子高度数组
    hideBoxHeightArr() {
      let hideBoxHeightArr = [];
      if (this.hideHeight < 1000) {
        hideBoxHeightArr[hideBoxHeightArr.length] = 1000;
      } else {
        let nums = Math.floor(this.hideHeight / 1000);
        console.log(nums);
        for (let n = 0; n < nums; n++) {
          hideBoxHeightArr[hideBoxHeightArr.length] = 1000;
        }
        let lastHeight = this.hideHeight - nums * 1000;
        if (lastHeight > 0) {
          hideBoxHeightArr[hideBoxHeightArr.length] = lastHeight;
        }
      }
      return hideBoxHeightArr;
    },
    //显示数据
    showData() {
      let start = this.firstDataKey;
      let end = this.firstDataKey + this.showDataRows;
      return this.mainData.slice(start, end);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      this.handleHideHeight();
      this.handleShowRows();
      this.handleColumns();
      this.handleData();
    },
    //原始列数据处理
    handleColumns() {
      let mainColumns = [];
      let leftColumns = [];
      let rightColumns = [];
      let columns = this.columns;
      for (let c in columns) {
        let columnsItem = { ...columns[c] };
        if (typeof columnsItem["fixed"] != "undefined") {
          columnsItem["isShow"] = false;
          if (typeof columnsItem.width == "undefined") {
            columnsItem.width = 100;
          }
          switch (customColumns[c]["fixed"]) {
            case "left":
              mainColumns.unshift(columnsItem);
              leftColumns.unshift(columnsItem);
              break;
            case "right":
              rightColumns.push(columnsItem);
              break;
          }
        } else {
          columnsItem["isShow"] = true;
          mainColumns.push(columnsItem);
        }
      }
      this.mainColumns = mainColumns.concat(rightColumns);
      this.leftColumns = leftColumns;
      this.rightColumns = rightColumns;
    },
    //原始数据处理
    handleData() {
      let mainData = [];
      for (let d in this.data) {
        mainData[d] = { ...this.data[d] };
        mainData[d]["_index"] = parseInt(d);
        if (typeof this.data[d]["_checked"] == "undefined") {
          mainData[d]["_checked"] = false;
        }
        if (typeof this.data[d]["_disabled"] == "undefined") {
          mainData[d]["_disabled"] = false;
        }
      }
      this.mainData = mainData;
    },
    //计算模拟高度
    handleHideHeight() {
      this.hideHeight = this.data.length * this.bodyRowHeight;
    },
    //计算显示的行数
    handleShowRows() {
      this.showDataRows = Math.ceil(
        this.$refs["lin-table-hide-main"].clientHeight / this.bodyRowHeight
      );
    },
    //主体数据滚轮事件
    handleScroll(e) {
      console.log(e);
      //兼容浏览器
      if (e.type == "DOMMouseScroll") {
        if (e.detail > 0) {
          this.$refs["lin-table-hide-main"].scrollTop += this.bodyRowHeight;
        } else {
          this.$refs["lin-table-hide-main"].scrollTop -= this.bodyRowHeight;
        }
      } else {
        if (e.deltaY > 0) {
          this.$refs["lin-table-hide-main"].scrollTop += this.bodyRowHeight;
        } else {
          this.$refs["lin-table-hide-main"].scrollTop -= this.bodyRowHeight;
        }
      }
      let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
    }
  }
};
</script>
<style lang="less" scoped>
.lin-table {
  width: 100%;
  background-color: #f8f8f9;
  border: 1px solid #dcdee2;
  position: relative;
  overflow: hidden;
}
.lin-table-hide-main {
  position: absolute;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  .lin-table-hide-main-box {
    width: 100%;
  }
}
.lin-table-main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 2;
}
//表格基础设置
table {
  border-collapse: collapse;
  table-layout: fixed;
}
table td,
table th {
  font-size: 12px;
  border: 1px solid #e8eaec;
  text-align: left;
}

tr th {
  background-color: #f8f8f9;
  color: #515a6e;
}

tbody {
  background-color: #fff;
}

//隐藏
.hide-cell {
  visibility: hidden;
}
</style>
