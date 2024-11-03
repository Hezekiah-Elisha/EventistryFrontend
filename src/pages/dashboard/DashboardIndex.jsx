import { useSelector } from "react-redux";

export default function DashboardIndex() {
  const { currentUser } = useSelector((state) => state.user);

  const user = currentUser && currentUser.user;

  return (
    <div>
      {user ? (
        <div>Hi {currentUser.user.username}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
