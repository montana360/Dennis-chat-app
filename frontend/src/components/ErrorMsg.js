import React from 'react'

const ErrorMsg = ({ msg }) => {
    return (
      <div
        class='form-control'
        style={{ padding: '20px', margin: '10px', border: '1px solid red' }}
      >
        <span style={{ color: 'red' }}>
          <b>{msg}</b>
        </span>
      </div>
    );
}

export default ErrorMsg
