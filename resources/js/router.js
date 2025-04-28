import {createRouter, createWebHistory} from 'vue-router';
import ArticlesComponent from "./components/ArticlesComponent.vue";
import ArticleShowComponent from "./components/ArticleShowComponent.vue";
import ArticleAutorComponent from "./components/ArticleAutorComponent.vue";
import ArticleTagComponent from "./components/ArticleTagComponent.vue";
import ArticleCreateComponent from "./components/ArticleCreateComponent.vue";
import ArticleEditComponent from "./components/ArticleEditComponent.vue";
import AdminComponent from "./components/AdminComponent.vue";
import RegistrationComponent from "./components/RegistrationComponent.vue";



export default createRouter({
    history:createWebHistory(),

    routes:[
        {
            path:'/vue/articles',
            component: ArticlesComponent,
            name: "articles",
       },
        {
            path:'/vue/article/:id',
            component: ArticleShowComponent,
            name: "article",

        },
        {
            path:'/vue/article/tag/:tag',
            component: ArticleTagComponent,
            name: "articleTag",
        },
        {
            path:'/vue/article/autor/:id',
            component: ArticleAutorComponent,
            name: "articleAutor",
        },
        {
            path:'/vue/article/create',
            component: ArticleCreateComponent,
            name: "articleCreate",
        },
        {
            path:'/vue/article/edit/:id',
            component: ArticleEditComponent,
            name: "articleEdit",
        },
        {
            path:'/vue/admin',
            component: AdminComponent,
            name: "admin",
        },
        {
            path:'/vue/registration',
            component: RegistrationComponent,
            name: "register",
        }
    ]


})
