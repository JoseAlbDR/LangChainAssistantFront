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
import DocumentUploadModal from '../documents/DocumentUploadModal';
import UserArea from './UserArea';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      isBordered
      className="h-20 bg-primary bg-opacity-0"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-3">
          <FalloutGuy />
          
         
        </NavbarBrand>
      </NavbarContent>

     
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <UserArea />
        </NavbarItem>
        <NavbarItem className="flex"></NavbarItem>
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
