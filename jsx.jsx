import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Functional component with hooks, conditional rendering, and event handling
const UserProfile = ({ user, isLoggedIn }) => {
  // useState hook for local state
  const [count, setCount] = useState(0);

  // useEffect hook with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // useCallback to memoize a function
  const handleClick = useCallback(() => {
    alert(`Hello, ${user.name}! You clicked ${count} times.`);
  }, [user.name, count]);

  // useMemo to optimize expensive calculation
  const doubledCount = useMemo(() => count * 2, [count]);

  // Conditional rendering
  if (!isLoggedIn) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <section className="user-profile" style={{ border: "1px solid #ccc", padding: 20 }}>
      <h1>{user.name}</h1>
      <img
        src={user.avatar || "https://via.placeholder.com/150"}
        alt={`${user.name}'s avatar`}
        width={150}
        height={150}
      />
      <p>Age: {user.age}</p>

      {/* List rendering */}
      <ul>
        {user.hobbies.length > 0 ? (
          user.hobbies.map((hobby, index) => (
            <li key={index} className="hobby-item">
              {hobby}
            </li>
          ))
        ) : (
          <li>No hobbies listed</li>
        )}
      </ul>

      {/* Event handling */}
      <button onClick={handleClick} disabled={count > 10}>
        Click Me ({count})
      </button>

      {/* Fragment and inline expression */}
      <>
        <p>Doubled count: {doubledCount}</p>
        {count > 5 && <p>You have clicked more than 5 times!</p>}
      </>
    </section>
  );
};

// Prop types validation
UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    avatar: PropTypes.string,
    hobbies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

// Default props
UserProfile.defaultProps = {
  isLoggedIn: false,
};

export default UserProfile;
