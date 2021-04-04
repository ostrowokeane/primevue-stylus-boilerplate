<template>
  <div id="app">
    <router-view />
    <ConfirmDialog></ConfirmDialog>
    <Toast :baseZIndex="20000" position="top-center" />
  </div>
</template>

<script>
import useToasts from "./modules/useToasts";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    // making showToast function awailable everywhere:
    const toast = useToast();
    const { toastManager } = useToasts();
    toastManager.on("toast", object => {
      toast.add(object);
    });

    return {};
  }
};
</script>

<style lang="stylus">
html, body {
  margin: 0;
  padding: 0;
  background-color: var(--surface-b);
  color: var(--text-color)
  font-family: var(--font-family)
  font-size: 12px
}
a {
  color: var(--text-color)
}
.p-link {
  color: var(--text-color)
  text-decoration: none
  font-weight: bold
}
.p-no-outline {
  box-shadow: none !important
}
.w-auto {
  width: auto !important
}
.w-100 {
  width: 100% !important
}
</style>
