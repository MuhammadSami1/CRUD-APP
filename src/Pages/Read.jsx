import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../features/userDetail";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2 className="text-5xl font-bold text-center my-5">Loading...</h2>;
  }

  if (error !== null) {
    return (
      <h2 className="text-3xl font-bold">
        Something went wrong with your network.
      </h2>
    );
  }

  return (
    <div>
      <h2 className="text-center text-3xl">All data</h2>
      <div>
        {users.map((value) => (
          <div key={value.id} className="card w-50 mx-auto text-center my-3">
            <div className="card-body">
              <h5 className="card-title text-2xl font-semibold">
                {value.name}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">{value.email}</h6>
              <p className="card-text mb-3">{value.age}</p>
              <a href="#" className="card-link">
                View
              </a>
              <a href="#" className="card-link">
                Edit
              </a>
              <a href="#" className="card-link">
                Delete
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
