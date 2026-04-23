import React, { Ref } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

// Extend NavLinkProps to add optional activeClassName support
type AppNavLinkProps = Omit<NavLinkProps, 'className'> & {
  activeClassName?: string;
  className?: string;
};

const AppNavLink = React.forwardRef<HTMLAnchorElement, AppNavLinkProps>(
  ({ activeClassName = '', className, ...rest }, ref) => {
    return (
      <NavLink
        ref={ref}
        {...rest}
        className={({ isActive }) => {
          const base = className ?? '';
          return isActive ? `${activeClassName} ${base}`.trim() : base;
        }}
      />
    );
  },
);

AppNavLink.displayName = 'AppNavLink';

export default AppNavLink;
