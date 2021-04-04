import mitt from "mitt";

const toastManager = mitt();

function showToast(
  { severity, summary, detail, life } = {
    severity: "info",
    summary: null,
    detail: null,
    life: 5000
  }
) {
  toastManager.emit("toast", { severity, summary, detail, life });
}

export default function useToasts() {
  return {
    toastManager,
    showToast
  };
}
