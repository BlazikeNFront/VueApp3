<template>
<base-dialog :show="!!error" title='There was an error !' @close='closeDialog'>
<p>{{ error }}</p>
</base-dialog>
  <section>
    <coach-filter @change-filter='setFilter'></coach-filter>
  </section>
  <section>
    <div class="controls">
      <base-button @click='loadCoaches'>Refresh</base-button>
      <base-button v-if='!isCoach && !isLoading' link to="/register">Register as Coach</base-button>
    </div>
    <div v-if='isLoading'>
      <base-spinner ></base-spinner>
    </div>
    <ul v-else-if='hasCoaches'>
      <coach-item v-for='coach in filteredCoaches' :key='coach.id' :id='coach.id' :first-name='coach.firstName' :last-name='coach.lastName' :rate='coach.hourlyRate' :areas='coach.areas'></coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';


export default {
  components:{
    CoachItem,
    CoachFilter
  },
  data(){
   
    return {
     error:null,
      isLoading:false,
       activeFilter:{
                frontend:true,
                backend:true,
                career:true,
            }
    
  }},
    computed:{

      isCoach(){
        return this.$store.getters['coaches/isCoach']
      },

   hasCoaches(){
      return this.$store.getters['coaches/hasCoaches'];
    },

    filteredCoaches(){
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter(coach => {
        if(this.activeFilter.frontend && coach.areas.includes('frontend')){
          return true
        }
         if(this.activeFilter.backend && coach.areas.includes('backend')){
          return true
        }
         if(this.activeFilter.career && coach.areas.includes('career')){
          return true
        }
        return false;
      })
    },
  },
  created(){
    this.loadCoaches();
  },
  methods:{
    setFilter(updatedFilter){
      this.activeFilter = updatedFilter;
    } ,
    async loadCoaches(){
      this.isLoading = true;
     try { 
       await this.$store.dispatch('coaches/loadCoaches') 
     }catch(error){
      
       this.error = error || 'An error occured, try again later...'
     }

     this.isLoading = false;
    },
    closeDialog(){
      this.error=null;
    }
  }
}
</script>

<style  scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>