import { BiAlignLeft } from "react-icons/bi";

const routesConfig = [
  {
    id: "app",
    title: "Sample",
    messageId: "sidebar.sample",
    type: "group",
    icon: <BiAlignLeft />,
    children: [
      {
        id: "page-1",
        title: "Page 12",
        messageId: "sidebar.sample.page1",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/sample/page-1",
      },
      {
        id: "page-2",
        title: "Page 2",
        messageId: "sidebar.sample.page2",
        type: "collapse",
        icon: <BiAlignLeft />,
        url: "/sample/page-2",
        children: [
          {
            id: "area",
            title: "Area Chart",
            messageId: "sidebar.recharts.areaChart",
            url: "/third-party/recharts/area",
          },
        ],
      },
    ],
  },
];
export default routesConfig;
