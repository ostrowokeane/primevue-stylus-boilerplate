import { reactive } from "vue";

const loader = reactive({
  loading: false,
  show() {
    this.loading = true;
  },
  hide() {
    this.loading = false;
  }
});

export default function useGlobalLoader() {
  return loader;
}
