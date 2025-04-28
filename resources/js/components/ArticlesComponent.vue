<template>

<div  >Сортировка

    <select  v-model="type" @change="sorting">
        <option value="id">   ID     </option>
        <option value="title">  title      </option>
    </select>

    <select  v-model="sort">
        <option value="asc" @click="sorting">   Возратсан     </option>
        <option value="desc">  Убыван      </option>
    </select>
</div>

    <article-component
        v-for="article in articles"
        v-bind:article=article
        v-bind:text = article.text.slice(0,250)

    ></article-component>

    <Pagination @pageSelected="getArticles()"
        v-if="pagination.lastPage"
        v-bind:currentPage = pagination.currentPage
        v-bind:lastPage = pagination.lastPage

    ></Pagination>
</template>

<script>
import ArticleComponent from "./ArticleComponent.vue";
 import {computed} from "vue";
import Pagination from "./Pagination.vue";
import {ref} from "vue";

    export default {

       components:{
           Pagination,
           'article-component':ArticleComponent
       },


        data(){
           return{
               articles : null,
               sort: 'asc',
               type: 'id',
               page:1,
               baseUrl: '/api/articles',
               pagination: {
                   currentPage: 1,
                   totalArticles: 1,
                   lastPage:  0
               }

           }

        },

        methods:{

            getArticles(){
                //console.log(this.$route.query.page+'watch.currentPage')


                axios.get(this.url+'&page='+this.$route.query.page)
                    .then(
                        res=>{
                            //console.log(res.data.currentPage+'hh')
                            this.$parent.$parent.title = 'Главная страница'
                            this.articles = res.data.data

                            this.pagination.currentPage = res.data.current_page
                            this.pagination.lastPage = res.data.last_page
                            this.pagination.totalArticles = res.data.total


                            // this.$refs.Pagination.pages()
                             // console.log(this.pagination.currentPage+'this.pagination.currentPage')
                             // console.log(this.url+'this.url')

                        }
                    )
            },

            sorting(event){
                const selectedValue = event.target.value
                console.log('Выбрали:', selectedValue)

            }
            // changePage(pageNum) {
            //     this.page = pageNum;
            //     console.log(this.page + 'this.page')
            // }

        },

        computed: {

           url() {
                return `${this.baseUrl}?sort=${this.sort}&type=${this.type}`
            }
        },

        mounted(){
            if(this.$route.query.page){this.page = this.$route.query.page}
            if(this.$route.query.type){this.type = this.$route.query.type}
            if(this.$route.query.sort){this.sort = this.$route.query.sort}

            this.paginationEvent = this.$refs.paginationEvent;
            this.getArticles();
            console.log( this.pagination.totalPage+'p')

        },

        watch: {
            url(newUrl, oldUrl) {
                // console.log('URL изменился:')
                // console.log('Старый:', oldUrl)
                // console.log('Новый:', newUrl)
                // console.log(this.$route.query.page+'uyu')

               // var url = window.location.href.searchParams.set('sort', this.sort).set('type', this.type)
               //  window.history.pushState(null, '', url)

                this.$router.push({
                    query: {
                        ...this.$route.query, // сохраняем существующие
                        sort: this.sort,
                        type: this.type,


                    }
                })

                this.getArticles()

           },


},





    }
</script>
