import { useDispatch, useSelector } from "react-redux";
import { User, UserState, setUser } from "../../redux/slices/userSlice";

export const MyComponent = () => {
  const dispatch = useDispatch();  
  const loggedInUser = useSelector((state: { user: UserState }) => state.user.loggedIn)
  console.log(loggedInUser);
  

  const handleSetUser = () => {
    const user = { id: 1, name: "John Doe" };

    dispatch(setUser(user));
  };

  return (
    <div>
       <h1>User</h1>
      {loggedInUser && (
        
        <div>
          <p>ID: {loggedInUser.id}</p>
          <p>Name: {loggedInUser.name}</p>
        </div>
      )}
      <button onClick={handleSetUser}>Set User</button>
    </div>
  );
};
