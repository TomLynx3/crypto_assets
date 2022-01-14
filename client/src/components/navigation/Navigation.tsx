import styles from "./navigation.module.scss";
import { Link, useLocation } from "react-router-dom";
import privateRoutes from "../../routes/routes";
import { authStore}  from '../../stores/auth.store'

const Navigation = () => {
  let location = useLocation();

const signOut = ()=>{
    authStore.signOut()
}

  return (
    <div className={styles.wrapper}>
      {privateRoutes.map((item) => (
        <div
          key={item.id}
          className={`${styles.navItem} ${
            location.pathname === item.path ? styles.active : ""
          }`}
        >
          <Link to={item.path}>
            <i className={item.iconName}></i>
          </Link>
        </div>
      ))}
      <div className={styles.navItem} onClick={signOut}>
        <Link to="/login">
          <i className="fas fa-door-open"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
