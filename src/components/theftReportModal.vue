<template id="theftReportModal">
<div class="modal" v-show="value">
  <form @submit="addStolenBike(bikeModel, image, city, description)">
        <div class="error-msg">Please fill in all fields</div>
        <input class="input" v-model="bikeModel" placeholder="Bike Model">
        <input class="input" v-model="image" placeholder="Bike Image URL">
        <input class="input" v-model="city" placeholder="City">
        <textarea class="input textarea" v-model="description" placeholder="Description"></textarea>
        <button class="send-report" type="submit">Register stolen bike</button>
  </form>
</div>
</template>
<script>
import {db} from '../main.js'
export default {
  name: 'theftReportModal',
  data () {
    return {
      bikeModel:'',
      image:'',
      city:'',
      description:''
    }
  },
  props: {
    value: {
      required: true
    }
  },
  methods: { 
    addStolenBike (bikeModel, image, city, description) { 
      let el = this.$el.querySelector('.error-msg')
      if(bikeModel && image && city && description){
        el.style = "display: none;"
        const createdAt = new Date()
        const status = 'submitted'
        let newStolenBikeId = ''
        db.collection('stolenBikes').add({ bikeModel, image, city, description, createdAt, status }).then(function(query){
          newStolenBikeId = query.id
        })
        db.collection('police').where('status', '==', 'free').limit(1).get().then(function(query){
          if(!query.empty){
            db.collection('police').doc(query.docs[0].id).update({status: 'booked'})
            db.collection('stolenBikes').doc(newStolenBikeId).update({policeman: query.docs[0].id, status: 'accepted'})
          }
        })
        this.bikeModel = ''
        this.city = '',
        this.description = '',
        this.image = ''
        this.$emit("input", !this.value);
      }else{
        el.style = "display: block;"
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .modal{
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0 0 5px grey;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    position: absolute;
    margin: auto;
    box-sizing: border-box;
    z-index: 1;
  }
  .input{
    width: 100%;
    margin: 10px 0;
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 1px solid rgb(255,201,10);
  }
  .textarea{
    overflow-y: auto;
  }
  .send-report{
    font-size: 16px;
    padding: 10px;
    background-color: blue;
    border-radius: 10px;
    color: rgb(255,201,10);
    font-weight: 600;
    cursor: pointer;
  }
  .send-report:hover{
    box-shadow: 0 0 10px grey;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .error-msg{
    display: none;
    font-size: 14px;
    color: red;
  }
</style>