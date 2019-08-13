<template>
  <label class="lin-checkbox-label lin-checkbox-anim">
    <input
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="value"
      @change="change"
    >
    <i class="lin-checkbox"></i>
    <slot></slot>
  </label>
</template>
<script>
export default {
  name: "check-box",
  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(item) {
      this.$emit("input", item.target.checked);
      this.$emit("on-change", item.target.checked);
    }
  }
};
</script>
<style lang="less" scoped>
label {
  cursor: pointer !important;
}
label.lin-checkbox-label input[type="checkbox"] {
  display: none;
}
label.lin-checkbox-label .lin-checkbox {
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
  vertical-align: -2px;
}
label.lin-checkbox-label input[type="checkbox"]:checked + .lin-checkbox:after {
  position: absolute;
  content: "";
  width: 8px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(-50%, -50%);
  top: 5%;
  left: 55%;
}
label.lin-checkbox-label input[type="checkbox"]:checked + .lin-checkbox {
  background-color: #2e8cf0;
}
label.lin-checkbox-label input[type="checkbox"]:disabled + .lin-checkbox {
  background-color: #e8e8e8;
  border: 1px solid #979797;
}
label.lin-checkbox-label
  input[type="checkbox"]:disabled:checked
  + .lin-checkbox:after {
  border-color: #000;
}
label.lin-checkbox-label.lin-checkbox-anim .lin-checkbox {
  -webkit-transition: background-color ease-in-out 0.3s;
  transition: background-color ease-in-out 0.3s;
}
</style>