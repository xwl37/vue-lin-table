<template>
  <div id="app">
    <!-- <lin-table
      :height="400"
      :customColumns="customColumns"
      :customData="customData"
    ></lin-table> -->
    <linTable2
      :height="400"
      :columns="customColumns"
      :data="customData"
    ></linTable2>
  </div>
</template>

<script>
import linTable from "../src/myPlugin/VueLinTable/vue-lin-table.vue";
import linTable2 from "./myPlugin/VueLinTable2/vue-lin-table";
export default {
  name: "app",
  components: {
    linTable,
    linTable2
  },
  data() {
    return {
      customColumns: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "id",
          title: "编号"
        },
        {
          key: "name",
          title: "名称",
          width: 200
        },
        {
          key: "age",
          title: "年龄",
          width: 200
        },
        {
          key: "status",
          width: 200,
          title: "状态",
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("div", { style: { color: "green" } }, "正常");
            } else {
              return h("div", { style: { color: "red" } }, "异常");
            }
          }
        },
        {
          title: "操作",
          width: 100,
          render: (h, params) => {
            return h("button", "确定");
          }
        }
      ],
      customData: [
        { id: 1, name: "test1", age: 10, status: 1 },
        { id: 2, name: "test2", age: 10, status: 0 },
        { id: 3, name: "test3", age: 10, status: 1 },
        { id: 4, name: "test4", age: 10, status: 0 },
        { id: 5, name: "test5", age: 10, status: 1 },
        { id: 6, name: "test6", age: 10, status: 0 },
        { id: 7, name: "test7", age: 10, status: 1 },
        { id: 8, name: "test8", age: 10, status: 0 },
        { id: 9, name: "test9", age: 10, status: 1 },
        { id: 10, name: "test10", age: 10, status: 1 },
        { id: 11, name: "test11", age: 10, status: 1 },
        { id: 12, name: "test12", age: 10, status: 1 },
        { id: 13, name: "test13", age: 10, status: 1 },
        { id: 14, name: "test14", age: 10, status: 1 },
        { id: 15, name: "test15", age: 10, status: 1 },
        { id: 16, name: "test16", age: 10, status: 1 },
        { id: 17, name: "test17", age: 10, status: 1 },
        { id: 18, name: "test18", age: 10, status: 1 },
        { id: 19, name: "test19", age: 10, status: 1 },
        { id: 20, name: "test20", age: 10, status: 1 },
        { id: 21, name: "test21", age: 10, status: 1 }
      ]
    };
  }
};
</script>

<style>
</style>
