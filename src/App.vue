<template>
  <ion-app v-if="renderApp">
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
import { ref } from 'vue';
// import studentListTestVue from './pages/studentListTest.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  

  setup() {
    const store = useStore();
    var renderApp = ref(false);

    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });

    // asnyrioucnsly calls data from storage
    watchEffect(async () => {
      await storage.create();
      // await storage.clear(); //testing purposes - DANGEROUS!!!

      // get student Array from storage
      var studentArray = await storage.get("studentList");
      studentArray = JSON.parse(studentArray);
      console.log("studentList Startup: ", studentArray);

      // get classArray from storage
      var classArray = await storage.get("classList");
      classArray = JSON.parse(classArray);
      console.log("classList Startup: ", classArray);


      // const studentArray = await storage.get("studentIdList");
      //hard coded values for testing purposes, also makes array var instead of const like above
      // const studentArray = await storage.get("studentIdList");

  
      // if there's no student array in storage, it creates one, either way, it's puts one in state
      if (studentArray != null) {
        //testing pushes, remove from final product
        // studentArray.push({ id: "JimmyId",name: "Jimmy Zimsky"} );
        // studentArray.push({ id: "AbbyId",name: "Abby"} );
        // studentArray.push({ id: "VirginiaId",name: "Virginia"} );

        store.dispatch('createStudentArray', studentArray)
      } else { 
        studentArray = [];

        // testing pushes, remove from final product
        studentArray.push({ id: "JimmyId",name: "Jimmy Zimsky"} );
        studentArray.push({ id: "AbbyId",name: "Abby"} );
        studentArray.push({ id: "VirginiaId",name: "Virginia"} );

        store.dispatch('createStudentArray', studentArray)
      }

      // puts classArray in state, if storage doesn't have one, initialize it.
      if (classArray != null) {
        store.dispatch('createClassArray', classArray)
        console.log("classArray dispatched at Startup")
      } else { 
        classArray = [];

        // testing pushes, remove from final product
        classArray.push({ id: "classGroupId",name: "Foil Class Test 1"} );
        classArray.push({ id: "classGroupId2",name: "Foil Class Test 2"} );

        store.dispatch('createClassArray', classArray)
        console.log("classArray dispatched at Startup")
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

      renderApp.value = true;
      
    });
    return { renderApp };
  }

});
</script>