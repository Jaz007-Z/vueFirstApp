<template>
  <!-- <ion-page> -->
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/classList">
          <ion-label>Class List</ion-label>
        <ion-icon :icon="square"></ion-icon>
      </ion-button>
      <ion-button router-link="/studentList">
      <ion-label>Student List</ion-label>
        <ion-icon :icon="triangle"></ion-icon>
      </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
    <!-- </ion-page> -->
</template>

<script>
// import { home, settings } from 'ionicons/icons';
import {
 IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, 
 IonLabel,  
} from "@ionic/vue";
// import { ellipse,
//         square,
//         triangle, } from "ionicons/icons"; //will be returned in setup

import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  props: ["pageTitle", "pageDefaultBackLink"],


  components: {
    IonFooter, IonToolbar, IonButtons, IonButton, IonIcon,
     IonLabel, 
    // IonContent
  },
  setup() {
      return {
        ellipse,
        square,
        triangle,
      };
    },
};
</script>