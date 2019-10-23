<template>
  <div id="app">
    <lin-table
      height="300"
      :columns="customColumns"
      :data="customData"
    ></lin-table>
  </div>
</template>

<script>
import linTable from "./components/VueLinTable/vue-lin-table.vue"
export default {
  name: "app",
  components: {
    linTable
  },
  data() {
    return {
      customColumns: [
        {
          type: "selection",
          fixed: "left",
          width: 60
        },
        {
          key: "id",
          width: 80,
          title: "编号"
        },
        {
          key: "name",
          title: "名称"
        },
        {
          key: "age",
          title: "年龄",
          width: 60
        },
        {
          key: "status",
          title: "状态",
          fixed: "right",
          width: 60,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("div", { style: { color: "green" } }, "正常");
            } else {
              return h("div", { style: { color: "red" } }, "异常");
            }
          }
        }
      ],
      customData: [
        { id: 1, name: "test1", age: 10, status: 1 },
        { id: 2, name: "test2", age: 10, status: 0 },
        { id: 3, name: "test3", age: 10, status: 1 },
        { id: 4, name: "test4", age: 10, status: 0 },
        { id: 5, name: "test5", age: 10, status: 1 }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

