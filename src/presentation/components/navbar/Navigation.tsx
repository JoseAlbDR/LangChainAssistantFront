import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Divider,
} from '@nextui-org/react';
import Logo from '../../layouts/Logo';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { ConfigModal, DocumentsDropDown } from '..';
import FalloutGuy from './FalloutGuy';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      isBordered
      className="h-20 bg-primary bg-opacity-15"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-3">
          <FalloutGuy />
          <Logo />
          <ConfigModal />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/chatgpt" color="foreground">
            Chat Bot
          </Link>
        </NavbarItem>
        <NavbarItem>
          <DocumentsDropDown />
        </NavbarItem>
        <NavbarItem>
          <Link href="/documents" color="foreground">
            Documentos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex items-center content-center gap-3">
        <Divider />
        <NavbarMenuItem>
          <Link href="/chatgpt" color="foreground" size="lg" className="w-full">
            Chat Bot
          </Link>
        </NavbarMenuItem>
        <Divider />
        <NavbarMenuItem>
          <DocumentsDropDown />
        </NavbarMenuItem>
        <Divider />
      </NavbarMenu>
    </Navbar>
  );
}
