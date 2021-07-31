import { reactive } from "vue";

export default function useModal(display = false) {
  const modal = reactive({
    display,
    open() {
      this.display = true;
    },
    close() {
      this.display = false;
    }
  });
  return {
    modal
  };
}
