import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authService } from "fbase";

const Navigation = ({ isAdmin, onChangeView }) => {
  const [who, setWho] = useState("all");
  const onLogOut = () => {
    authService.signOut();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setWho(value);
    onChangeView(value);
  };

  return (
    <nav className="header">
      <ul className="header__menu">
        <li className="header__menu-item">
          <Link to="/">Home</Link>
        </li>
        {isAdmin ? (
          <li className="header__menu-item">
            <Link to="/regist">문제등록</Link>
          </li>
        ) : (
          <li className="header__menu-item">
            <select
              id="whoSelect"
              name="whoSelect"
              className="whoSelect"
              onChange={onChange}
              value={who}
            >
              <option value="all">둘 다 표시</option>
              <option value="hun">기훈이 문제만 표시</option>
              <option value="hyeon">기현이 문제 표시</option>
            </select>
          </li>
        )}
      </ul>
      <span className="header__logout" onClick={onLogOut}>
        Log Out
      </span>
    </nav>
  );
};

export default Navigation;
