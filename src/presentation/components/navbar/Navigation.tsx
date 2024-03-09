// import {
//   Navbar,
//   NavbarBrand,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Divider,
//   // Button,
// } from '@nextui-org/react';
// import Logo from '../../layouts/Logo';
// import { ConfigModal, DocumentsDropDown } from '..';
// import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';

// export default function Navigation() {
//   return (
//     <Navbar isBordered shouldHideOnScroll className="h-20">
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarContent className="sm:hidden pr-3" justify="center">
//         <NavbarBrand>
//           <Logo />
//         </NavbarBrand>
//         <NavbarItem>
//           <Link href="#">
//             <ThemeSwitcher />
//           </Link>
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex sm:w-full sm:content-between flex-1 gap-4"
//         justify="center"
//       >
//         <NavbarBrand>
//           <Logo />
//         </NavbarBrand>
//         <NavbarItem>
//           <Link href="/chat-bot">Chat Bot</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <ConfigModal />
//         </NavbarItem>
//         <NavbarItem>
//           <Link href="#" aria-current="page">
//             <DocumentsDropDown />
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link href="#">Integrations</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link href="#">
//             <ThemeSwitcher />
//           </Link>
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarMenu className="flex flex-col p-7 list-none items-center gap-6 ">
//         <Divider />
//         <NavbarMenuItem>
//           <Link href="/chat-bot">Chat Bot</Link>
//         </NavbarMenuItem>
//         <Divider />
//         <NavbarMenuItem isActive>
//           <DocumentsDropDown />
//         </NavbarMenuItem>
//         <Divider />
//       </NavbarMenu>
//     </Navbar>
//   );
// }
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
  Button,
} from '@nextui-org/react';
import Logo from '../../layouts/Logo';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

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
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
