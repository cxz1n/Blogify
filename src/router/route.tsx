import TheLayout from "../layout/TheLayout";
import type { RouteObject } from 'react-router-dom';
// import { lazy } from "react";
import Dashboard from "../page/dashboard";
import Articles from "../page/articles";
import Tags from "../page/tags";
import User from "../page/user";
import Login from "../page/login";
import Write from "../page/write";
// let Dashbard = lazy(()=> import('../page/dashboard'))
// let Articles = lazy(()=> import('../page/articles'))
// let Tags = lazy(()=> import('../page/tags'))
// let User = lazy(()=> import('../page/user'))
// let Login = lazy(()=> import('../page/login'))
// let ReactQuillEditor = lazy(()=> import('../page/write'))
export interface customRouteObject {
    auth?: boolean,
    children?: customRouteObject
}
export type RouteType = RouteObject & customRouteObject;
const route: RouteType[] = [
    {
        path: '/',
        element: <TheLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>,
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
            },
            {
                path: '/articles',
                element: <Articles></Articles>,
            }, {
                path: '/tags',
                element: <Tags></Tags>,
            },
            {
                path: '/user',
                element: <User></User>,
            },
          
        ]
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'write/:id',
        element: <Write></Write>,
    }
]

export default route;