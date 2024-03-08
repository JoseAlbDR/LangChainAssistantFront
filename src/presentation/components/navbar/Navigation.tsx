import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
  // Button,
} from '@nextui-org/react';
import Logo from '../../layouts/Logo';
import { DocumentsDropDown } from '..';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';

export default function Navigation() {
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      className="h-20 bg-primary bg-opacity-15 border border-b-secondary text-foreground "
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarItem>
          <Link href="#">
            <ThemeSwitcher />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex sm:w-full sm:content-between flex-1 gap-4"
        justify="center"
      >
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarItem>
          <Link href="/chat-bot">Chat Bot</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            <DocumentsDropDown />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Integrations</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            <ThemeSwitcher />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex flex-col p-7 list-none items-center gap-6 ">
        <Divider />
        <NavbarMenuItem>
          <Link href="/chat-bot">Chat Bot</Link>
        </NavbarMenuItem>
        <Divider />
        <NavbarMenuItem isActive>
          <DocumentsDropDown />
        </NavbarMenuItem>
        <Divider />
        {/* {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))} */}
      </NavbarMenu>
    </Navbar>
  );
}
