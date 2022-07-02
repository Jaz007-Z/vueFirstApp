<!-- <template >
  <base-layout
    :pageTitle="loadedClass ? loadedClass.name : 'Loading...'"
    page-default-back-link="/"
  >
    <template v-slot:actions-end>
      <class-type-filter-select
        v-model:classTypeFilter="classTypeFilter"
      ></class-type-filter-select>
    </template>
    <h2 v-if="!loadedClass">could not find class with given ID</h2>
    <student-overview
      v-else
      :classType="loadedClass.type"
      :classTime="loadedClass.classGroupIds"
      :name="loadedClass.name"
      :notes="loadedClass.syllabus"
    >
    </student-overview>
  </base-layout>
</template>

<script>
// import { reactive, ref } from "vue";
// import { IonSelect, IonSelectOption, IonItem } from "@ionic/vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import classTypeFilterSelect from "../components/base/classTypeFilter.vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

import studentOverview from "../components/student/studentOverview.vue";
export default {
  components: {
    classTypeFilterSelect,
    studentOverview,
    // IonSelect,
    // IonSelectOption,
    // IonItem,
  },

  // composition api code
  setup() {
    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });
    //await in example, but can't use await in standardSetUp
    storage.create();

    const store = useStore();
    const route = useRoute();

    var classId = ref(route.params.id); //may need to make var instead of const and experiment with options API method

    const loadedClass = computed(() => getClass(classId.value));
    const getClass = (classId) => {
      // const getStudent = async (studentId) => {
      const classG = store.getters.classG(classId);
      if (classG) {
        console.log("gotten from State: ", classG);
        return classG;
      }
      // else {
      //     const studentJson = await storage.get(studentId);
      //     const studentParsed = JSON.parse(studentJson);
      //     store.dispatch("addStudent", studentParsed);
      //     console.log("gotten from sql and added to state: ", student);
      //     return student;
      // }
    };

    //var.value lets you access variable in setup
    var classTypeFilter = ref(store.getters.classTypeFilter);
    if (classTypeFilter.value === "all") {
      classTypeFilter.value = "0";
    }

    //return values from setup we need
    return { loadedClass, classTypeFilter };
  },
};
</script> -->


<template v-if="displayPage">
  <!-- <div v-if="loadedStudent"> div disables animations and back button doesn't go back -->
  <base-layout
    :pageTitle="loadedClass ? loadedClass.name : 'Loading...'"
    page-default-back-link="/"
  >
    <!-- filter in toolbar for weapon type -->
    <template v-slot:actions-end>
      <!-- <class-type-filter-select
        v-model:classTypeFilter="classTypeFilter"
      ></class-type-filter-select> -->
      <ion-item>
        <ion-select interface="popover" v-model="classTypeFilter">
          <ion-select-option value="0">Foil</ion-select-option>
          <ion-select-option value="1">Epee</ion-select-option>
          <ion-select-option value="2">Saber</ion-select-option>
        </ion-select>
      </ion-item>
    </template>
    <!-- display Class information -->
    <!-- <h2 v-if="!loadedClass">could not find Class with given ID</h2> -->
    <student-overview
      v-if="displayPage"
      :classType="loadedClass.class"
      :classTime="loadedClass.classGroupIds"
      :name="loadedClass.name"
      :notes="loadedClass.notes"
    >
    </student-overview>
    <ion-content style="height: 40%"
    :scroll-events="true"
>
      <h1>Session List</h1>
    <ion-list v-if="displayPage">
    <ion-item v-for="session in loadedClass.individualSessions" :key="session.id"
     :router-link="`/classList/${loadedClass.id}/${session.id}`">
      {{ session.name }}
    </ion-item>
    </ion-list>
  </ion-content>

    <!-- <ion-button :router-link="`/studentList/${studentId}/edit`" expand="block" @click="passFilter()">Edit</ion-button> -->
    <ion-button @click="() => clickAddSession()" expand="block"
      >Add Session</ion-button
    >
    <ion-button @click="() => clickEditButton()" expand="block"
      >Edit</ion-button
    >

    <!-- <h2>{{ classTypeFilter }}Test</h2> -->
    <!-- testing stuff -->
  </base-layout>
  <!-- </div> -->
</template>

<script>
// vue/ionic imports
import {
  IonSelect,
  IonSelectOption,
  IonItem,
  // IonVirtualScroll,
  // IonInfiniteScroll,
  // IonInfiniteScrollContent,
  IonContent,
  IonList
} from "@ionic/vue";
import { IonButton } from "@ionic/vue";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
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
    // IonVirtualScroll,
    // IonInfiniteScroll,
    // IonInfiniteScrollContent,
    IonContent,
    IonList
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
    const classId = ref(route.params.id); //may need to make var instead of const and experiment with options API method
    var displayPage = ref("");

    // const loadedClass = reactive(getClass(ClassId.value));

    // loads student info, need to make work with sqlite localstorage later
    const loadedClass = ref(null);

    //loads data from state if available, gets from localstorage if not
    watchEffect(async () => {
      await storage.create();

      // await storage.clear();
      // const getClass = async (classId) => {
      const classG = store.getters.class(classId.value);
      // gets student from state in vuex if possible, otherwise looks in localstorage
      if (classG) {
        console.log("gotten from State: ", classG);
        loadedClass.value = classG;
        console.log("1 storage keys: ", await storage.keys());
        displayPage.value = "true";
      }
      //else statement not tested yet
      else {
        const classJson = await storage.get(classId.value);
        const classParsed = JSON.parse(classJson);
        // const classParsed = JSON.parse(classJson);
        // store.dispatch("addclass", classParsed); //don't add to state
        // console.log("gotten from sql and added to state (no longer adds to state): ", classParsed);
        // console.log("2 storage keys: ", await storage.keys());/
        loadedClass.value = classParsed;
        console.log("loadedClass classDetails: ", loadedClass.value)
        // console.log("loadedclass ", loadedclass.value);

        displayPage.value = "true";
      }
    });
    // console.log("classDetails loading exercises: ", loadedClass.value)

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
      store.dispatch("addClass", loadedClass.value); //don't add to states
      // console.log("clickEditButton addClass loadedClass.value: ", loadedClass.value)
      router.replace(`/classList/${classId.value}/edit`);
    };

    const clickAddSession = async () => {
      // passFilter();
      store.dispatch("addClass", loadedClass.value);
      // console.log("clickEditButton addClass loadedClass.value: ", loadedClass.value)
      router.replace(`/classList/${classId.value}/addSession`);
    };

    //return values from setup we need
    return {
      loadedClass,
      classTypeFilter,
      displayPage,
      classId,
      passFilter,
      clickEditButton,
      clickAddSession,
    };
  },
};
</script>

<!-- ion-content{
    height: 60% !important;
    overflow: hidden !important;
} -->