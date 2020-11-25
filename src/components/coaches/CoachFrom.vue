<template>
    <form @submit.prevent='submitForm'>
        <div class="from-control" :class="{invalid: !name.isValid}" >
            <label for='firstname'>Firstname</label>
            <input type='text' id='firstname' v-model.trim="name.val" @blur='updated("name")'>
            <p v-if='!name.isValid'>Please type Name</p>
        </div>
        <div class="from-control" :class="{invalid:!lastName.isValid}" >
            <label for='lastname'>Lastname</label>
            <input type='text' id='lastname' v-model.trim='lastName.val' @blur='updated("lastName")'>
             <p v-if='!lastName.isValid'>Please type Lastname</p>
        </div>
        <div class="from-control" :class="{invalid:!desc.isValid}" >
            <label for='desc'>Description</label>
            <textarea  rows='5' id='desc' v-model.trim="desc.val" @blur='updated("desc")'></textarea>
             <p v-if='!desc.isValid'>Please write short description</p>
        </div>
        <div class="from-control" :class="{invalid:!rate.isValid}" >
            <label for='rate'>Hourly rate</label>
            <input type='number' id='rate' v-model.number="rate.val" @blur='updated("rate")'>
             <p v-if='!rate.isValid'>Rate must be higher than 0$</p>
        </div>

        <div class="form-control" :class="{invalid:!areas.isValid}" >
            <h3>Area of expertise</h3>
            <div>
                <input type='checkbox' id='frontend' value="frontend" v-model="areas.val" @blur='updated("areas")'>
                <label for='frontend'>Frontend Dev</label>
            </div>
             <div>
                <input type='checkbox' id='backend' value="backend" v-model="areas.val" @blur='updated("areas")'> 
                <label for='backend'>Backend Dev</label>
            </div>
             <div>
                <input type='checkbox' id='career' value="career" v-model="areas.val" @blur='updated("areas")'>
                <label for='career'>Career </label>
            </div>
             <p v-if='!areas.isValid'>Please check at least one expertise</p>
        </div>
        <p v-if='!formIsvalid'>Please Fix Above Error</p>
        <base-button >Register</base-button>
    </form>
</template>
<script>
export default {
    emits:['save-data'],
    data(){
        return{

            name:{
              val:'',
              isValid:true
            },
            lastName:{
              val:'',
              isValid:true
            },
            desc:{
              val:'',
              isValid:true
            },
            rate:{
              val:null,
              isValid:true
            },
            areas:{
              val:[],
              isValid:true
            },
            formIsvalid:true,
        }
    },
    
    methods:{
      updated(value){
        
        this[value].isValid = true;
      },
      checkValidation(){

        this.formIsvalid = true;

        if(this.name.val === ''){
          this.name.isValid = false;
          this.formIsvalid = false
        }
         if(this.lastName.val === ''){
          this.lastName.isValid = false;
          this.formIsvalid = false
        }
         if(this.desc.val === ''){
          this.desc.isValid = false;
          this.formIsvalid = false
        }
         if(this.rate.val <= 0 || !this.rate.val){
          this.rate.isValid = false;
          this.formIsvalid = false
        }
         if(this.areas.val.length === 0){
          this.areas.isValid = false;
          this.formIsvalid = false
        }
      },

        submitForm(){
          this.checkValidation();
          if(!this.formIsvalid){
            return
          }

            const formData ={
                first:this.name.val,
                last:this.lastName.val,
                desc:this.desc.val,
                rate:this.rate.val,
                areas:this.areas.val,
            }
            this.$emit('save-data', formData)
        }
    }
}
</script>
<style  scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>