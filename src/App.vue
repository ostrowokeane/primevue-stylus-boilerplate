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
