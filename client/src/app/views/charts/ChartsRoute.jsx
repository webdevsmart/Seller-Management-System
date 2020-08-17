import {EgretLoadable} from "egret";

const AppEchart = EgretLoadable({
  loader: () => import("./echarts/AppEchart")
});

const AppRechart = EgretLoadable({
  loader: () => import("./recharts/AppRechart")
});

const AppVictoryChart = EgretLoadable({
  loader: () => import("./victory-charts/AppVictoryChart")
});

const AppReactVis = EgretLoadable({
  loader: () => import("./react-vis/AppReactVis")
});

const chartsRoute = [
  {
    path: "/charts/echarts",
    component: AppEchart
  },
  {
    path: "/charts/recharts",
    component: AppRechart
  },
  {
    path: "/charts/victory-charts",
    component: AppVictoryChart
  },
  {
    path: "/charts/react-vis",
    component: AppReactVis
  }
];

export default chartsRoute;
