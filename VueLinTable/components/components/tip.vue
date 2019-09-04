<template>
  <div
    ref="tip"
    class="tip"
    @mouseover="tipMouseOver"
    @mouseleave="tipMouseLeave"
  >
    <slot></slot>
  </div>
</template>
<script>
import eventBus from "../eventBus";
export default {
  name: "tip",
  props: {
    eventCreateTime: String
  },
  data() {
    return {};
  },
  methods: {
    tipMouseOver(e) {
      if (this.$refs["tip"].clientWidth >= this.$refs["tip"].scrollWidth)
        return;
      this.$refs["tip"].style.cursor = "pointer";
      let tip = this.$refs["tip"].getBoundingClientRect();
      eventBus.$emit("tipMouseOver" + this.eventCreateTime, {
        left: tip.left,
        right: tip.right,
        top: tip.top,
        bottom: tip.bottom,
        content: this.$refs["tip"].innerText
      });
    },
    tipMouseLeave() {
      if (this.$refs["tip"].clientWidth >= this.$refs["tip"].scrollWidth)
        return;
      this.$refs["tip"].style.cursor = "auto";
      eventBus.$emit("tipMouseLeave" + this.eventCreateTime, false);
    }
  }
};
</script>
<style lang="less" scoped>
.tip {
  max-width: 200px;
}
</style>