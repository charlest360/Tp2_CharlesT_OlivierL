<template>
    <div class="accountContent">
        <h1 class="static" v-bind:class='{ hidden: buttonClicked == "profile"}'>Create an account</h1>
        <h1 class="static" v-bind:class='{ hidden: buttonClicked == "signUp"}' >Modify an account</h1>
    </div>
</template>

<script>
    export default {
        props: {
            buttonClicked: {
                type: String,
                default: null,
                required : true
            },
        },
    }
</script>

<style scoped>
    .hidden {
        display: none;
    }
</style>