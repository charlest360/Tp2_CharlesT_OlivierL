<template>
    <span >{{descriptionString}}</span>
</template>

<script>
    export default {
        props: {
            filmInfos: {
                type: Object,
                default: null,
                required: true
            },
            nbCharToDisplay: {
                type: Number,
                default: null,
                required: false
            }
        },
        computed: {
            descriptionString() {
                if((this.nbCharToDisplay!=null )&& (this.filmInfos.description.length >this.nbCharToDisplay)) {
                    return this.filmInfos.description.substring(0,this.nbCharToDisplay)+"...";
                }
                else {
                    return this.filmInfos.description;
                }
            }
        },
    }
</script>

<style scoped>

</style>