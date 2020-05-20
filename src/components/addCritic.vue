<template>
    
    <div class="reviewForm">
        <div v-if="error != null">
            <span style="color:red;font-size:25px;" > Failed to add the review</span>
        </div>
        <div v-if="response != null">
            <span style="color:green;font-size:35px;"> Review added with success </span>
        </div>
        <div v-else>
             <h2>My Review :</h2>
        
         <form @submit.prevent="validateAndSend" >
            <div class='ratingDiv'>
                <span > Ranking : </span>
                <star-rating id="rating"
                    v-model="rating"           
                    v-bind:increment="0.5"
                    v-bind:max-rating="5"
                    inactive-color="#dbdbdb"
                    active-color="#cc1166"
                    v-bind:star-size="20"
                    border-color="fcdc6d"
                    :rating="criticsAverage" 
                /> 
            </div>
             
            <div class="commentDiv">
                <textarea  v-model="comment"   id="commentInput" rows="4" cols="50 " placeholder="Comment your review"/>
                
            </div>
            <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'comment' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
            </div>
             <button @click="validateAndSend" id="submitButton" >
                        Submit Review
            </button>
        </form>
        </div>
       
        
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating';
    import FilmService from '@/services/FilmService.js';
    export default {
        components: {
            StarRating,
        },
        props: {
            filmId: {
                default: null,
                required: true
            },
        },
        data() {
            return {
                rating: 0,
                comment: '',
                response: null,
                error: null,
                validationErrors: [],
            }
        },
        methods: {
            validateAndSend() {
                this.error = null;
                if(this.validateData() == true){
                    let data = {
                        user_id : localStorage.getItem('id'),
                        film_id : this.filmId,
                        score : this.rating,
                        comment : this.comment,
                    }
                    FilmService.addCritic(data,localStorage.getItem('token'))
                    .then(response => {
                    this.response = response.data;
                    })
                    .catch(error => {
                    this.error = error;
                    });
                }
            },
            validateData(){
                this.validationErrors = [];
                if(this.comment != '' && this.comment.length > 250){
                    this.validationErrors.push({type:'comment',message:'Comment field can hold a max of 250 caracters.'});
                    return false;
                }
                return true;
            },
        },
        
    }
</script>

<style scoped>

.ratingDiv{
    margin-left: 10%;
    
    text-align: left;
    font-size:20px;
}
.commentDiv{
    margin-left: 10%;
    margin-right: 10%;
    text-align: center;
    font-size:20px;
}
.reviewForm{
    
    padding-top: 10px;
    padding-bottom :40px;
    text-align: center;
    margin: auto;
    width:60%;
    background-color: #fcdc6d;
    border: 1px solid black;
    margin-top:20px;
}
#commentInput{
    width: 100%;
}
#rating{
    margin: auto;
    display: inline-block;
}
    #submitButton {
        margin-top: 20px ;
        width: 50%;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-weight: bold;
        color: #E6B91E;
        background-color: black;
        
    }
    .hidden {
        display: none;
    }
    .error {
        float: left;
    }
   
</style>