import ProductCategory from './ProductCategory/Root';
import Product from './Product/Root';
import Store from './Store/Root';
import StoreCategory from './StoreCategory/Root';
import Brand from './Brand/Root';
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
<<<<<<< HEAD
    component: Brand,
    path: '/marcas',
    label: 'Marcas',
  }
=======
    component: Role,
    path: '/roles',
    label: 'Roles',
  },
>>>>>>> d8c08db91c3bdb5acec5ed54347fa219e14038be
];

export default routes;