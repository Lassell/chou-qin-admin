import { DirectiveBinding, ObjectDirective } from "vue";

/**
 * 针对element-plus下拉框的无限滚动
 */
export const infinityScroll: ObjectDirective = {
  mounted(el: Element, binding: DirectiveBinding) {
    const elPopperId = el.children[0]?.getAttribute("aria-describedby");
    const SELECTWRAP_DOM: Element | null = document.querySelector(`#${elPopperId} .el-select-dropdown__wrap`);
    if (SELECTWRAP_DOM) {
      SELECTWRAP_DOM.addEventListener("scroll", () => {
        const _this = SELECTWRAP_DOM;
        const CONDITION = _this.scrollHeight - _this.scrollTop <= _this.clientHeight;
        if (CONDITION) {
          binding.value();
        }
      });
    }
  },
};
