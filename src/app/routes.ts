// src/app/routes.ts
import {Home} from './pages/home';     // ./pages/home/index.ts
import {Test} from './pages/test';     // ./pages/test/index.ts

export default [
    {path: '/', component: Home, name: 'Home'},
    {path: '/test', component: Test, name: 'Test'}
];
