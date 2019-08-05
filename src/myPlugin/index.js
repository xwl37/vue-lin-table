import VueLinTable from "./VueLinTable/vue-lin-table.vue";
VueLinTable.install = Vue=>{
    Vue.component(VueLinTable.name,VueLinTable);
    Vue.use(VueLinTable);
}
export default VueLinTable;