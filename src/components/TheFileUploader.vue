<template>
  <input
    type="file"
    ref="input"
    accept="image/png, image/jpeg"
    style="position: absolute; left: -9999px"
    @change="onSelect"
  />
</template>
<script>
import { ref } from "vue";
export default {
  events: ["update:modelValue"],
  setup(props, { emit }) {
    const currentValue = ref([]);
    const input = ref(null);

    function isValidFile(file) {
      let invalidFeedback = "";

      if (file.name.lastIndexOf(".") <= 0) {
        invalidFeedback = "message.error.incorrectFile";
      }
      if (!file.type.match("image.*")) {
        invalidFeedback = "message.error.notImage";
      }
      if (file.size > 512000) {
        invalidFeedback = "message.error.filesizeLimit";
      }

      if (invalidFeedback) {
        // toast.error(invalidFeedback);
        return false;
      } else {
        return true;
      }
    }

    function reset() {
      input.value.value = "";
      currentValue.value = [];
    }
    function onSelect(e) {
      const files = e.target.files;
      for (const file of files) {
        if (file && isValidFile(file)) {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            currentValue.value.push({
              file: file,
              url: fileReader.result,
              key: Math.random()
            });
            if (currentValue.value.length === files.length) {
              emit("update:modelValue", currentValue.value);
              currentValue.value = [];
              input.value.value = "";
            }
          });
          fileReader.readAsDataURL(file);
        } else {
          reset(); // todo: проверить с каким-то тяжелым нормальным файлом и легким но невалидным, все ли удалятся из фронта
        }
      }
    }
    return {
      input,
      onSelect
    };
  }
};
</script>
