// import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

// import "./assets/_overrides.scss";
// import "primeflex/primeflex.min.css";
import "normalize.css/normalize.css";
import "./assets/style/main.styl";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import TheFileUploader from "@/components/TheFileUploader";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import FileUpload from "primevue/fileupload";
import Dropdown from "primevue/dropdown";
import Carousel from "primevue/carousel";
import Menu from "primevue/menu";
import Checkbox from "primevue/checkbox";
import Toolbar from "primevue/toolbar";
import ConfirmDialog from "primevue/confirmdialog";

const app = createApp(App);

app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, { ripple: true });

app.component("TheFileUploader", TheFileUploader);

app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Dialog", Dialog);
app.component("Badge", Badge);
app.component("Avatar", Avatar);
app.component("Textarea", Textarea);
app.component("RadioButton", RadioButton);
app.component("FileUpload", FileUpload);
app.component("Dropdown", Dropdown);
app.component("Carousel", Carousel);
app.component("Menu", Menu);
app.component("Checkbox", Checkbox);
app.component("Toolbar", Toolbar);
app.component("ConfirmDialog", ConfirmDialog);

// import bridge from "@vkontakte/vk-bridge";
// app.provide("bridge", bridge);

app.mount("#app");
