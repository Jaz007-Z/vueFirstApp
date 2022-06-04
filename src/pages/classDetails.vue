<template >
  <base-layout
    :pageTitle="loadedClass ? loadedClass.name : 'Loading...'"
    page-default-back-link="/"
  >
    <template v-slot:actions-end>
      <class-type-filter-select
        v-model:classTypeFilter="classTypeFilter"
      ></class-type-filter-select>
    </template>
  <!-- </base-layout> -->
<!-- </template> -->
    <h2 v-if="!loadedClass">could not find student with given ID</h2>
    <student-overview
      v-else
      :classType="loadedClass.type"
      :classTime="loadedClass.classGroupIds"
      :name="loadedClass.name"
      :notes="loadedClass.syllabus"
    >
    </student-overview>
    <!-- <h2>{{ classTypeFilter }}Test</h2> -->
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
</script>