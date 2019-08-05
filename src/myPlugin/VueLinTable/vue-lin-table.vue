<template>
  <div
    class="lin-table"
    :style="{height:height+'px'}"
  >
    <!--隐藏高度 -->
    <div
      ref="lin-table-hide-main"
      class="lin-table-hide-main"
      :style="{top:headerHeight+'px',bottom:0}"
      @scroll="handleHideScroll"
    >
      <div
        ref="hide-main-height"
        class="hide-main-height"
        :style="{height:hideHeight+'px'}"
      ></div>
    </div>
    <!-- 主体表格 -->
    <div
      ref="lin-table-main"
      class="lin-table-main"
      :style="{}"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
        :style="{width:isFullFixWidth?'auto':'100%'}"
      >
        <thead>
          <tr>
            <th
              ref="main-header-th"
              :class="{'hide-cell':!columnsItem.isShow,'header-th':true}"
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px'}"
            >
              <tableCellheader
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :allCheck="isAllCheck"
                @checkAll="checkAll"
                @sortChange="sortChange"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                class="cursor-col-resize-right"
                @mousedown="colWidthMouseDown($event,'main',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handlescroll"
          @mousewheel="handlescroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :style="{ backgroundColor:dataKey==mouseOverRowKey? '#ebf7ff':''}"
            @mouseleave="rowColor(dataKey,'leave')"
            @mouseover="rowColor(dataKey,'over')"
            @click="rowClick(dataItem)"
          >
            <td
              v-for="(columnsItem,columnsKey) in mainColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
              :class="columnsItem.isShow?'':'hide-cell'"
            >
              <tableCellbody
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataItem._index"
                @checkOne="checkOne"
              ></tableCellbody>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 左侧表格 -->
    <div
      ref="lin-table-left"
      class="lin-table-left"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
      >
        <thead>
          <tr>
            <th
              class="header-th"
              v-for="(columnsItem,columnsKey) in leftColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px',cursor:tableKey==''?'auto':'pointer'}"
              @click="openFieldPlace"
            >
              <tableCellheader
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :allCheck="isAllCheck"
                @checkAll="checkAll"
                @sortChange="sortChange"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                class="cursor-col-resize-right"
                @mousedown="colWidthMouseDown($event,'left',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handlescroll"
          @mousewheel="handlescroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :style="{ backgroundColor:dataKey==mouseOverRowKey? '#ebf7ff':''}"
            @mouseleave="rowColor(dataKey,'leave')"
            @mouseover="rowColor(dataKey,'over')"
            @click="rowClick(dataItem)"
          >
            <td
              v-for="(columnsItem,columnsKey) in leftColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
            >
              <tableCellbody
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataItem._index"
                @checkOne="checkOne"
              ></tableCellbody>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 右侧表格 -->
    <div
      ref="lin-table-right"
      class="lin-table-right"
    >
      <table
        :cellspacing="0"
        :cellpadding="0"
        :border="0"
      >
        <thead>
          <tr>
            <th
              class="header-th"
              v-for="(columnsItem,columnsKey) in rightColumns"
              :style="{width:columnsItem.width+'px',height:headerHeight+'px',cursor:tableKey==''?'auto':'pointer'}"
              @click="openFieldPlace"
            >
              <tableCellheader
                :columnsItem="columnsItem"
                :columnsKey="columnsKey"
                :allCheck="isAllCheck"
                @checkAll="checkAll"
                @sortChange="sortChange"
              ></tableCellheader>
              <!-- 拖动标识 -->
              <div
                class="cursor-col-resize-left"
                @mousedown="colWidthMouseDown($event,'right',columnsKey)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody
          @DOMMouseScroll="handlescroll"
          @mousewheel="handlescroll"
        >
          <tr
            v-for="(dataItem,dataKey) in showData"
            :style="{ backgroundColor:dataKey==mouseOverRowKey? '#ebf7ff':''}"
            @mouseleave="rowColor(dataKey,'leave')"
            @mouseover="rowColor(dataKey,'over')"
            @click="rowClick(dataItem)"
          >
            <td
              v-for="(columnsItem,columnsKey) in rightColumns"
              :style="{width:columnsItem.width+'px',height:bodyRowHeight+'px'}"
            >
              <tableCellbody
                :columnsItem="columnsItem"
                :dataItem="dataItem"
                :dataKey="dataItem._index"
                @checkOne="checkOne"
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
    <!-- 字段操作 -->
    <!-- 加载中 -->
  </div>
</template>
<script>
import tableCellheader from "./components/tableCellheader";
import tableCellbody from "./components/tableCellbody";
let isEditShowDataRows = false;
let defaultShowDataRows = null;
export default {
  name: "lin-table",
  components: {
    tableCellheader,
    tableCellbody
  },
  watch: {
    customColumns(newData) {
      this.handleFieldColumns();
    },
    customData(newData) {
      this.handleCustomData();
    }
  },
  props: {
    tableKey: {
      type: String, //表格key
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    //表头数据
    customColumns: {
      type: Array,
      default: () => []
    },
    //主体数据
    customData: {
      type: Array,
      default: () => []
    },
    //表格高度
    height: {
      type: [Number, String],
      default: 600
    },
    //头部高度
    headerHeight: {
      type: Number,
      default: 40
    },
    //主体行高
    bodyRowHeight: {
      type: Number,
      default: 30
    },
    //滚动条高度
    wheelHeight: {
      type: Number,
      default: 18
    },
    //最小列宽
    minColWidth: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      tableKeyStr: "", //表格标识
      versions: "", //版本
      selectData: {}, //选中数据
      mainData: [], //调整后数据
      mainColumns: [], //主体表格字段
      leftColumns: [], //左浮动表格字段
      rightColumns: [], //右浮动表格字段
      firstDataKey: 0, //显示数据首个下标
      avgWidth: 0, //平均列宽
      showDataRows: 0, //显示数据行数
      hideHeight: 0, //隐藏高度
      mouseDownClientX: 0, //开始拖动鼠标点击clientX
      mouseCheckColType: null, //选择拖动的表格
      mouseCheckColKey: null, //选择拖动的列key
      mouseOverRowKey: null, //鼠标当前悬浮行
      isFieldModal: false, //字段排序框显示隐藏
      isFullFixWidth: true //判断字段是否全部固定宽度
    };
  },
  computed: {
    showData() {
      //显示数据
      let start = this.firstDataKey;
      let end = this.firstDataKey + this.showDataRows;
      return this.mainData.slice(start, end);
    },
    //是否全选
    isAllCheck() {
      let isAllCheck = false;
      for (let s in this.mainData) {
        if (!this.mainData[s]._checked) {
          isAllCheck = false;
          break;
        } else {
          isAllCheck = true;
        }
      }
      return isAllCheck;
    }
  },
  mounted() {
    this.handleFieldColumns();
    this.handleCustomData();
  },
  methods: {
    //主体数据滚轮事件
    handlescroll(e) {
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
      if (
        this.$refs["lin-table-hide-main"].clientHeight +
          this.$refs["lin-table-hide-main"].scrollTop ==
        this.hideHeight
      ) {
        if (this.showDataRows >= defaultShowDataRows) {
          this.showDataRows--;
          isEditShowDataRows = true;
          let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
          this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight) + 1;
          return;
        }
      } else {
        if (this.showDataRows != defaultShowDataRows && isEditShowDataRows) {
          this.showDataRows++;
          isEditShowDataRows = false;
          let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
          this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
          return;
        }
      }
      let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
      console.log(
        this.$refs["lin-table-hide-main"].scrollTop,
        this.$refs["lin-table-hide-main"].scrollHeight
      );
      // this.handleShowData();
    },
    //滚动条拉动事件
    handleHideScroll() {
      this.handleShowData();
    },
    //处理显示数据
    handleShowData() {
      let scrollTop = this.$refs["lin-table-hide-main"].scrollTop;
      this.firstDataKey = Math.ceil(scrollTop / this.bodyRowHeight);
    },
    //数据处理函数
    handleCustomData() {
      this.mainData = [];
      for (let n in this.customData) {
        this.$set(this.mainData, n, this.customData[n]);
        this.$set(this.mainData[n], "_index", parseInt(n));
        if (typeof this.customData[n]["_checked"] == "undefined") {
          this.$set(this.mainData[n], "_checked", false);
        }

        if (typeof this.customData[n]["_disabled"] == "undefined") {
          this.$set(this.mainData[n], "_disabled", false);
        }
      }
      //计算隐藏高度
      this.hideHeight = this.customData.length * this.bodyRowHeight;
      if (this.$refs["lin-table-hide-main"].clientHeight < this.hideHeight) {
        this.$refs["lin-table-main"].style.right = this.wheelHeight + "px";
        this.$refs["lin-table-right"].style.right = this.wheelHeight + "px";
      }
      this.resetTable();
    },
    //设置字段列
    handleFieldColumns() {
      let mainColumns = [];
      let leftColumns = [];
      let rightColumns = [];
      let customColumns = this.customColumns;
      for (let c in customColumns) {
        let columnsItem = { ...customColumns[c] };
        //是否排序
        if (columnsItem["sortable"]) {
          columnsItem["sortKey"] = -1;
        }
        //分配字段
        if (typeof customColumns[c]["fixed"] != "undefined") {
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
      this.handleIsFullFixWidth();
    },
    handleIsFullFixWidth() {
      let isFullFixWidth = true;
      let width = 0;
      for (let m in this.mainColumns) {
        if (typeof this.mainColumns[m].width != "undefined") {
          width += this.mainColumns[m].width;
        } else {
          isFullFixWidth = false;
        }
      }
      if (this.$refs["lin-table-hide-main"].clientWidth <= width) {
        isFullFixWidth = false;
        this.$refs["lin-table-hide-main"].style.bottom =
          this.wheelHeight + "px";
        //计算显示条数
        this.showDataRows = Math.ceil(
          (this.height - this.headerHeight - this.wheelHeight) /
            this.bodyRowHeight
        );
      } else {
        //计算显示条数
        this.showDataRows = Math.ceil(
          (this.height - this.headerHeight) / this.bodyRowHeight
        );
      }
      if (defaultShowDataRows == null) defaultShowDataRows = this.showDataRows;
      this.isFullFixWidth = isFullFixWidth;
    },
    //对象转数组
    objToArr(obj) {
      let arr = [];
      for (let o in obj) {
        arr.push(obj[o]);
      }
      return arr;
    },
    //全选操作
    checkAll(isCheck) {
      let selectData = {};
      for (let d in this.customData) {
        if (!this.customData[d]._disabled) {
          this.$set(this.customData[d], "_checked", isCheck);
          if (isCheck) {
            selectData[d] = this.customData[d];
          }
        }
      }
      this.selectData = selectData;
      this.$emit("selectionChange", this.objToArr(this.selectData));
    },
    //单选操作
    checkOne(item) {
      if (item.isCheck) {
        this.selectData[item.dataKey] = this.customData[item.dataKey];
      } else {
        delete this.selectData[item.dataKey];
      }
      this.$emit("selectionChange", this.objToArr(this.selectData));
    },
    //鼠标移动数据行颜色变化
    rowColor(rowKey, type) {
      switch (type) {
        case "leave":
          this.mouseOverRowKey = null;
          break;
        case "over":
          this.mouseOverRowKey = rowKey;
          break;
      }
    },
    //数据行点击事件
    rowClick(data) {
      this.$emit("rowClick", data);
    },

    //打开字段操作框
    openFieldPlace() {
      if (this.tableKey == "") return;
      this.isFieldModal = true;
    },
    //字段排序
    sortChange(item) {
      let sortKey = this.mainColumns[item.columnsKey].sortKey;
      let orderArr = this.mainColumns[item.columnsKey].order;
      let key = this.mainColumns[item.columnsKey].key;
      let orderStr = "";
      switch (item.key) {
        case -1:
          switch (sortKey) {
            case -1:
              this.$set(this.mainColumns[item.columnsKey], "sortKey", 0);
              if (typeof orderArr == "undefined") {
                orderStr = key + " asc";
              } else {
                orderStr = orderArr[0];
              }
              break;
            case 0:
              this.$set(this.mainColumns[item.columnsKey], "sortKey", 1);
              if (typeof orderArr == "undefined") {
                orderStr = key + " desc";
              } else {
                orderStr = orderArr[1];
              }
              break;
            case 1:
              this.$set(this.mainColumns[item.columnsKey], "sortKey", -1);
              break;
          }
          break;
        case 0:
          this.$set(this.mainColumns[item.columnsKey], "sortKey", 0);
          if (typeof orderArr == "undefined") {
            orderStr = key + " asc";
          } else {
            orderStr = orderArr[0];
          }
          break;
        case 1:
          this.$set(this.mainColumns[item.columnsKey], "sortKey", 1);
          if (typeof orderArr == "undefined") {
            orderStr = key + " desc";
          } else {
            orderStr = orderArr[1];
          }
          break;
      }
      this.$emit("sortChange", orderStr);
    },
    //保存数据
    saveFieldData(data) {
      let getLocalField = this.getLocalField();
      getLocalField[this.tableKeyStr] = { ...data, versions: this.versions };
      let userKey = window.localStorage.getItem("userKey");
      window.localStorage.setItem(
        "tableField_" + userKey,
        JSON.stringify(getLocalField)
      );
      this.handleFieldColumns();
      this.$Message.success({ content: "保存成功" });
      this.isFieldModal = false;
    },
    //初始化表格参数
    initTableKey() {
      if (typeof this.tableKey != "undefined") {
        let tableKeyArr = this.tableKey.split("-");
        this.tableKeyStr = tableKeyArr[0];
        this.versions = tableKeyArr[1];
        let getLocalField = this.getLocalField();
        if (
          typeof getLocalField[this.tableKeyStr] != "undefined" &&
          getLocalField[this.tableKeyStr].versions != this.versions
        ) {
          delete getLocalField[this.tableKeyStr];
          let userKey = window.localStorage.getItem("userKey");
          window.localStorage.setItem(
            "tableField_" + userKey,
            JSON.stringify(getLocalField)
          );
        }
      }
    },
    //获取本地表格字段缓存
    getLocalField() {
      let userKey = window.localStorage.getItem("userKey");
      let tableField = window.localStorage.getItem("tableField_" + userKey);
      let tableFieldObj = tableField != null ? JSON.parse(tableField) : {};
      return tableFieldObj;
    },
    //重置表格
    resetTable() {
      //清空选择数据
      this.selectData = {};
    },
    colWidthMouseDown(e, type, key) {
      this.$refs["drag-line"].style.left = e.clientX - 10 + "px";
      this.mouseDownClientX = e.clientX;
      this.mouseCheckColType = type;
      this.mouseCheckColKey = key;
      document.body.addEventListener("mouseup", this.colWidthMouseUp);
      document.body.addEventListener("mousemove", this.colWidthMouseMove);
      console.log(e, key);
    },
    colWidthMouseMove(e) {
      if (this.mouseCheckColKey == null) return;
      if (this.mouseDownClientX > e.clientX - 10) {
      }

      this.$refs["drag-line"].style.left = e.clientX - 10 + "px";
    },
    colWidthMouseUp(e) {
      if (this.mouseCheckColKey == null) return;
      console.log(e);
      switch (this.mouseCheckColType) {
        case "main":
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
              (e.clientX - this.mouseDownClientX)
          );
          break;
        case "left":
          let leftWidth =
            this.$refs["main-header-th"][this.mouseCheckColKey].offsetWidth +
            (e.clientX - this.mouseDownClientX);
          this.$set(
            this.leftColumns[this.mouseCheckColKey],
            "width",
            leftWidth
          );
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            leftWidth
          );
          break;
        case "right":
          let rightWidth =
            this.$refs["main-header-th"][
              this.mainColumns.length - 1 - this.mouseCheckColKey
            ].offsetWidth -
            (e.clientX - this.mouseDownClientX);
          this.$set(
            this.mainColumns[this.mouseCheckColKey],
            "width",
            rightWidth
          );
          this.$set(
            this.rightColumns[this.mouseCheckColKey],
            "width",
            rightWidth
          );
          break;
      }

      document.body.removeEventListener("mouseup", this.colWidthMouseUp);
      document.body.removeEventListener("mousemove", this.colWidthMouseMove);
      this.mouseCheckColType = null;
      this.mouseCheckColKey = null;
      this.$refs["drag-line"].style.left = "-100px";
      this.handleIsFullFixWidth();
    }
  }
};
</script>
<style lang="less" scoped>
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

.lin-table {
  width: 100%;
  background-color: #f8f8f9;
  border: 1px solid #dcdee2;
  position: relative;
  overflow: hidden;
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
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  -webkit-box-shadow: 3px 0 6px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.2);
}
.lin-table-right {
  width: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  -webkit-box-shadow: -3px 0 6px rgba(0, 0, 0, 0.2);
  box-shadow: -3px 0 6px rgba(0, 0, 0, 0.2);
}
.lin-table-hide-main {
  position: absolute;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
}
.hide-main-height {
  width: 100%;
}
//加载中
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
//隐藏
.hide-cell {
  visibility: hidden;
}

.header-th {
  position: relative;
}

//鼠标标识(左侧)
.cursor-col-resize-left {
  width: 10px;
  cursor: col-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

//鼠标标识(右侧)
.cursor-col-resize-right {
  width: 10px;
  cursor: col-resize;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.drag-line {
  width: 1px;
  background-color: #e8eaec;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100px;
  z-index: 4;
}
</style>
