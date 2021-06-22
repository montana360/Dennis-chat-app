import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { Container, Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

const socket = io();

const Chat = () => {
  const { user, isAuthenticated } = useAuth0();

  const { userData, setUserData } = useContext(UserContext);

  const [chatUsers, setChatUsers] = useState([]);

  const [messageList, setMessageList] = useState([]);

  const [currentRoom, setCurrentRoom] = useState(user.name);

  const [chatMessage, setChatMessage] = useState({
    name: '',
    message: '',
    room: '',
    isPrivate: false,
  });

  useEffect(() => {
    socket.emit('userJoin', user.name);
  }, []);

  // listening for new and current users in the system
  socket.on('userList', (userList) => {
    setChatUsers(userList);
    setChatMessage({ name: user.name, message: chatMessage.message });
  });

  const handleChange = (e) => {
    setChatMessage({ ...chatMessage, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.emit('userJoin', user.name);
  }, []);

  // listening to new messages from the server
  socket.on('newMessage', (newMessage) => {
    setMessageList([
      ...messageList,
      {
        name: newMessage.name,
        message: newMessage.message,
        isPrivate: newMessage.isPrivate,
      },
    ]);
  });

  const newMessageSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name: chatMessage.name,
      message: chatMessage.message,
      room: currentRoom,
      isPrivate: privateChat(currentRoom, chatUsers),
    };

    socket.emit('newMessage', newMessage);

    setChatMessage({
      name: user.name,
      message: '',
    });
  };

  const enteringRoom = (e) => {
    let oldRoom = currentRoom;
    let newRoom = e.target.textContent;
    setCurrentRoom(newRoom);
    socket.emit('roomEntered', { oldRoom, newRoom });
    setMessageList([]);
  };

  const privateChat = (roomname, userList) => {
    let isPrivate = false;
    userList.forEach((username) => {
      if (username === roomname) {
        isPrivate = true;
      }
    });

    return isPrivate;
  };

  return (
    isAuthenticated && (
      <div>
        <Container>
          <Row>
            <Col
              xs={5}
              style={{ border: '2px solid white', borderRadius: '10px', color:'green'}}
            class="card col-3">
              <br />
              <h7>
                Email: <b>{user.email}</b>
              </h7>
              <br /> <br />
              <h6>
                <b>Users Online:</b>
              </h6>
              <ul style={{ listStyleType: 'none' }}>
                {chatUsers.map((user) => {
                  return (
                    <li
                      onClick={enteringRoom}
                      style={{ cursor: 'pointer' }}
                      key={user}
                    >
                      {user}
                    </li>
                  );
                })}
              </ul>
            </Col>
            &nbsp; &nbsp;
            <Col class="card col-7" style={{ border: '2px solid white', borderRadius: '10px' }}>
              <p>Chat Messages ({currentRoom})</p>
              <div
                id='chatMessages'
                style={{ border: '1px solid white', borderRadius: '10px' }}
              >
                &nbsp; &nbsp; Messages:
                <ul style={{ listStyle: 'none' }}>
                  {messageList.map((chat, index) => {
                    return (
                      <li key={index}>
                        <i>{chat.name}: </i>
                        <i>
                          <span
                            style={{ color: 'white' }}
                          >
                            <b>{chat.message}</b>
                          </span>
                        </i>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <br />

              <form onSubmit={newMessageSubmit}>
                <input
                  type='text'
                  name='message'
                  class='form-control'
                  value={chatMessage.message}
                  onChange={handleChange}
                  required
                />
                <br />
                <input
                  type='submit'
                  class='btn btn-success btn-sm'
                  value='Send Me!'
                />

                <br />
                <br />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default Chat;
