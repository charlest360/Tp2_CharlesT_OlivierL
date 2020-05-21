<template>
    <div>
        <div v-if="loading ==null">
            Loading...
        </div>
        <div v-else class="commentsDiv">
            <div  class="commentsContentDiv" v-for="critic in filmCritics" :key="critic.id">
                <div  v-if="critic.user_id != getUserLoggedId">
                    <span class="userSpan">{{critic.critic_first_name }} {{critic.critic_last_name}}</span>
                    <span class="scoreSpan"> Score : {{critic.score}}</span>
                    <p class="commentPar">
                        {{critic.comment}} 
                    </p>
                </div>
            </div>
        </div>
        
        
    </div>
        
</template>

<script>
import FilmService from '@/services/FilmService.js';
    export default {
        props: {
            filmId: {
                default: null,
                required : true
            },
        },
        data() {
            return {
                filmCritics : null,
                error : null,
                loading : null,
                called : false,
            }
        },
        created () {
            this.loading = true;
        },
        watch: {
            loading : function() {
                this.getFilmCritics();
            },
        },
        computed: {
            getUserLoggedId() {
                 if(localStorage.getItem('user_id') != null) {
                    return parseInt(localStorage.getItem('user_id'));
                } 
                else {
                    return null;
                }
            },
            
        },
        
        methods: {
            getFilmCritics() {

                this.called = true;
                FilmService.getFilmById(this.filmId)
                .then(response => {
                this.filmCritics = response.data.critic;
                })
                .catch(error => {
                this.error = error;
                })
                .finally(() => this.loading =false);
            },
           
        },
        
    }
</script>

<style scoped>
    .commentsDiv{
        margin: auto;
        background-color: blanchedalmond;
        flex-direction: row;
        flex-wrap: wrap;
        
    }
    .commentsContentDiv{
        text-align: left;
        background-color: #fff8e3;
        width: 40%;
        border: 1px solid black;
       display: inline-block;
       margin-right: 1%;
       margin-bottom: 2%;
       color: black;
    }
    .userSpan{
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .userSpan{
        margin-top: 5px;
        display: block;
        width: 100%;
        
    }
    .scoreSpan{
        display: block;
        width: 100%;
        margin-left: 10%;
    }
    .commentPar{
        background-color: white;
        margin-left: 10%;
        margin-right: 10%;
        padding: 15px 10px 15px 10px;
        margin-top: 0px;

    }
    .commentSpan{
        margin-left: 10%;
    }
    
</style>
