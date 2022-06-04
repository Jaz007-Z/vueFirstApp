<!-- works wonky, don't want to use -->
<template>
  <!-- <ion-tab-bar> -->
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tabClasses" href="/classList">
          <ion-icon :icon="triangle" />
          <ion-label>Classes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tabStudents" href="/studentList">
          <ion-icon :icon="ellipse" />
          <ion-label>Students</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button> -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
  <!-- </ion-tab-bar> -->
</template>

<script>
// import { home, settings } from 'ionicons/icons';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, 
} from "@ionic/vue";

import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  props: ["pageTitle", "pageDefaultBackLink"],


  components: {
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, 
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