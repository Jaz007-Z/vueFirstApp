<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from "vuex";


//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { watchEffect } from '@vue/runtime-core';
// import studentListTestVue from './pages/studentListTest.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  

  setup() {
    const store = useStore();

    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });

    watchEffect(async () => {
      await storage.create();
      // await storage.clear(); //testing purposes - DANGEROUS
      var studentArray = await storage.get("studentList");
      studentArray = JSON.parse(studentArray);
      console.log("studentList Startup: ", studentArray);

      // const studentArray = await storage.get("studentIdList");
      //hard coded values for testing purposes, also makes array var instead of const like above
      // const studentArray = await storage.get("studentIdList");

  

      if (studentArray != null) {
        
        //testing pushes, remove from final product
        // studentArray.push({ id: "JimmyId",name: "Jimmy Zimsky"} );
        // studentArray.push({ id: "AbbyId",name: "Abby"} );
        // studentArray.push({ id: "VirginiaId",name: "Virginia"} );

        store.dispatch('createStudentArray', studentArray)
      } else { //else is entirely testing purposes
        studentArray = [];

        studentArray.push({ id: "JimmyId",name: "Jimmy Zimsky"} );
        studentArray.push({ id: "AbbyId",name: "Abby"} );
        studentArray.push({ id: "VirginiaId",name: "Virginia"} );

        store.dispatch('createStudentArray', studentArray)
      }

      //makes sure localStorage has proper arrays
      const array = [];
      const arrayJson = JSON.stringify(array)
      if ( !(await storage.get('foilStudentList') )) {
        await storage.set('foilStudentList', arrayJson)
      }
      if ( !(await storage.get('epeeStudentList') )) {
        await storage.set('epeeStudentList', arrayJson)
      }
      if ( !(await storage.get('saberStudentList') )) {
        await storage.set('saberStudentList', arrayJson)
      }
      // if ( !(await storage.get('foilStudentList') )) {
      //   await storage.set('foilStudentList', arrayJson)
      // }

      //load in needed arrays from storage 
      store.dispatch('createFencesFoilArray', await storage.get('foilStudentList'));


    });
  }

});
</script>