<template>
    <div class="pagination">

<a v-if="startPage!==1" href="" @click.prevent="handleClick(1)"><h1>1...</h1></a>

        <a  v-for="i in showPage"
            href=""
            :class="{ active: i+startPage-1 === currentPage }"
            @click.prevent="handleClick(i+startPage-1)"><h1>{{i+startPage-1}}</h1></a>

        <a v-if="this.startPage !== this.lastPage -  this.showPage +1" href="" @click.prevent="handleClick(lastPage)"><h1>...{{this.lastPage}}</h1></a>

    </div>
</template>

<script>
export default {
    props: ['currentPage','lastPage'],
    data(){
        return{
            startPage:1,
            sidePage:2, //количесвто страниц сбоку
            showPage:0, // количесвто страниц показываемых в пагинации

        }

    },
    methods:{
        pages(){

            this.showPage = this.sidePage * 2 + 1

            if(this.currentPage - this.sidePage <= 0 ){
                this.startPage = 1
                console.log('первая страница')
            }else if (this.lastPage - this.currentPage  < this.sidePage ) {

                this.startPage = this.lastPage -  this.showPage +1
                console.log('последняя страница')
            }else {
                this.startPage = this.currentPage - this.sidePage
                console.log('норм страница')
            }

            // console.log(this.showPage +'this.showPage')
            // console.log(this.lastPage +'this.lastPage')
            // console.log( this.startPage +' this.startPage')
             console.log( this.currentPage +' this.currentPage')

        },
        handleClick(pageNum) {

            this.$router.push({
                query: {
                    ...this.$route.query, // сохраняем существующие
                    page: pageNum,
                }
            }).then(() => {
                // Эта функция будет вызвана после успешной навигации
                this.$emit('pageSelected')
                //this.$parent.getArticles()
            })

            // console.log(this.$route.query.page+'handleClick.currentPage')
            // console.log(pageNum+'handleClick.pageNum')
            // console.log(this.$route.query.page+'route.query.page')
            //this.$parent.getArticles()
            //this.pages()

        }

    },
    mounted() {
        this.pages()
        //console.log(this.currentPage+ 'this.currentPage')
    },
    watch: {

        currentPage(newP, oldP) {
            this.pages()
        }

    }

}
</script>

<style scoped>
a.active {
    font-weight: bold;
    color: red;
}
</style>
