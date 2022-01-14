import Home from "../pages/home/Home";
import AddCrypto from '../pages/add-crypto/AddCrypto'

interface NavigationItem {
  id: string;
  path: string;
  iconName: string;
  component: React.FC;
}

const privateRoutes: NavigationItem[] = [
  {
    id: "home",
    path: "/",
    component: Home,
    iconName: "fas fa-home",
  },
  {
    id: "add cryptocurrency",
    path: "/add-crypto",
    component: AddCrypto,
    iconName: "fas fa-coins",
  },
];

export default privateRoutes;
