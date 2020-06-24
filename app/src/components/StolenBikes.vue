<template>
  <div class="all-stolen-bikes">
    <button class="add-stolen-bike" title="Add a stolen bike" @click="openModal">
      <i class="material-icons">add</i>
    </button>
    <theftReportModal v-if="modalOpen"></theftReportModal>
    <div class="card" v-for="(stolenBike, idx) in stolenBikes" :key="idx">
    <span class="bike-model">{{ stolenBike.bikeModel }}</span>
    <img class="bike-image" :src="stolenBike.image">
    <span class="city">{{stolenBike.city}}</span>
    <span class="description">{{stolenBike.description}}</span>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import {db} from '../main.js'
import theftReportModal from './theftReportModal'
export default {
  name: 'StolenBikes',
  data () {
    return {
      modalOpen: false,
      stolenBikes: [],
      bikeModel:'',
      image:'',
      city:'',
      description:''
    }
  },
  components:{theftReportModal},
  firestore(){
    return {
      stolenBikes:
      db.collection('stolenBikes').orderBy('createdAt')
    }
  },
  methods: { 
    addStolenBike (bikeModel, image, city, description) {      // <-- and here 
      const createdAt = new Date()
      db.collection('stolenBikes').add({ bikeModel, image, city, description, createdAt })
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
    }
  }
}
</script>
