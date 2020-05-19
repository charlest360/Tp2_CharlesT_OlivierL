<template>
    <div class="accountContent">
        <div v-bind:class='{ hidden: buttonClicked == "profile"}'>
            <h1 class="static" >Create an account</h1>
            <create-account />
        </div>
        <div v-bind:class='{ hidden: buttonClicked == "signUp"}' >
            <h1 class="static">Modify an account</h1>
        </div>
        
        
    </div>
</template>

<script>
import CreateAccount from '@/components/CreateAccount.vue';
    export default {
        components: {
            CreateAccount,
        },
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
    .accountContent{
        color: black;
    }
</style>