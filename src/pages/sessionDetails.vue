
<template v-if="displayPage">
  <!-- <div v-if="displayPage">  -->
  <!-- div disables animations and back button doesn't go back -->
  <base-layout page-title="Session Details" page-default-back-link="/classList">
    
    <!-- <v-select
      :options="students()"
      class="ion-padding"
      label="name"
      :value="studentAddition"
      @option:selected="studentRosterAddition"
    ></v-select> -->
    <session-details-overview
    v-if="displayPage"
    :loadedSession="loadedSession"
    :previousSessionNotes="previousSessionNotes"
    :previousSessionPostNotes="previousSessionPostNotes"
    :loadedClass="loadedClass"
    ></session-details-overview>


    <ion-button @click="() => clickEditButton()"  expand="block">Edit</ion-button>
  </base-layout>
  <!-- </div>  -->
</template>

<script>
// vue/ionic imports
// import { IonSelect, IonSelectOption, IonItem } from "@ionic/vue";
import {
  IonList,
  IonItem,
  IonLabel,
  //   IonInput,
  //IonTextarea,
  IonButton,
  // IonSelect,
  // IonSelectOption,
  IonIcon,
  IonTextarea,
//   IonToggle,
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";



import {
  format,
  parseISO,
} from "date-fns";
import { chevronDown, chevronUp, radioButtonOff, radioButtonOn } from "ionicons/icons";

// custom imports
// import classTypeFilterSelect from "../components/base/classTypeFilter.vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
// custom imports
import sessionDetailsOverview from "../components/classes/sessionDetailsOverview.vue";

export default {
  components: {
    // classInfoEdit,
    // weaponType,
    IonList,
    IonItem,
    IonLabel,
    // IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    // IonSelect,
    // IonSelectOption,
    IonIcon,
    IonTextarea,
    // IonToggle,
    sessionDetailsOverview,
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
    const classId = ref(route.params.id);
    const sessionId = ref(route.params.sessionId); //may need to make var instead of const and experiment with options API method
    var displayPage = ref("");

    // const loadedClass = reactive(getClass(ClassId.value));

    // loads student info, need to make work with sqlite localstorage later
    const loadedClass = ref(null);
    const loadedSession = ref(null);

    const syllabusToggle = ref(true);
    const notesToggle = ref(true);

    // //loads data from state if available, gets from localstorage if not
    // const loadSessionInfo = async () => {
    //     await storage.create();

    //   // await storage.clear();
    //   // const getClass = async (classId) => {
    //   const classG = store.getters.class(classId.value);
    //   // gets student from state in vuex if possible, otherwise looks in localstorage
    //   if (classG) {
    //     console.log("gotten from State: ", classG);
    //     loadedClass.value = classG;
    //     console.log("1 storage keys: ", await storage.keys());
    //     displayPage.value = "true";
    //   }
    //   //else statement not tested yet
    //   else {
    //     const classJson = await storage.get(classId.value);
    //     const classParsed = JSON.parse(classJson);

    //     const sessionJson = await storage.get(sessionId.value);
    //     const sessionParsed = JSON.parse(sessionJson);
    //     // const classParsed = JSON.parse(classJson);
    //     // store.dispatch("addclass", classParsed); //don't add to state
    //     // console.log("gotten from sql and added to state (no longer adds to state): ", classParsed);
    //     // console.log("2 storage keys: ", await storage.keys());/
    //     loadedSession.value = sessionParsed
    //     console.log("loadedSession: ", loadedSession.value)
    //     loadedClass.value = classParsed;
    //     console.log("loadedclass sessionDetails: ", loadedClass.value)
    //     // console.log("loadedclass ", loadedclass.value);

    //     displayPage.value = "true";
    // }}
    // // loadSessionInfo();

    
    const previousSessionNotes = ref("Does this even show up?");
    const previousSessionPostNotes = ref("?");

    const dateComparison = (a, b) => {
      // console.log("datecomparsion() - a: ", a, " -- b: ", b)
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      
      return date1 - date2;
    }

    const getPreviousSession = async () => {
      const sessionList = ref(loadedClass.value.individualSessions);
      if (sessionList.value) {
        if (sessionList.value.length >= 1) {
          console.log("previousNotes activiated")
          console.log
          const sortedSessionList = sessionList.value.sort(dateComparison);
          const filteredSessionList = sortedSessionList.filter((session) => session.date <= loadedSession.value.dayTime);
          const previousSessionInfo = filteredSessionList[filteredSessionList.length-1];
          console.log("previousSessionInfo - getPrevSession", previousSessionInfo, filteredSessionList.length-1)
          if (previousSessionInfo) {
          const previousSessionString = await storage.get(previousSessionInfo.id);
          const previousSession = JSON.parse(previousSessionString);
          return previousSession;
          }
          else {const previousSession = false;
          return previousSession }
        }
      return false
      }
    };

    // gets the previous session info
    watchEffect(async () => {
      await storage.create();

      // await storage.clear();
      // const getClass = async (classId) => {
      const classG = store.getters.class(classId.value);
      // gets student from state in vuex if possible, otherwise looks in localstorage
      if (classG  == "laksdfjklsakdjlfkjl") {
        console.log("gotten from State: ", classG);
        loadedClass.value = classG;
        console.log("1 storage keys: ", await storage.keys());
        displayPage.value = "true";
      }
      //else statement not tested yet
      else {
        const classJson = await storage.get(classId.value);
        const classParsed = JSON.parse(classJson);

        const sessionJson = await storage.get(sessionId.value);
        const sessionParsed = JSON.parse(sessionJson);
        // const classParsed = JSON.parse(classJson);
        // store.dispatch("addclass", classParsed); //don't add to state
        // console.log("gotten from sql and added to state (no longer adds to state): ", classParsed);
        // console.log("2 storage keys: ", await storage.keys());/
        loadedSession.value = sessionParsed
        // console.log("loadedSession: ", loadedSession.value)
        loadedClass.value = classParsed;
        console.log("loadedclass sessionDetails: ", loadedClass.value)
        // console.log("loadedclass ", loadedclass.value);

        displayPage.value = "true";
    
      const previousSession = await getPreviousSession();
      if (previousSession) {
        console.log("previousSession watchEffect: ", previousSession)
        console.log("previousSession.notes: ", previousSession.notes)
        previousSessionNotes.value = previousSession.notes;
        console.log("previousSessionNotes: ", previousSessionNotes.value)
        previousSessionPostNotes.value = previousSession.postLessonNotes;
        }
      else {
        previousSessionNotes.value = "N/A: No Previous Session";
        previousSessionPostNotes.value = "N/A"
      }
      
    }});
    
    // console.log("classDetails loading exercises: ", loadedClass.value)
    //var.value lets you access variable in setup
    // get classTypeFilter from state and defaults to foil if all is selected

    var classTypeFilter = ref(store.getters.classTypeFilter);
    if (classTypeFilter.value === "all") {
      classTypeFilter.value = "0";
    }

    //
    const clickEditButton = async () => {
      store.dispatch("addClass", loadedClass.value); //don't add to states
      // console.log("clickEditButton addClass loadedClass.value: ", loadedClass.value)
      store.dispatch("addSession", loadedSession.value)
      router.replace(`/classList/${classId.value}/${loadedSession.value.id}/edit`);
    };
    



    //return values from setup we need
    return {
      loadedClass,
      loadedSession,
      clickEditButton,
      classTypeFilter,
      displayPage,
      classId,
      format,
      parseISO,
      chevronDown, 
      chevronUp,
      syllabusToggle,
      notesToggle,
      previousSessionNotes,
      previousSessionPostNotes,
      radioButtonOff,
      radioButtonOn,
    };
  },
};
</script>