import {EgretLoadable} from "egret";

const AppSnackbar = EgretLoadable({
    loader: () => import("./snackbar/AppSnackbar")
});
const AppDialog = EgretLoadable({
    loader: () => import("./dialog/AppDialog")
});
const AppExpansionPanel = EgretLoadable({
    loader: () => import("./expansion-panel/AppExpansionPanel")
});
const AppAutoComplete = EgretLoadable({
    loader: () => import("./auto-complete/AppAutoComplete")
});
const AppSlider = EgretLoadable({
    loader: () => import("./slider/AppSlider")
});
const AppRadio = EgretLoadable({
    loader: () => import("./radio/AppRadio")
});
const AppSwitch = EgretLoadable({
    loader: () => import("./switch/AppSwitch")
});
const AppCheckbox = EgretLoadable({
    loader: () => import("./checkbox/AppCheckbox")
});
const AppMenu = EgretLoadable({
    loader: () => import("./menu/AppMenu")
});
const AppProgress = EgretLoadable({
    loader: () => import("./AppProgress")
});
const AppIcon = EgretLoadable({
    loader: () => import("./icons/AppIcon")
});
const AppButton = EgretLoadable({
    loader: () => import("./buttons/AppButton")
});
const AppForm = EgretLoadable({
    loader: () => import("./forms/AppForm")
});
const AppTable = EgretLoadable({
    loader: () => import("./tables/AppTable")
});


const materialRoutes = [
    {
        path: "/material/table",
        component: AppTable
    },
    {
        path: "/material/form",
        component: AppForm
    },
    {
        path: "/material/buttons",
        component: AppButton
    },
    {
        path: "/material/icons",
        component: AppIcon
    },
    {
        path: "/material/progress",
        component: AppProgress
    },
    {
        path: "/material/menu",
        component: AppMenu
    },
    {
        path: "/material/checkbox",
        component: AppCheckbox
    },
    {
        path: "/material/switch",
        component: AppSwitch
    },
    {
        path: "/material/radio",
        component: AppRadio
    },
    {
        path: "/material/slider",
        component: AppSlider
    },
    {
        path: "/material/autocomplete",
        component: AppAutoComplete
    },
    {
        path: "/material/expansion-panel",
        component: AppExpansionPanel
    },
    {
        path: "/material/dialog",
        component: AppDialog
    },
    {
        path: "/material/snackbar",
        component: AppSnackbar
    },
]

export default materialRoutes;
