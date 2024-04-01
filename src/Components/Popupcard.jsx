import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "../index.css";

const Popupcard = ({ id, setPopup }) => {
  const userData = useSelector((state) => state.app.users);

  const singleUser = userData.filter((e) => e.id === id);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="flex flex-col justify-center items-center">
            <button
              className=" px-3 py-1 bg-black text-white mb-4 "
              onClick={() => setPopup(false)}
            >
              Close
            </button>
            <h2 className="mb-2 font-extrabold text-2xl">
              {singleUser[0].name}
            </h2>
            <h3 className="mb-2 font-extrabold  text-lg">
              {singleUser[0].email}
            </h3>
            <h4 className="mb-2 font-extrabold  text-lg">
              {singleUser[0].age}
            </h4>
            <p className="mb-2 font-extrabold  text-lg">
              {singleUser[0].gender}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
Popupcard.propTypes = {
  id: PropTypes.any.isRequired,
  setPopup: PropTypes.bool.isRequired,
};

export default Popupcard;
