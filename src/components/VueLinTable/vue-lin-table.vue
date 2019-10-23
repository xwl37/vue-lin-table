<template>
  <div
    ref="lin-table"
    class="lin-table"
    :style="{height:height==0?tableHeight+'px':height+'px'}"
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
        :style="{width:mainColumns.length>0?'10px':'0px',tableLayout:'fixed'}"
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
                columnsType="main"
                :eventCreateTime="eventCreateTime"
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
                :eventCreateTime="eventCreateTime"
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
        :style="{width:leftColumns.length>0?'10px':'0px',tableLayout:'fixed'}"
      >

        <thead>
          <tr>
            <th
              v-for="(columnsItem,columnsKey) in leftColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px',overflow:'hidden'}"
            >
              <tableCellheader
                :eventCreateTime="eventCreateTime"
                columnsType="left"
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :isAllCheckProp="isAllCheck"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                v-if="isColDrag&&typeof columnsItem.key!='undefined'"
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
                :eventCreateTime="eventCreateTime"
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
        :style="{width:rightColumns.length>0?'10px':'0px',tableLayout:'fixed'}"
      >
        <thead>
          <tr>
            <th
              v-for="(columnsItem,columnsKey) in rightColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <tableCellheader
                columnsType="right"
                :eventCreateTime="eventCreateTime"
                :tableAlign="tableAlign"
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :isAllCheckProp="isAllCheck"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                v-if="isColDrag&&typeof columnsItem.key!='undefined'"
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
                :eventCreateTime="eventCreateTime"
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
      :style="{height:height==0?tableHeight+'px':height+'px'}"
    ></div>
    <!-- 加载中 -->
    <loading v-if="loading"></loading>
    <!-- tooltip 弹窗 -->
    <div
      v-if="isTooltipShow"
      class="tooltip"
      :style="{top:tooltipTop+'px',left:tooltipLeft+'px'}"
      @mouseover="()=>this.isTooltipShow=true"
      @mouseleave="()=>this.isTooltipShow=false"
    >
      {{tooltipContent}}
    </div>
  </div>
</template>
<script>
import tableCellheader from "./components/tableCellheader";
import tableCellbody from "./components/tableCellbody";
import loading from "./components/loading";
import eventBus from "./components/eventBus.js";
export default {
  name: "lin-table",
  components: {
    tableCellheader,
    tableCellbody,
    loading
  },
  watch: {
    editColumns() {
      this.handleColumns();
    },
    columns() {
      this.handleColumns();
    },
    data() {
      this.handleData();
    }
  },
  props: {
    //加载中
    loading: {
      type: Boolean,
      default: false
    },
    //整体高度
    height: {
      type: [Number, String],
      default: 0
    },
    //修改主列数据
    editColumns: {
      type: Array,
      default: () => []
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
      tableScrollTop: 0,
      sortArr: [], //排序记录
      checkData: {}, //选择的数据
      tableHeight: 0,
      eventCreateTime: String(new Date().getTime() + Math.random() * 100), //区分事件标识
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
      colWidthMouseDownX: 0,
      mouseDownClientX: 0, //开始拖动鼠标点击clientX
      mouseCheckColType: null, //选择拖动的表格
      mouseCheckColKey: null, //选择拖动的列key
      handleTableStyleTime: null,
      mouseOverRowKey: -1,
      mouseClickRowKey: -1,
      isTooltipShow: false,
      tooltipTop: 0,
      tooltipLeft: 0,
      tooltipContent: ""
    };
  },
  computed: {
    //是否全选
    isAllCheck() {
      let allcheck = true;
      for (let m in this.mainData) {
        if (!this.mainData[m]["_disabled"] && !this.mainData[m]["_checked"]) {
          allcheck = false;
          break;
        }
      }
      if (allcheck) {
        let isAllDisabled = true;
        for (let m2 in this.mainData) {
          if (!this.mainData[m2]["_disabled"]) {
            isAllDisabled = false;
            break;
          }
        }
        if (isAllDisabled) {
          allcheck = false;
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
    //全选事件
    eventBus.$on("checkAll" + this.eventCreateTime, item => {
      let selectData = {};
      for (let d in this.data) {
        if (!this.mainData[d]._disabled) {
          selectData[d] = this.data[d];
          this.$set(this.mainData[d], "_checked", item);
        }
      }
      this.checkData = item ? selectData : {};
      this.$emit("table-change", this.objToArr(this.checkData));
    });
    //单选事件
    eventBus.$on("checkOne" + this.eventCreateTime, (item, columns) => {
      if (item) {
        this.checkData[columns._index] = this.data[columns._index];
      } else {
        delete this.checkData[columns._index];
      }
      this.$set(this.mainData[columns._index], "_checked", item);
      this.$emit("table-change", this.objToArr(this.checkData));
    });
    //气泡弹窗鼠标悬浮事件
    eventBus.$on("tipMouseOver" + this.eventCreateTime, item => {
      this.tooltipTop = item.bottom;
      this.tooltipLeft = item.left;
      this.tooltipContent = item.content;
      this.isTooltipShow = true;
    });
    //气泡弹窗鼠标离开事件
    eventBus.$on("tipMouseLeave" + this.eventCreateTime, item => {
      this.isTooltipShow = item;
    });
    //表格排序事件
    eventBus.$on("table-sort-change" + this.eventCreateTime, item => {
      switch (item.columnsType) {
        case "main":
          this.$set(this.mainColumns[item.columnsKey], "sortKey", item.sortKey);
          break;
        case "left":
          this.$set(this.leftColumns[item.columnsKey], "sortKey", item.sortkey);
          break;
        case "right":
          this.$set(
            this.rightColumns[item.columnsKey],
            "sortKey",
            item.sortkey
          );
          break;
      }
      let index = this.sortArr.findIndex((value, index, arr) => {
        return value.includes(item.sort);
      });
      if (index != -1) {
        this.sortArr.splice(index, 1);
      }
      switch (item.sortKey) {
        case 0:
          this.sortArr.push(item.sort + " asc");
          break;
        case 1:
          this.sortArr.push(item.sort + " desc");
          break;
      }
      this.$emit("table-sort", this.sortArr.join(","));
    });
  },
  mounted() {
    //初始化
    this.init();
    //定时检测更改表格样式
    this.handleTableStyleTime = setInterval(() => {
      this.handleTableStyle();
    }, 200);
  },
  destroyed() {
    clearInterval(this.handleTableStyleTime);
  },
  methods: {
    //对象转数组
    objToArr(obj) {
      let arr = [];
      for (let o in obj) {
        arr.push(obj[o]);
      }
      return arr;
    },
    //初始化
    init() {
      let nowTableHeight = Math.floor((document.body.clientHeight * 6.6) / 10);
      this.getShowDataRows(nowTableHeight);
      this.handleTableStyle();
      this.handleColumns();
      this.handleData();
    },
    //原始列数据处理
    handleColumns() {
      let mainColumns = [];
      let leftColumns = [];
      let rightColumns = [];
      let columns1 =
        this.editColumns.length > 0 ? this.editColumns : this.columns;
      let columns2 =
        this.editColumns.length > 0 ? this.columns : this.editColumns;

      //取出浮动非字段列
      if (this.editColumns.length > 0) {
        for (let col in this.columns) {
          if (!this.columns[col].key && this.columns[col].fixed) {
            switch (this.columns[col].fixed) {
              case "left":
                leftColumns.push(this.columns[col]);
                break;
              case "right":
                rightColumns.push(this.columns[col]);
                break;
            }
          }
        }
      }
      let avgWidth = this.handleAvgWidth();
      for (let c in columns1) {
        let columnsItem = { ...columns1[c] };
        //增加列宽
        if (typeof columnsItem.width == "undefined") {
          columnsItem.width = avgWidth;
        }

        //合并列的修改参数，调整位置，显示对应列
        if (columns2.length > 0) {
          for (let e in columns2) {
            if (columns2[e]["key"] == columnsItem["key"]) {
              columnsItem = {
                ...columns2[e],
                ...columnsItem
              };
              break;
            }
          }
        }

        //是否排序
        if (columnsItem.sortable) {
          columnsItem.sortKey = -1;
        }

        switch (columnsItem["fixed"]) {
          case "left":
            columnsItem["isShow"] = false;
            leftColumns.push(columnsItem);
            break;
          case "right":
            columnsItem["isShow"] = false;
            rightColumns.unshift(columnsItem);
            break;
          default:
            columnsItem["isShow"] = true;
            mainColumns.push(columnsItem);
            break;
        }
      }
      this.leftColumns = leftColumns;
      this.mainColumns = leftColumns.concat(mainColumns).concat(rightColumns);
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
    },
    //计算最大显示的行数
    getShowDataRows(tableHeight) {
      //计算最大显示的行数
      let showHideHeight = this.isTableBottom
        ? tableHeight - this.headerHeight - this.wheelHeight
        : tableHeight - this.headerHeight;
      let showDataRows = showHideHeight / (this.bodyRowHeight + 1);
      this.showDataRows = Math.ceil(showDataRows);
      if (showDataRows % 1 === 0) {
        this.extraHeight = 0;
      } else {
        this.extraHeight = (showDataRows % 1) * this.bodyRowHeight;
      }
    },
    //主体数据滚轮事件
    handleScroll(e) {
      //兼容浏览器
      if (e.type == "DOMMouseScroll") {
        if (e.detail > 0) {
          this.$refs["lin-table-hide-main"].scrollTop =
            this.tableScrollTop + this.bodyRowHeight;
        } else {
          this.$refs["lin-table-hide-main"].scrollTop =
            this.tableScrollTop - this.bodyRowHeight;
        }
      } else {
        if (e.deltaY > 0) {
          this.$refs["lin-table-hide-main"].scrollTop =
            this.tableScrollTop + this.bodyRowHeight;
        } else {
          this.$refs["lin-table-hide-main"].scrollTop =
            this.tableScrollTop - this.bodyRowHeight;
        }
      }
      this.tableScrollTop = this.$refs["lin-table-hide-main"].scrollTop;
    },

    //获取表格宽度
    getTableClientWidth() {
      this.tableClientWidth = this.$refs["lin-table-main"].clientWidth;
    },
    //获取显示首数据标识
    handleFirstDataKey(e) {
      let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
      this.tableScrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.$emit("table-scroll", e);
    },
    //按下宽度标识事件
    colWidthMouseDown(e, type, key) {
      let linTableLeft = this.$refs["lin-table"].getBoundingClientRect().left;
      this.colWidthMouseDownX = e.clientX - linTableLeft;
      this.$refs["drag-line"].style.left = e.clientX - linTableLeft + "px";
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
        this.colWidthMouseDownX + (e.clientX - this.mouseDownClientX) + "px";
    },
    //弹起宽度标识事件
    colWidthMouseUp(e) {
      if (this.mouseCheckColKey == null) return;
      switch (this.mouseCheckColType) {
        case "main":
          let mainWidth =
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
            (e.clientX - this.mouseDownClientX);
          let setMainWidth =
            mainWidth < this.minWidth ? this.minWidth : mainWidth;
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            setMainWidth
          );
          this.$emit("col-width-change", {
            key: this.mainColumns[this.mouseCheckColKey]["key"],
            width: setMainWidth
          });
          break;
        case "left":
          let leftWidth =
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
            (e.clientX - this.mouseDownClientX);
          let setLeftWidth =
            leftWidth < this.minWidth ? this.minWidth : leftWidth;
          this.$set(
            this.leftColumns[this.mouseCheckColKey],
            "width",
            setLeftWidth
          );
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            setLeftWidth
          );
          this.$emit("col-width-change", {
            key: this.leftColumns[this.mouseCheckColKey]["key"],
            width: setLeftWidth
          });
          break;
        case "right":
          let rightWidth =
            this.$refs["main-header-th"][
              this.mainColumns.length -
                this.rightColumns.length +
                this.mouseCheckColKey
            ].offsetWidth -
            (e.clientX - this.mouseDownClientX);
          let setRightWidth =
            rightWidth < this.minWidth ? this.minWidth : rightWidth;
          this.$set(
            this.mainColumns[
              this.mainColumns.length -
                this.rightColumns.length +
                this.mouseCheckColKey
            ],
            "width",
            setRightWidth
          );
          this.$set(
            this.rightColumns[this.mouseCheckColKey],
            "width",
            setRightWidth
          );
          this.$emit("col-width-change", {
            key: this.rightColumns[this.mouseCheckColKey]["key"],
            width: setRightWidth
          });
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
          setWidth += parseFloat(this.columns[c].width);
        } else {
          col++;
        }
      }
      let avgWidth = (tableClientWidth - this.columns.length - setWidth) / col;
      return avgWidth < 100 ? 100 : avgWidth;
    },
    //处理表格样式
    handleTableStyle() {
      //自动调整高度
      if (this.height == 0) this.autoTableHeight();
      //判断滚动条位置
      if (this.$refs["lin-table-hide-main"].scrollTop != this.tableScrollTop) {
        this.$refs["lin-table-hide-main"].scrollTop = this.tableScrollTop;
      }
      //获取表格总宽度
      this.getTableClientWidth();
      //判断列总宽度是否大于表格宽度
      let tableMainWidth = 0;
      for (let m in this.mainColumns) {
        if (typeof this.mainColumns[m].width != "undefined") {
          tableMainWidth += this.mainColumns[m].width;
        }
      }
      tableMainWidth -= this.mainColumns.length;
      if (tableMainWidth <= this.tableClientWidth) {
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
    //行鼠标悬浮事件
    mouseOverRow(key) {
      this.mouseOverRowKey = key;
    },
    //行鼠标离开事件
    mouseLeaveRow(key) {
      this.mouseOverRowKey = -1;
    },
    //行点击事件
    mouseClickRow(key) {
      this.mouseClickRowKey = key;
      this.$emit("table-row-click", this.mainData[key]);
    },
    //自动计算高度
    autoTableHeight() {
      let nowTableHeight = Math.floor((document.body.clientHeight * 6.6) / 10);
      if (this.tableHeight != nowTableHeight) {
        this.tableHeight = nowTableHeight;
        this.getShowDataRows(nowTableHeight);
      }
    },
    //重置表格
    resetTable() {
      this.mouseClickRowKey = -1;
      this.checkData = {};
      this.tableScrollTop = 0;
      this.$refs["lin-table-hide-main"].scrollTop = 0;
      this.$refs["lin-table-main"].scrollLeft = 0;
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

//tooltip 弹窗
.tooltip {
  width: 300px;
  max-height: 400px;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px;
  word-wrap: break-word;
  background-color: #212121;
  color: #fff;
  position: fixed;
  z-index: 9999;
}
</style>