import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMenuPages, type MenuItem } from "@/menus/menu_pages";
import styles from "./show_menu.module.css";

interface MenuProps {
  items?: MenuItem[];
}

function Menu({ items }: MenuProps) {
  const { t } = useTranslation();
  const menuItems = items ?? getMenuPages(t);

  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li 
            key={item.path} 
            className={styles.menuItem}
          >
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `${styles.text} ${isActive ? styles.active : styles.link}`
              }
            >
              {item.title}

              {item.children && (
                <span className={styles.arrow}>
                  ▾
                </span>
              )}
            </NavLink>

            {item.children && (
              <ul className={styles.subMenu}>
                {item.children.map((child) => (
                  <li 
                    key={child.path}
                    className={styles.subMenuItem}
                  >
                    <NavLink
                      to={child.path}
                      className={styles.subLink}
                    >
                      {child.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}

          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
