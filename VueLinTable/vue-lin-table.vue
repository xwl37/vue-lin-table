<template>
  <div
    ref="lin-table"
    class="lin-table"
    :style="{height:height+'px'}"
  >
    <!-- 模拟内容高度 -->
    <div
      ref="lin-table-hide-main"
      class="lin-table-hide-main"
      :style="{top:headerHeight+'px',bottom:isTableBottom?wheelHeight+'px':'0px'}"
      @scroll="handleFirstDataKey"
    >
      <div
        v-for="hideBoxHeight in hideBoxHeightArr"
        class="lin-table-hide-main-box"
        :style="{height:hideBoxHeight+'px'}"
      ></div>
    </div>
    <!-- 主体表格 -->
    <div
      ref="lin-table-main"
      class="lin-table-main"
      :style="{right:isTableRight?this.wheelHeight+'px':'0px'}"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
        :style="{width:isColSetAllWidth&&isColWidthGt?'auto':'100%',tableLayout:isColSetAllWidth?'fixed':'auto'}"
      >
        <thead>
          <tr>
            <th
              ref="main-header-th"
              :class="{'hide-cell':!columnsItem.isShow}"
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <tableCellheader
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :isAllCheckProp="isAllCheck"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                v-if="isColDrag"
                class="cursor-col-resize"
                :style="{right:mainColumns.length-1==columnsKey?'0px':'-5px'}"
                @mousedown="colWidthMouseDown($event,'main',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :class="{'bg-color':mouseClickRowKey===dataItem._index||mouseOverRowKey===dataKey}"
            @mouseover="mouseOverRow(dataKey)"
            @mouseleave="mouseLeaveRow(dataKey)"
            @click="mouseClickRow(dataItem._index)"
          >
            <td
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{height:bodyRowHeight+'px'}"
              :class="{'hide-cell':!columnsItem.isShow}"
            >
              <tableCellbody
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataItem._index"
              ></tableCellbody>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 左侧表格 -->
    <div
      class="lin-table-left"
      :style="{bottom:isColWidthGt?'0px':wheelHeight+'px'}"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
        :style="{width:'auto'}"
      >
        <thead>
          <tr>
            <th
              v-for="(columnsItem,columnsKey) in leftColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <tableCellheader
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :isAllCheckProp="isAllCheck"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                v-if="isColDrag"
                class="cursor-col-resize"
                :style="{right:'-5px'}"
                @mousedown="colWidthMouseDown($event,'left',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :class="{'bg-color':mouseClickRowKey===dataItem._index||mouseOverRowKey===dataKey}"
            @mouseover="mouseOverRow(dataKey)"
            @mouseleave="mouseLeaveRow(dataKey)"
            @click="mouseClickRow(dataItem._index)"
          >
            <td
              v-for="(columnsItem,columnsKey) in leftColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
            >
              <tableCellbody
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataKey"
              ></tableCellbody>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 右侧表格 -->
    <div
      class="lin-table-right"
      :style="{right:isTableRight?wheelHeight+'px':'0px',bottom:isColWidthGt?'0px':wheelHeight+'px'}"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
        :style="{width:'auto'}"
      >
        <thead>
          <tr>
            <th
              v-for="(columnsItem,columnsKey) in rightColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <tableCellheader
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :isAllCheckProp="isAllCheck"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                v-if="isColDrag"
                class="cursor-col-resize"
                :style="{left:'-5px'}"
                @mousedown="colWidthMouseDown($event,'right',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handleScroll"
          @mousewheel="handleScroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :class="{'bg-color':mouseClickRowKey===dataItem._index||mouseOverRowKey===dataKey}"
            @mouseover="mouseOverRow(dataKey)"
            @mouseleave="mouseLeaveRow(dataKey)"
            @click="mouseClickRow(dataItem._index)"
          >
            <td
              v-for="(columnsItem,columnsKey) in rightColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
            >
              <tableCellbody
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataKey"
              ></tableCellbody>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 拖动标识线 -->
    <div
      ref="drag-line"
      class="drag-line"
    ></div>
  </div>
</template>
<script>
import tableCellheader from "./components/tableCellheader";
import tableCellbody from "./components/tableCellbody";
import eventBus from "./components/eventBus.js";
export default {
  name: "lin-table",
  components: {
    tableCellheader,
    tableCellbody
  },
  watch: {
    columns() {
      this.handleColumns();
    },
    data() {
      this.handleData();
    }
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
    },
    //滚动条高度
    wheelHeight: {
      type: Number,
      default: 18
    },
    //列最小宽度
    minWidth: {
      type: Number,
      default: 50
    },
    //列是否拖动
    isColDrag: {
      type: Boolean,
      default: false
    },
    //表格列位置
    tableAlign: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showDataRows: 0, //显示行数
      tableClientWidth: 0, //表格宽度
      extraHeight: 0, //额外高度
      isColWidthGt: false,
      isTableRight: false,
      isTableBottom: false,
      mainData: [], //处理后总数据
      mainColumns: [], //主体列数据
      leftColumns: [], //左侧浮动列数据
      rightColumns: [], //右侧浮动列数据
      firstDataKey: null, //显示数据首个数据key值
      mouseDownClientX: 0, //开始拖动鼠标点击clientX
      mouseCheckColType: null, //选择拖动的表格
      mouseCheckColKey: null, //选择拖动的列key
      handleTableStyleTime: null,
      mouseOverRowKey: -1,
      mouseClickRowKey: -1
    };
  },
  computed: {
    //是否全选
    isAllCheck() {
      let allcheck = true;
      for (let m in this.mainData) {
        if (!this.mainData[m]["_checked"]) {
          allcheck = false;
          break;
        }
      }
      return allcheck;
    },
    //全部列是否设置宽度
    isColSetAllWidth() {
      let isColSetAllWidth = true;
      for (let m in this.mainColumns) {
        if (typeof this.mainColumns[m].width == "undefined") {
          isColSetAllWidth = false;
          break;
        }
      }
      return isColSetAllWidth;
    },
    //mian-table的总设置宽度
    tableMainWidth() {
      let tableMainWidth = 0;
      for (let m in this.mainColumns) {
        if (typeof this.mainColumns[m].width != "undefined") {
          tableMainWidth += this.mainColumns[m].width;
        }
      }
      return tableMainWidth;
    },
    //模拟总高度
    hideHeight() {
      return this.data.length * this.bodyRowHeight + this.extraHeight;
    },
    //每个模拟盒子高度数组
    hideBoxHeightArr() {
      let hideBoxHeightArr = [];
      if (this.hideHeight < 1000) {
        hideBoxHeightArr[hideBoxHeightArr.length] = this.hideHeight;
      } else {
        let nums = Math.floor(this.hideHeight / 1000);
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
  created() {
    eventBus.$on("checkAll", item => {
      let selectData = {};
      for (let d in this.data) {
        selectData[d] = this.data[d];
        this.$set(this.mainData[d], "_checked", item);
      }
      eventBus.checkData = item ? selectData : {};
      this.$emit("table-change", eventBus.objToArr(eventBus.checkData));
    });
    eventBus.$on("checkOne", (item, columns) => {
      if (item) {
        eventBus.checkData[columns._index] = this.data[columns._index];
      } else {
        delete eventBus.checkData[columns._index];
      }
      this.$set(this.mainData[columns._index], "_checked", item);
      this.$emit("table-change", eventBus.objToArr(eventBus.checkData));
    });
  },
  mounted() {
    //定时检测更改表格样式
    this.handleTableStyleTime = setInterval(() => {
      this.handleTableStyle();
    }, 500);
    this.init();
  },
  destroyed() {
    clearInterval(this.handleTableStyleTime);
  },
  methods: {
    //初始化
    init() {
      this.handleColumns();
      this.handleData();
    },
    //原始列数据处理
    handleColumns() {
      let mainColumns = [];
      let leftColumns = [];
      let rightColumns = [];
      let columns = this.columns;
      let avgWidth = 0;
      //在拖动列宽的情况下，获取未设置宽度的列的宽度
      if (this.isColDrag) {
        avgWidth = this.handleAvgWidth();
      }
      for (let c in columns) {
        let columnsItem = { ...columns[c] };
        if (this.isColDrag && typeof columnsItem.width == "undefined") {
          columnsItem.width = avgWidth;
        }
        if (typeof columnsItem["fixed"] != "undefined") {
          columnsItem["isShow"] = false;
          if (typeof columnsItem.width == "undefined") {
            columnsItem.width = this.minWidth;
          }
          switch (columnsItem["fixed"]) {
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
      this.mainData = [];
      for (let d in this.data) {
        this.$set(this.mainData, d, { ...this.data[d] });
        this.$set(this.mainData[d], "_index", parseInt(d));
        if (typeof this.data[d]["_checked"] == "undefined") {
          this.$set(this.mainData[d], "_checked", false);
        }
        if (typeof this.data[d]["_disabled"] == "undefined") {
          this.$set(this.mainData[d], "_disabled", false);
        }
      }
      //当数据有变动时，选中行效果去掉
      this.mouseClickRowKey = -1;
    },
    //获取表格宽度
    getTableClientWidth() {
      this.tableClientWidth = this.$refs["lin-table-main"].clientWidth;
    },
    //主体数据滚轮事件
    handleScroll(e) {
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
    },
    //获取显示首数据标识
    handleFirstDataKey(e) {
      let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
      this.$emit("table-scroll", e);
    },
    //按下宽度标识事件
    colWidthMouseDown(e, type, key) {
      this.$refs["drag-line"].style.left =
        e.clientX - this.$refs["lin-table"].offsetLeft + "px";
      this.mouseDownClientX = e.clientX;
      this.mouseCheckColType = type;
      this.mouseCheckColKey = key;
      document.body.addEventListener("mouseup", this.colWidthMouseUp);
      document.body.addEventListener("mousemove", this.colWidthMouseMove);
    },
    //拖动宽度标识事件
    colWidthMouseMove(e) {
      if (this.mouseCheckColKey == null) return;
      this.$refs["drag-line"].style.left =
        e.clientX - this.$refs["lin-table"].offsetLeft + "px";
    },
    //弹起宽度标识事件
    colWidthMouseUp(e) {
      if (this.mouseCheckColKey == null) return;
      switch (this.mouseCheckColType) {
        case "main":
          let mainWidth =
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
            (e.clientX - this.mouseDownClientX);
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            mainWidth < this.minWidth ? this.minWidth : mainWidth
          );
          break;
        case "left":
          let leftWidth =
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
            (e.clientX - this.mouseDownClientX);
          this.$set(
            this.leftColumns[this.mouseCheckColKey],
            "width",
            leftWidth < this.minWidth ? this.minWidth : leftWidth
          );
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            leftWidth < this.minWidth ? this.minWidth : leftWidth
          );
          break;
        case "right":
          let rightWidth =
            this.$refs["main-header-th"][
              this.mainColumns.length -
                this.rightColumns.length +
                this.mouseCheckColKey
            ].offsetWidth -
            (e.clientX - this.mouseDownClientX);
          this.$set(
            this.mainColumns[
              this.mainColumns.length -
                this.rightColumns.length +
                this.mouseCheckColKey
            ],
            "width",
            rightWidth < this.minWidth ? this.minWidth : rightWidth
          );
          this.$set(
            this.rightColumns[this.mouseCheckColKey],
            "width",
            rightWidth < this.minWidth ? this.minWidth : rightWidth
          );
          break;
      }

      document.body.removeEventListener("mouseup", this.colWidthMouseUp);
      document.body.removeEventListener("mousemove", this.colWidthMouseMove);
      this.mouseCheckColType = null;
      this.mouseCheckColKey = null;
      this.$refs["drag-line"].style.left = "-100px";
    },
    //在拖动列宽的情况下，获取未设置宽度的列的宽度
    handleAvgWidth() {
      let tableClientWidth = this.tableClientWidth;
      let setWidth = 0;
      let col = 0;
      for (let c in this.columns) {
        if (typeof this.columns[c].width != "undefined") {
          setWidth += this.columns[c].width;
        } else {
          col++;
        }
      }
      let avgWidth = (tableClientWidth - this.columns.length - setWidth) / col;
      return avgWidth < 100 ? 100 : avgWidth;
    },
    //处理表格样式
    handleTableStyle() {
      //获取表格总宽度
      this.getTableClientWidth();
      //计算最大显示的行数
      let showDataRows =
        this.$refs["lin-table-hide-main"].clientHeight /
        (this.bodyRowHeight + 1);
      this.showDataRows = Math.ceil(showDataRows);
      if (showDataRows % 1 === 0) {
        this.extraHeight = 0;
      } else {
        this.extraHeight = (showDataRows % 1) * this.bodyRowHeight;
      }
      //判断列总宽度是否大于表格宽度
      if (this.tableMainWidth <= this.tableClientWidth) {
        this.isColWidthGt = true;
      } else {
        this.isColWidthGt = false;
      }

      //判断是否需要底部顶起
      if (!this.isColWidthGt) {
        for (let m in this.mainColumns) {
          if (typeof this.mainColumns[m].width == "undefined") {
            this.mainColumns[m].width = this.minWidth;
          }
        }
        this.isTableBottom = true;
      } else {
        this.isTableBottom = false;
      }
      //判断是否需要右侧移动
      if (this.$refs["lin-table-hide-main"].clientHeight <= this.hideHeight) {
        this.isTableRight = true;
      } else {
        this.isTableRight = false;
      }
    },
    mouseOverRow(key) {
      this.mouseOverRowKey = key;
    },
    mouseLeaveRow(key) {
      this.mouseOverRowKey = -1;
    },
    //行点击事件
    mouseClickRow(key) {
      this.mouseClickRowKey = key;
      this.$emit("table-row-click", this.mainData[key]);
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

.lin-table-left {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  overflow: hidden;
  -webkit-box-shadow: 3px 0 6px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.2);
}

.lin-table-right {
  position: absolute;
  top: 0;
  z-index: 3;
  overflow: hidden;
  -webkit-box-shadow: -3px 0 6px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0 6px rgba(0, 0, 0, 0.2);
}

//宽度标识
.cursor-col-resize {
  width: 10px;
  cursor: col-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

//拖动标识线
.drag-line {
  width: 1px;
  background-color: #585858;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100px;
  z-index: 4;
}

//表格基础设置
table {
  border-collapse: collapse;
}
table td,
table th {
  font-size: 12px;
  border: 1px solid #e8eaec;
  text-align: left;
}

tr th {
  position: relative;
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

//table tr 鼠标浮动背景底色
.bg-color {
  background-color: #ebf7ff;
}
</style>
