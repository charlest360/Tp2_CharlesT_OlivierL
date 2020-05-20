<template>
    <div class="accountContent" >
        <div v-if="buttonClicked == 'signUp'">
            <h1 class="static" >Create an account</h1>
            <create-account />
        </div>
        <div  v-if="buttonClicked == 'profile'" >
            <h1 class="static">Modify an account</h1>
            <edit-account />
        </div>
        
        
    </div>
</template>

<script>
import CreateAccount from '@/components/CreateAccount.vue';
import EditAccount from '@/components/EditAccount.vue';
    export default {
        components: {
            CreateAccount,
            EditAccount
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