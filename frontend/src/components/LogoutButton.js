import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <Button className='btn btn-dark' onClick={() => logout()}>
        Log Out
      </Button>
    </div>
  );
};

export default LogoutButton;
