import Vue from 'vue'
export default new Vue({
    data() {
        return {
            checkData: {}
        };
    },
    methods: {
        //对象转数组
        objToArr(obj) {
            let arr = [];
            for (let o in obj) {
                arr.push(obj[o]);
            }
            return arr;
        }
    }
});