export interface MenuItem {
  title: string;
  path: string;
  children?: MenuItem[];
}

export const menu_pages: MenuItem[] = [
  {
    title: "Главная",
    path: "/"
  },
  {
    title: "Корзина",
    path: "/cart-products"
  },
  {
    title: "Любимые товары",
    path: "/favorit-products"
  },
  {
    title: "Сравнение",
    path: "/compare-products"
  },
  {
    title: "Услуги",
    path: "/services",
    children: [
      {
        title: "Разработка",
        path: "/services/development"
      },
      {
        title: "Дизайн",
        path: "/services/design"
      }
    ]
  },
  {
    title: "Контакты",
    path: "/contacts"
  }
];