import { useState } from "react";
// import "./Dropdown.css"
function Dropdown({ selected, setSelected,apr,setApr,aprList }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["7 days", "14 days", "28 days","56 days"];
  const aprs=aprList;

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
       <i className="fa fa-caret-square-o-down"></i>
        {/* <FontAwesomeIcon icon="fa-solid fa-list-dropdown" /> */}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
                setApr(aprs[options.indexOf(option)])
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;