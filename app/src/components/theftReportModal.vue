<template id="theftReportModal">
<div class="modal">
  <form @submit="addStolenBike(bikeModel, image, city, description)">
        <input v-model="bikeModel" placeholder="Bike Model">
        <input v-model="image" placeholder="Bike Image URL">
        <input v-model="city" placeholder="City">
        <input v-model="description" placeholder="Description">
        <button type="submit">Register stolen bike</button>
    </form>
</div>
</template>
<script>
/*eslint-disable*/
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
  methods: { 
    addStolenBike (bikeModel, image, city, description) {      // <-- and here 
      const createdAt = new Date()
      db.collection('stolenBikes').add({ bikeModel, image, city, description, createdAt })
    }
  }
}
</script>

<style lang="css" scoped>
  .modal{
    background-color: white;
    padding: 10px;
    box-shadow: 0 0 5px grey;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    position: absolute;
    margin: auto;
  }
</style>