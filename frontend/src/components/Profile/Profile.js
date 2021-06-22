import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div class='card col-md-8 offset-2'>
        <h2 class="d-flex justify-content-center">Profile Information</h2>

        <div class='d-flex justify-content-center'>
          <div className='col-md-2 mb-3'>
            <img
              src={user.picture}
              alt='Profile'
              className='rounded-circle img-fluid profile-picture mb-3 mb-md-0'
            />
          </div>
        </div>

        <div class='form-group'>
          <fieldset disabled=''>
            <label class='form-label' for='disabledInput'>
              Name
            </label>
            <input
              class='form-control'
              id='readOnlyInput'
              type='text'
              placeholder={user.name}
              readonly=''
            />
          </fieldset>
        </div>

        <div class='form-group'>
          <fieldset>
            <label class='form-label mt-4' for='readOnlyInput'>
              Email
            </label>
            <input
              class='form-control'
              id='readOnlyInput'
              type='text'
              placeholder={user.email}
              readonly=''
            />
          </fieldset>
        </div>


        <div class='form-group'>
          <fieldset>
            <label class='form-label mt-4' for='readOnlyInput'>
              Locale
            </label>
            <input
              class='form-control'
              id='readOnlyInput'
              type='text'
              placeholder={user.locale}
              readonly=''
            />
          </fieldset>
        </div>

        <div class='form-group'>
          <fieldset>
            <label class='form-label mt-4' for='readOnlyInput'>
              Last Profile Update
            </label>
            <input
              class='form-control'
              id='readOnlyInput'
              type='text'
              placeholder={user.updated_at}
              readonly=''
            />
          </fieldset>
        </div>

        <br />

        <div class='form-group  d-flex justify-content-center'>
          <fieldset>
            <Button className='btn btn-primary' onClick={() => logout()}>
              Logout
            </Button>
          </fieldset>
        </div>
      </div>
    )
  );
};

export default Profile;
