<template>
  <div class="all-stolen-bikes">
    <button class="add-stolen-bike" title="Add a stolen bike" @click="openModal">
      <i class="material-icons">add</i>
    </button>
    <theftReportModal v-model="modalOpen"></theftReportModal>
    <div class="card" v-for="(stolenBike, idx) in stolenBikes" :key="idx">
      <div class="status" :class="stolenBike.status">{{stolenBike.status}}</div>
      <span class="bike-model">{{ stolenBike.bikeModel }}</span>
      <img class="bike-image" :src="stolenBike.image">
      <span class="city">{{stolenBike.city}}</span>
      <span class="description">{{stolenBike.description}}</span>
    </div>
  </div>
</template>

<script>
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
      description:'',
      policemanName:''
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
    openModal() {
      this.modalOpen = !this.modalOpen;
      if(!this.modalOpen){
        let el = this.$el.querySelector('.error-msg')
        el.style = "display: none;"
      }
    }
  },
}
</script>
