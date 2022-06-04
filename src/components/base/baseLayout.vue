<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-title> {{ pageTitle }} </ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <nav-menu/>
    </ion-page>
    <!-- <tabs-base></tabs-base> -->
  

    

</template>

<!-- <script setup>
    const props = defineProps({
        pageTitle: String
    })

</script> -->

<script>
// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
// import { home, settings } from 'ionicons/icons';
// import tabsBase from '../base/tabsBase.vue'
import navMenu from './mainMenu.vue'
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons,
  // IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from "@ionic/vue";

// import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  //   props: {
  //       pageTitle: String
  //     //props can be watched
  //   },

  components: {
    // tabsBase,
    navMenu,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButtons,
    // IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
  },
  // setup() {
  //     return {
  //       ellipse,
  //       square,
  //       triangle,
  //     };
  //   },
};
</script>