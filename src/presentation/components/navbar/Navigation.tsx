import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import FalloutGuyDark from './FalloutGuyDark';
import UserArea from './UserArea';
import FalloutGuyLight from './FalloutGuyLight';

interface Props {
  dark: boolean;
}

export default function Navigation({ dark }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="h-20 bg-opacity-0"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-3">
          {dark ? <FalloutGuyLight /> : <FalloutGuyDark />}
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <UserArea />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
