<template v-if="displayPage">
  <!-- <div v-if="loadedStudent"> div disables animations and back button doesn't go back -->
  <base-layout
    :pageTitle="loadedStudent ? loadedStudent.name : 'Loading...'"
    page-default-back-link="/"
  >
    <!-- filter in toolbar for weapon type -->
    <template v-slot:actions-end>
      <!-- <class-type-filter-select
        v-model:classTypeFilter="classTypeFilter"
      ></class-type-filter-select> -->
      <ion-item>
    <ion-select
      interface="popover"
      v-model=classTypeFilter
    >
      <ion-select-option value="0">Foil</ion-select-option>
      <ion-select-option value="1">Epee</ion-select-option>
      <ion-select-option value="2">Saber</ion-select-option>
    </ion-select>
  </ion-item>
    </template>
    <!-- display student information -->
    <!-- <h2 v-if="!loadedStudent">could not find student with given ID</h2> -->
    <student-overview
      v-if="displayPage"
      :classType="loadedStudent.classTypes[classTypeFilter].class"
      :classTime="loadedStudent.classTypes[classTypeFilter].classGroupIds"
      :name="loadedStudent.name"
      :notes="loadedStudent.classTypes[classTypeFilter].notes"
    >
    </student-overview>

    <!-- <ion-button :router-link="`/studentList/${studentId}/edit`" expand="block" @click="passFilter()">Edit</ion-button> -->
    <ion-button @click="() => clickEditButton()"  expand="block">Edit</ion-button>

    <!-- <h2>{{ classTypeFilter }}Test</h2> -->
    <!-- testing stuff -->
    



  </base-layout>
  <!-- </div> -->



</template>

<script>

// vue/ionic imports 
import { IonSelect, IonSelectOption, IonItem } from "@ionic/vue";
import { IonButton } from "@ionic/vue";
import { useStore } from "vuex";
import {  ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

// custom imports
import studentOverview from "../components/student/studentOverview.vue";
// import classTypeFilterSelect from "../components/base/classTypeFilter.vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";





export default {
  components: {
    studentOverview,
    // classTypeFilterSelect,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonButton,
  },

  //options api way of doing things, only left here for reference, should remove from final product
  //   data() {
  //     //options api way of handeling data
  //     return {
  //       studentId: this.$route.params.id,
  //     };
  //   },

  //   computed: {
  //     loadedStudent() {
  //       return this.$store.getters.student(this.studentId);
  //     },
  //   },
  //   watch: { //he commented it out because he said it wasn't needed
  //       $route(currentRoute) {
  //           this.memoryId = currentRoute.params.id;
  //       }
  //   }

  // composition api code
  setup() {
    // creates constants to work with route, store, and storage and set them up properly
    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });
    //await in example, but can't use await in standardSetUp
    // storage.create();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    //general variables
    const studentId = ref(route.params.id); //may need to make var instead of const and experiment with options API method
    var displayPage = ref("");

    // const loadedStudent = reactive(getStudent(studentId.value));

    // loads student info, need to make work with sqlite localstorage later
    const loadedStudent = ref(null)

    //loads data from state if available, gets from localstorage if not
    watchEffect(async () => {
      await storage.create();

      // await storage.clear();
      // const getStudent = async (studentId) => {
      const student = store.getters.student(studentId.value);
      // gets student from state in vuex if possible, otherwise looks in localstorage
      if (student) {
        console.log("gotten from State: ", student);
        loadedStudent.value = student;
        console.log("1 storage keys: ", await storage.keys());
        displayPage.value = "true";
      }
      //else statement not tested yet
      else {
          const studentJson = await storage.get(studentId.value);
          const studentParsed = JSON.parse(studentJson);
          // const studentParsed = JSON.parse(studentJson);
          // store.dispatch("addStudent", studentParsed); //don't add to state
          console.log("gotten from sql and added to state (no longer adds to state): ", studentParsed);
          console.log("2 storage keys: ", await storage.keys());
          loadedStudent.value = studentParsed;
          console.log("loadedStudent ", loadedStudent.value);

          displayPage.value = "true";

          

      }
    });
    // console.log("studentDetails loading exercises: ", loadedStudent.value)

    //var.value lets you access variable in setup

    // get classTypeFilter from state and defaults to foil if all is selected
    

    var classTypeFilter = ref(store.getters.classTypeFilter);
    if (classTypeFilter.value === "all") {
      classTypeFilter.value = "0";
    }
    const passFilter = () => {
      store.dispatch("passClassTypeFilter", classTypeFilter.value);
    };


    // 
    const clickEditButton = async () => {
        passFilter();
        store.dispatch("addStudent", loadedStudent.value); //don't add to states
        router.replace(`/studentList/${studentId.value}/edit`);
    }

    //return values from setup we need
    return { loadedStudent, classTypeFilter, displayPage, studentId, passFilter, clickEditButton };
  },



};
</script>