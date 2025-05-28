<template>

<div  >Сортировка

    <select v-model="type"  @change="sortingType">
        <option value="id">   ID     </option>
        <option value="title">  title      </option>
    </select>

    <select v-model="sort"   @change="sorting">
        <option value="asc" >   Возратсан     </option>
        <option value="desc">  Убыван      </option>
    </select>
</div>

    <article-component
        v-for="article in articles"
        v-bind:article=article
        v-bind:text = article.text.slice(0,250)

    ></article-component>

    <Pagination @pageSelected="getArticles"
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
               apiUrl: '/api/articles',
               pagination: {
                   currentPage: 1,
                   totalArticles: 1,
                   lastPage:  0
               },
               provide_text: "injection"

           }

        },

        methods:{

            getArticles(){
                console.log('getArticles'+this.$route.query.type)

                let url = this.apiUrl
                if (this.$route.query.type){
                    url+='?&type='+this.$route.query.type
                }else {url+='?type='+this.type}

                if (this.$route.query.sort){
                    url+='&sort='+this.$route.query.sort
                }

                if (this.$route.query.page){
                    url+='&page='+this.$route.query.page
                }
                console.log(url)

                axios.get(url)
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
                this.$router.push({
                    query: {
                        ...this.$route.query, // сохраняем существующие
                        sort: selectedValue,
                    }
                })


            },
            sortingType(event){
                const selectedValue = event.target.value
                this.$router.push({
                    query: {
                        ...this.$route.query, // сохраняем существующие
                        type: selectedValue,
                    }
                })


            },
            selectedFromUrl(){
                if (this.$route.query.type){
                    this.type=this.$route.query.type
                }

                if (this.$route.query.sort){
                    this.sort=this.$route.query.sort
                }

            }
            // changePage(pageNum) {
            //     this.page = pageNum;
            //     console.log(this.page + 'this.page')
            // }

        },

        computed: {

           // url() {
           //      return `${this.baseUrl}?sort=${this.sort}&type=${this.type}`
           //  }
        },

        mounted(){
            // if(this.$route.query.page){this.page = this.$route.query.page}
            // if(this.$route.query.type){this.type = this.$route.query.type}
            // if(this.$route.query.sort){this.sort = this.$route.query.sort}

            //this.paginationEvent = this.$refs.paginationEvent;

            this.selectedFromUrl()
            console.log( this.$route.query.type+'p')
            this.getArticles();


        },
        provide(){
            return{
                prov_inj: this.provide_text
            }
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
            '$route'(to, from) {
                console.log( this.$route.query.type+'p')
                this.getArticles()

            }


},





    }
</script>
