import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/Home/Home.tsx"),
    {
        path: "/secondpage",
        file: "routes/SecondPageThankYouForComing/ThankYouForComing.tsx",
        caseSensitive: false,
    },
    {
        path: "/third-page",
        file: "routes/ThirdPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/fourth-page",
        file: "routes/FourthPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/fifth-page",
        file: "routes/FifthPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/sixth-page",
        file: "routes/SixthPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/iamsorry-page",
        file: "routes/IAmSorryPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/seventh-page",
        file: "routes/SeventhPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/eight-page",
        file: "routes/EightPage.tsx",
        caseSensitive: false,
    },
    {
        path: "/ninth-page",
        file: "routes/NinthPage.tsx",
        caseSensitive: false,

    },
    {
        path: "/tenth-page",
        file: "routes/TenthPage.tsx",
        caseSensitive: false,

    },
    {
        path: "/GoodBye-page",
        file: "routes/GoodBye.tsx",
        caseSensitive: false,

    },
] satisfies RouteConfig;
