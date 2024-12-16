import useUser from "./hooks/useUser";
import userService, { User } from "./services/user-service";

const App = () => {
  const { error, users, isLoading, setError, setUsers } = useUser();
  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id != user.id));
    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };
  const createUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 1, name: "Manaf" };
    setUsers([newUser, ...users]);
    userService
      .create<User>(newUser)
      .then(({ data: savdUser }) => setUsers([savdUser, ...users]))
      .catch((error) => {
        setError(error.message);
        setUsers([...originalUsers]);
      });
  };
  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updateUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updateUser : u)));
    userService.update<User>(updateUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="btn btn-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={createUser}>
        Add
      </button>
      <ul className="list-group ">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
