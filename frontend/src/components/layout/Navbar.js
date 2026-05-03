import { Link } from "react-router-dom";
import React, { useContext } from "react";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/logo.png";

import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="PetConnect" />
        <h2>
          <Link to="/">PetConnect</Link>
        </h2>
      </div>
      <ul className={styles.nav_links}>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li>
              <button type="button" onClick={logout} className={styles.nav_button}>
                Sair
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
