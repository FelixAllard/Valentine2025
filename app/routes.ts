import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/Home/Home.tsx"),
    {
        path: "/secondpage",
        file: "routes/SecondPageThankYouForComing/ThankYouForComing.tsx",
        caseSensitive: false,
    }
] satisfies RouteConfig;
