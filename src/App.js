import { useCallback, useEffect, useState } from "react";
import UsersTable from "./components/UsersTable";
import './app.css';
import Pagination from "./components/Pagination";

const API_USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TITLES_TABLE = ['Id', 'Name', 'Username', 'Email'];


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [maxUsersPerRequest, setMaxUsersPerRequest] = useState(3);

  const fetchUsers = useCallback(async page => {
    setLoading(true);
    const res = await fetch(`${API_USERS_URL}?_start=${(page - 1) * maxUsersPerRequest}&_limit=${maxUsersPerRequest}`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }, [maxUsersPerRequest]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortUsersByField = (field) => {
    const usersSorted = [...users].sort((a, b) => {
      if (field === 'Id') {
        return a.id - b.id;
      }
      if (field === 'Name') {
        return a.name.localeCompare(b.name);
      }
      if (field === 'Username') {
        return a.username.localeCompare(b.username);
      }
      return a.email.localeCompare(b.email);
    });
    setUsers(usersSorted);
  };

  return (
    <div className="app">
      <h1>Users</h1>
      {loading ? <p>Loading users...</p>
        : <UsersTable users={users} sortUsers={sortUsersByField} titles={TITLES_TABLE} />
      }
      <Pagination maxLimit={3} callbackOnChangePage={fetchUsers} />
    </div>
  );
}

export default App;
