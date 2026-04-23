import React, { CSSProperties } from 'react';

type AppAnimateGroupProps = {
  children: React.ReactNode;
  // Legacy animation props (kept for API compatibility but not forwarded to DOM)
  type?: string;
  animateStyle?: CSSProperties;
  delay?: number;
  interval?: number;
  duration?: number;
  // Standard HTML div props
  style?: CSSProperties;
  className?: string;
  [x: string]: any;
};

const AppAnimateGroup: React.FC<AppAnimateGroupProps> = ({
  children,
  // Extract animation-only props so they are NOT forwarded to DOM
  type: _type,
  animateStyle,
  delay: _delay,
  interval: _interval,
  duration: _duration,
  style,
  ...rest
}) => {
  // Merge animateStyle into style so flex/layout hints still apply
  const mergedStyle: CSSProperties | undefined =
    animateStyle || style ? { ...animateStyle, ...style } : undefined;

  return (
    <div style={mergedStyle} {...rest}>
      {children}
    </div>
  );
};

export default AppAnimateGroup;
