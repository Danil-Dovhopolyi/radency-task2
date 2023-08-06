import { IRoute } from './interfaces/IRoute';
import NotesPage from './pages/NotesPage/NotesPage';

const routes: Array<IRoute> = [
  {
    key: 'notes',
    title: 'NotesPage',
    path: '/',
    enabled: true,
    component: NotesPage,
  },
];
export default routes;
