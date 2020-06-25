<template>
  <div class="all-stolen-bikes">
    <button class="add-stolen-bike" title="Add a stolen bike" @click="openModal">
      <i class="material-icons">add</i>
    </button>
    <theftReportModal v-model="modalOpen"></theftReportModal>
    <div class="card" v-for="(stolenBike, idx) in stolenBikes" :key="idx">
      <div class="status" :class="stolenBike.status">{{ stolenBike.status }}</div>
      <span class="bike-model">{{ stolenBike.bikeModel }}</span>
      <img class="bike-image" :src="stolenBike.image">
      <span class="city">{{stolenBike.city}}</span>
      <span class="description">{{stolenBike.description}}</span>
      <i class="material-icons done" 
      v-if="stolenBike.status == 'accepted' || stolenBike.status == 'submitted'"
      @click="resolvedReport(stolenBike.id, stolenBike.policeman, stolenBike.status)">done_outline</i>
    </div>
  </div>
</template>

<script>
import {db} from '../main.js'
import firebase from 'firebase/app'
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
    },
    resolvedReport(reportId, policemanId, status){
      if(status == 'accepted'){
        db.collection('stolenBikes').where('status', '==', 'submitted').orderBy('createdAt').limit(1).get().then(function(querySnapshot){
          if(!querySnapshot.empty){
            db.collection('stolenBikes').doc(querySnapshot.docs[0].id).update({status: 'accepted', policeman: policemanId})
          }else{
            db.collection('police').doc(policemanId).update({status: 'free'})
          }
        })
        db.collection('stolenBikes').doc(reportId).update({status: 'resolved', policeman: firebase.firestore.FieldValue.delete()})
      }
      if(status == 'submitted'){
        db.collection('stolenBikes').doc(reportId).update({status: 'resolved'})
      }
    }
  }
}
</script>
