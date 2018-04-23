import ProductCategory from './ProductCategory/Root';
import Product from './Product/Root';
import Store from './Store/Root';
import StoreCategory from './StoreCategory/Root';

const routes = [
  {
    component: ProductCategory,
    path: '/categoria-de-productos',
  },
  {
    component: Product,
    path: '/productos',
  },
  {
    component: Store,
    path: '/tiendas',
  },
  {
    component: StoreCategory,
    path: '/categoria-de-tiendas',
  },
];

export default routes;
