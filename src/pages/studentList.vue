<template>
  <base-layout page-title="Student List/MainTemp">
      <ion-list>
       <ion-item router-link="/studentList/1">Jimmy Click click Click click</ion-item>
       <ion-item>Michael</ion-item>
       <ion-item>Gabby</ion-item>
       <ion-item>Nick</ion-item>
       <ion-item>Virginia</ion-item>
      </ion-list>
      <ion-button router-link="/studentListTest.vue">Click Me</ion-button>
  </base-layout>
</template>

<script>
import {
  IonButton,
  IonList,
  IonItem
} from "@ionic/vue";
export default {
  IonButton,
  IonList,
  IonItem
};
</script>