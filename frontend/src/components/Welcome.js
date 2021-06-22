import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import LoginButton from './LoginButton';

const Welcome = () => {

  return (
    <div>
      <Container>
        <Container>
          <Container>
            <Container>
              <Container class="col-md-6">
              <div class="card text-center bg-light align-content-center">
                <div class="card-header">
                <h3>Welcome To Our Chat App</h3>
                </div>
                <h6>
                  Signup and chat with Friends Around the world... life made easy
                </h6>
                <br />
                <LoginButton />
              </div>
            </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default Welcome;
