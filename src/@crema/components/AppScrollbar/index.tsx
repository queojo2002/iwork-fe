import React, {ReactNode} from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styled from 'styled-components';

export const StyledScrollbar = styled(SimpleBarReact).withConfig({
  shouldForwardProp: (prop) => prop !== 'scrollToTop',
})`
  position: relative;
  width: 100%;
  height: 100%;

  & .simplebar-offset,
  & .simplebar-content-wrapper,
  & .simplebar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

// eslint-disable-next-line no-unused-vars
type AppScrollbarProps = {
  children: ReactNode;
  className?: string;
  scrollToTop?: boolean;

  [x: string]: any;
};

const AppScrollbarBase: React.FC<AppScrollbarProps> = ({
  children,
  className,
  scrollToTop: _scrollToTop, // consumed here, not forwarded to DOM
  ...others
}) => {
  return (
    <StyledScrollbar {...others} className={className}>
      {children}
    </StyledScrollbar>
  );
};

const AppScrollbar = styled(AppScrollbarBase).withConfig({
  shouldForwardProp: (prop) => prop !== 'scrollToTop',
})``;

export default AppScrollbar;
