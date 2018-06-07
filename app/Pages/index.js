import ProductCategory from './ProductCategory/Root';
import Product from './Product/Root';
import Store from './Store/Root';
import StoreCategory from './StoreCategory/Root';
import Event from './Event/Root';
import Role from './Role/Root';

const routes = [{
    component: ProductCategory,
    path: '/categoria-de-productos',
    label: 'Categoria de Productos',
  },
  {
    component: Product,
    path: '/productos',
    label: 'Productos',
  },
  {
    component: StoreCategory,
    path: '/categoria-de-tiendas',
    label: 'Categoria de Tiendas',
  },
  {
    component: Store,
    path: '/tiendas',
    label: 'Tiendas',
  },
  {
    component: Role,
    path: '/roles',
    label: 'Roles',
  },
  {
    component: Event,
    path: '/eventos',
    label: 'Eventos',
  },
];

export default routes;