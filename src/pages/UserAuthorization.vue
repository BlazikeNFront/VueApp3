<template>
<div>
    <base-dialog :show="!!error" title='An error ocured' @close='handleError'>
    <p>{{ error }}</p></base-dialog>
  <base-dialog :show='isLoading' title='Authenticating..' fixed>
      <base-spinner></base-spinner>
  </base-dialog>
    <form @submit.prevent='submitForm'>
        <base-card>
            <div class="form-control">
                <label for='email'>E-Mail</label>
                <input type='email' id='email' v-model.trim='email' />
            </div>
            <div class="form-control">
                <label for='password'>Password</label>
                <input type='password' id='password' autocomplete="on" v-model.trim='password' />
            </div>
            <p v-if='!formIsValid'> Please enter a valid email also password need to have at least 6 characters</p>
            <base-button>{{ submitButtonCaption}}</base-button>
            <base-button type='button' mode='flat' @click='switchMode'>{{ switchModeButtonCaption }}</base-button>
        </base-card>
    </form>
</div>
</template>

<script>

export default {

    data(){
        return {
       
            isLoading:false,
            email:'',
            password:'',
            formIsValid:true,
            error:null,
            mode:'Login',
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'Login'){
                return 'Login'
            }    else {
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'Login'){
                return 'SignUp instead';
            }
            else {
                return 'Login'
            }
        }
    },
    methods:{
        handleError(){
            this.error = null;
        },
       async submitForm(){
            this.formIsValid = true;
            if(
                this.email==='' || !this.email.includes('@') || this.password.length < 6
            ) {
                this.formIsValid = false;
                return
            }
            const actionPayload ={
                    email:this.email,
                    password:this.password,
                }
            this.isLoading = true;


          try { if(this.mode ==='Login'){
             
              await this.$store.dispatch('login',actionPayload)

            }else {
                console.log('signUp')
               await this.$store.dispatch('signUp',actionPayload)

            }} catch(err) {

                this.error= err.message || 'Failed to authenticate'

                }


            this.isLoading = false
      
        },

        switchMode(){
            if(this.mode === 'Login') {
                this.mode = 'signup'
            }
                else { this.mode = 'Login' }

        }
    }
}
</script>

<style  scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>