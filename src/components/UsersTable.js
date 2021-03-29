import React from 'react';

const UsersTable = ({ users, titles, sortUsers }) => {
  return (
    <table>
      <tbody>
        <tr>
          {titles.map(title =>
            <th key={title}>
              {title} <button onClick={() => sortUsers(title)}>Sort</button>
            </th>)}
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;