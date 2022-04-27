<template>
  <base-layout page-title="Student List Test">
      <ion-list>
       <ion-item router-link="/studentList/1">Jimmyyy tick tick Click click</ion-item>
       <ion-item>Michaasdfel</ion-item>
       <ion-item>Gabbasdfy</ion-item>
       <ion-item>Nickasdf</ion-item>
       <ion-item>West Virginia</ion-item>
      </ion-list>
      <ion-button router-link="/" :router-animation="myAnimation">Click zzMe</ion-button>
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