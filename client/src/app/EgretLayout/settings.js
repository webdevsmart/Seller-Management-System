import layout1Settings from "./Layout1/Layout1Settings";
import layout2Settings from "./Layout2/Layout2Settings";
import { themeColors } from "./EgretTheme/themeColors";
import { createMuiTheme } from "@material-ui/core";
import { forEach, merge } from "lodash";
import themeOptions from "./EgretTheme/themeOptions";

function createEgretThemes() {
  let themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createMuiTheme(merge({}, themeOptions, value));
  });
  return themes;
}
const themes = createEgretThemes();

export const EgretLayoutSettings = {
  activeLayout: "layout1", // layout1, layout2
  activeTheme: "purple1", // View all valid theme colors inside EgretTheme/themeColors.js
  perfectScrollbar: true,

  themes: themes,
  layout1Settings, // open Layout1/Layout1Settings.js
  layout2Settings, // open Layout1/Layout2Settings.js

  secondarySidebar: {
    show: false,
    theme: "slateDark1" // View all valid theme colors inside EgretTheme/themeColors.js
  },
  // Footer options
  footer: {
    show: false,
    fixed: false,
    theme: "slateDark1" // View all valid theme colors inside EgretTheme/themeColors.js
  }
};
