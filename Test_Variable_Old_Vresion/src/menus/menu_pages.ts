import type { TFunction } from "i18next";

export interface MenuItem {
  title: string;
  path: string;
  children?: MenuItem[];
}

// Пункты меню строятся из переводов, поэтому автоматически
// переключаются вместе с языком сайта.
export const getMenuPages = (t: TFunction): MenuItem[] => [
  {
    title: t("menu.home"),
    path: "/",
  },
  {
    title: t("menu.favorites"),
    path: "/favorit-products",
  },
  {
    title: t("menu.compare"),
    path: "/compare-products",
  },
];
