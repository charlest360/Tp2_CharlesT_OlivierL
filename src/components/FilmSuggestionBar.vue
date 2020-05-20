<template>
    <div>
        <section class="static" v-bind:class='{ hidden: shouldClose ==true }'>
          <film-suggestion-list :keyword="filterName" />
        </section>
        <h1 id="welcome" v-bind:class='{ hidden: isClicked}'>Welcome to Our Movie Database!</h1>
         <div class="movieData">
            <section class="static" v-bind:class='{ hidden: isClicked == false }' >
                <film-list :keyword="filterName" :clicked="isClicked" />
            </section>
        </div>
    </div>
</template>

<script>
    //import FilmList from '@/components/FilmList.vue';
    import FilmSuggestionList from '@/components/FilmSuggestionList.vue';
    import FilmList from '@/components/FilmList.vue';
    export default {
        components: {
            FilmSuggestionList,
            FilmList
        },
        props: {
            isClicked: {
                type: Boolean,
                default: false
            },
            filterName: {
                type: String,
                default: ''
            }
        },
        computed: {
            shouldClose() {
                if(this.isClicked ==true || this.filterName.length < 3) {
                    return true;
                } 
                else {
                    return false;
                }
            }
        },
    }
</script>

<style scoped>
    .hidden {
        display: none;
    }
    .movieData{
        width: 100%;
        position: absolute;
        background-color:#F2CE57 ;
    }
</style>