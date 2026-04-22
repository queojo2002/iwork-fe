import { Progress } from "antd";
import React from "react";

interface AppCircularProgressProps {
  percent?: number;
  [x: string]: any;
}

const AppCircularProgress: React.FC<AppCircularProgressProps> = ({
  percent,
  ...rest
}) => {
  return <Progress type="circle" percent={percent} {...rest} />;
};
export default AppCircularProgress;
