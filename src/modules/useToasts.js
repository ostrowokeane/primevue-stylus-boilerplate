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

function showWarning({ title, body } = { title: null, body: null }) {
  toastManager.emit("toast", {
    severity: "warn",
    summary: title,
    detail: body,
    life: 5000
  });
}
function showSuccess({ title, body } = { title: null, body: null }) {
  toastManager.emit("toast", {
    severity: "success",
    summary: title,
    detail: body,
    life: 5000
  });
}
function showDanger({ title, body } = { title: null, body: null }) {
  toastManager.emit("toast", {
    severity: "error",
    summary: title,
    detail: body,
    life: 5000
  });
}
function toast(type = "error", title, body) {
  toastManager.emit("toast", {
    severity: type,
    summary: title,
    detail: body,
    life: 5000
  });
}

export default function useToasts() {
  return {
    toastManager,
    showToast,
    toast,
    showWarning,
    showDanger,
    showSuccess
  };
}
