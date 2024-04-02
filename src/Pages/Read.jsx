import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetail";
import Popupcard from "../Components/Popupcard";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.app);

  const [popup, setPopup] = useState(false);

  const [id, setId] = useState();

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
      {popup && <Popupcard id={id} setPopup={setPopup} />}
      <h2 className="text-center text-3xl">All data</h2>
      <div>
        {users.map((value) => (
          <div key={value.id} className="card w-50 mx-auto text-center my-3">
            <div className="card-body">
              <h5 className="card-title text-2xl font-semibold">
                {value.name}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">{value.email}</h6>
              <p className="card-text mb-3">{value.gender}</p>
              <div className="flex items-center justify-center">
                <button
                  className="card-link px-3 py-1 bg-black text-white"
                  onClick={() => [setId(value.id), setPopup(true)]}
                >
                  View
                </button>
                <Link
                  to={`/edit/${value.id}`}
                  className="card-link px-3 py-1 bg-black text-white"
                >
                  Edit
                </Link>
                <Link
                  className="card-link px-3 py-1 bg-black text-white"
                  onClick={() => dispatch(deleteUser(value.id))}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
