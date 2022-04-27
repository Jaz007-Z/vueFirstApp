<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> {{ pageTitle }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<!-- <script setup>
    const props = defineProps({
        pageTitle: String
    })

</script> -->

<script>
 import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,

} from "@ionic/vue";
export default {
//   props: ['pageTitle'],
  props: {
      pageTitle: String
    //props can be watched
  },


  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
};

</script>