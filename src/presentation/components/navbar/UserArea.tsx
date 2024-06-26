import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  User,
} from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';
import { useAuthStatus } from '../../layouts/useAuthStatus';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../utils/storage';
import { removeAuthorizationHeader } from '../../../api/client';

const UserArea = () => {
  const { data, isPending } = useAuthStatus();
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.remove('accessToken');
    removeAuthorizationHeader();
    navigate('/login');
  };

  return isPending ? (
    <Spinner />
  ) : (
    <Dropdown>
      <DropdownTrigger>
        <User
          className="cursor-pointer"
          name={data?.username}
          avatarProps={{
            src: '',
            showFallback: true,
            fallback: <IconUserFilled />,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={handleLogout}
          className="capitalize"
          variant="flat"
        >
          salir
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserArea;
