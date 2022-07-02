<template>
  <base-layout page-title="Edit Session" page-default-back-link="/classList">
    <form class="ion-padding" @submit.prevent="submitForm">
      <ion-list>
        <p>
          <strong
            >Syllabus &nbsp;&nbsp;<ion-icon
              v-show="syllabusToggle"
              :icon="chevronDown"
              @click="() => (syllabusToggle = !syllabusToggle)"
            />
            <ion-icon
              v-show="!syllabusToggle"
              :icon="chevronUp"
              @click="() => (syllabusToggle = !syllabusToggle)"
            />
            :
          </strong>
        </p>
        <p v-show="syllabusToggle">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ loadedClass.syllabus }}
        </p>
        <!-- need to add verification that this is unique later on -->
      </ion-list>

      <!-- need to add in getter so a the current filter is the default -->
      <!-- user is asked what swords the fencers uses -->

      <!-- information for each weapon is asked about if the user says a student uses that weapon -->
      <ion-list class="ion-padding-top">
        <ion-label class="ion-padding-top">Session Info:</ion-label>
        <!-- <ion-item lines="none">
      <ion-label position="floating">Classes</ion-label>
      </ion-item> -->
        <ion-item>
          <ion-label position="floating">Notes</ion-label>
          <ion-textarea rows="2" v-model="loadedSession.notes"></ion-textarea>
        </ion-item>
        <!-- @input="$emit('update:notes', $event.target.value)" -->

        <ion-item>
          <ion-label position="floating">postLessonNotes</ion-label>
          <ion-textarea rows="2" v-model="loadedSession.postLessonNotes"></ion-textarea>
        </ion-item>
        <!-- @input="$emit('update:postLessonNotes', $event.target.value)" -->
      </ion-list>

      <h2>{{ parseISO(dayTime) }}</h2>
      <!-- add students to roster and display them -->
      <ion-item>
        <ion-button fill="outline" id="open-time-input" size="medium">
          Time: {{ format(parseISO(dayTime), " MM/dd hh:mm aaa") }}
        </ion-button>
        <ion-popover
          trigger="open-time-input"
          :show-backdrop="false"
          side="top"
        >
          <ion-datetime
            minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
            v-model="dayTime"
           
          />
          <!-- fix locale to more absolute solution later, and don't have travel mess it up -->
        </ion-popover>
      </ion-item>

      <ion-list>
        <p>
          <strong
            >Previous Class Notes: &nbsp;&nbsp;<ion-icon
              v-show="notesToggle"
              :icon="chevronDown"
              @click="() => (notesToggle = !notesToggle)"
            />
            <ion-icon
              v-show="!notesToggle"
              :icon="chevronUp"
              @click="() => (notesToggle = !notesToggle)"
            />
          </strong>
        </p>
        <p v-show="notesToggle">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ previousSessionNotes }}
        </p>
        <p v-show="notesToggle"><strong> Previous Class Post Lesson Notes: </strong></p>
        <p v-show="notesToggle">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ previousSessionPostNotes }}
        </p>
        <!-- need to add verification that this is unique later on -->
      </ion-list>

      <ion-list class="ion-padding-top">
        <ion-label>Student Attendance </ion-label>
      </ion-list>
      <ion-list>
        <ion-item v-for="student in studentRoster" :key="student.id">
          <ion-toggle
            slot="end"
            @ionChange="studentAttendanceAddOrRemove($event.target.value)"
            :value="student.id"
            :checked="loadedSession.studentsAttended.indexOf(student.id) != -1"
          ></ion-toggle>
          <ion-icon :icon="close" @click="removeStudent(student)"></ion-icon>
          <ion-label>{{ student.name }}</ion-label>
        </ion-item>
      </ion-list>
      <v-select
        :options="students()"
        class="ion-padding"
        label="name"
        :value="studentAddition"
        @option:selected="studentRosterAddition"
      ></v-select>

      <ion-grid>
        <ion-row>
          <ion-col col-6>
            <ion-button type="submit" expand="block">Save</ion-button>
          </ion-col>
          <ion-col col-6>
            <ion-button @click.once="() => clickCancelButton()" expand="block"
              >Cancel</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
  </base-layout>
</template>
<!-- const classG = store.getters.class(classId.value); -->

<script>
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
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonToggle,
  IonDatetime,
  IonPopover,
} from "@ionic/vue";

// vue select imports
// import Vue from 'vue'
import vSelect from "vue-select";

import { close, checkmark, chevronDown, chevronUp } from "ionicons/icons";

// Vue.component('v-select', vSelect)
// style import for Vue select
import "vue-select/dist/vue-select.css";

//imports from vue for composition api
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref } from "@vue/reactivity";
// import classInfoEdit from "../components/classes/classInfoEdit.vue";
// import weaponType from "../components/base/classTypeFilter.vue";
// import database from "../store/database"
// import { defineEmits } from "vue";
import {
  format,
  parseISO,
  nextDay,
  getHours,
  getMinutes,
  setMinutes,
  setHours,
} from "date-fns";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { watchEffect } from "@vue/runtime-core";

export default {
  //   emits: ["save-student"],
  components: {
    // classInfoEdit,
    // weaponType,
    vSelect,
    IonList,
    IonItem,
    IonLabel,
    // IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    // IonSelect,
    // IonSelectOption,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonTextarea,
    IonToggle,
    IonDatetime,
    IonPopover,
  },

  //   },
  name: "VModel",
  setup() {
    // creates constants to work with route, store, and storage and set them up properly
    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });

    // watchEffect(async () => {
    //   await storage.create();
    // });
    const createStorage = async () => {
      await storage.create();
    }
    createStorage();

    // const emits = defineEmits(['save-student']);
    //compostion api vue functionality imports
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    //see if fences each section, only ask for info if student fences that weapon\
    // const fencesFoil = () => {
    //  ref(false);
    //   }

    // get class information
    const classId = ref(route.params.id);
    const loadedClass = ref(store.getters.classG(classId.value));
    const sessionId = ref(route.params.sessionId);
    const loadedSession = ref(store.getters.session(sessionId.value));


    // const loadedClassNotReactive = store.getters.classG(classId.value);
    console.log("loadedClass.value class sessionEdit: ", loadedClass.value);
    console.log("loadedSession.value class sessionEdit: ", loadedSession.value);

    const weaponFenced = ref("0");

    //since ion select option only deals in text values, this converts teh fences[weapon] to a boolean
    const weaponFencedConversion = () => {
      var weaponFencedBoolean = null;
      if (weaponFenced.value == "false") {
        weaponFencedBoolean = false;
      }
      if (weaponFenced.value == "true") {
        weaponFencedBoolean = true;
      }
      return weaponFencedBoolean;
    };

    //data for student being Added, universal here
    // const isPrivateLesson = ref("");
    


    const setTime = () => {
      let nextDayTime = null;
      const now = Date.now();
      const hours = getHours(parseISO(regularTime.value));
      const minutes = getMinutes(parseISO(regularTime.value));
      nextDayTime = nextDay(now, regularDay.value);
      nextDayTime = setHours(nextDayTime, hours);
    //   console.log("nextDayTime after hours set: ", nextDayTime);
      nextDayTime = setMinutes(nextDayTime, minutes);
    //   console.log("nextDayTime after minutes set: ", nextDayTime);

      console.log("pre toISOString nextDayTime: ", nextDayTime);

      nextDayTime = moment(nextDayTime.toISOString()).locale('es').format();

      console.log("!!!!nextDayTime toISOString: ", nextDayTime);
      // console.log("nextDayTimeParsed: ", parse(nextDayTime));

      return nextDayTime;
    };

    // class info
    const postLessonNotes = ref("");
    const notes = ref("");
    const classType = ref("");
    const regularTime = ref(loadedClass.value.time);
    const regularDay = ref(loadedClass.value.day);
    const dayTime = ref(setTime());

    // dayTime.value = parseISO(dayTime.value)
    // dayTime.value = '2021-06-04T19:00:00-04:00';

    // variables and functions to handle the student roster
    const studentList = ref(store.getters.students);
    const studentRosterClassPrep = loadedClass.value.studentRoster;
    // const studentRosterClassPrep2 = []
    
    // const studentRoster = Object.assign([{}]) 
    // const studentRoster = ref(markRaw(loadedClass.value.studentRoster)); 
    const studentRoster = ref([]);
    studentRosterClassPrep.forEach(student => {
      studentRoster.value.push(student)
    });
    
    const studentAddition = ref(null);


    const syllabusToggle = ref(true);
    const notesToggle = ref(true);

    const students = () => {
      // console.log("studentFilter studentRoster.value: ", studentRoster.value);
      const studentListFiltered = studentList.value.filter(
        (student) =>
          !studentRoster.value.some((studentR) => studentR.id == student.id)
      );
      //   const studentListFiltered = studentList.value.filter(
      //     (student) => !studentRoster.value.includes(student)
      //   );
      // console.log("studentListFiletered: ", studentListFiltered);
      return studentListFiltered;
    };

    const studentRosterAddition = (student) => {
      studentRoster.value.push(student);
      studentAddition.value = null;
      console.log("sessionEdit - studentRoster: ", studentRoster.value);
    };


    const studentAttendanceAddOrRemove = (student) => {
      console.log("addOrRemove start studentsAttended: ", loadedSession.value.studentsAttended)
      console.log("addOrRemove student: ", student)
      const index = loadedSession.value.studentsAttended.indexOf(student) 
      console.log("index: ", index)
      if (index == -1) {
        loadedSession.value.studentsAttended.push(student);
        console.log("push");
      }
      else {
        loadedSession.value.studentsAttended.splice(index, 1);
        console.log("remove (splice)");

      }
      console.log("studentsAttendedAddOrRemOve end studentsAttended: ", loadedSession.value.studentsAttended)
    }

    const removeStudent = (student) => {
      const index = studentRoster.value.indexOf(student);
      console.log("removeStudent: ", student);
      if (index > -1) {
        studentRoster.value.splice(index, 1); // 2nd parameter means remove one item only
      }
    };

    // const toggleAttendance = () => {
    //     if (attended == true
    // }

    // saves class info to storage and changes and saves the new classList Array
    const saveClass = async (sessionData) => {
    //   const keyArray = await storage.keys();
    //   if (keyArray.includes(sessionData.id)) {
    //     console.log(
    //       "error, Id already used, all Ids (for students and classes) must be unique"
    //     );
    //     return "error";
    //   }

      // store.dispatch("addStudent", classData);
      loadedClass.value.individualSessions.push({
        name: loadedClass.value.name + parseISO(dayTime.value),
        id: sessionId.value,
        date: dayTime.value,
      });

      const classGDataJSON = JSON.stringify(loadedClass.value);
      await storage.set(loadedClass.value.id, classGDataJSON);

      const sessionDataJSON = JSON.stringify(sessionData);
      await storage.set(sessionData.id, sessionDataJSON);


      // reroute after adding student
      router.replace("/classList");
    };

    const submitForm = () => {
      // const studentId = enteredClassId.value;
      const sessionData = {
        name: "name",
        groupId: loadedClass.value.id,
        id: sessionId.value, 
        date: loadedSession.value.dayTime,
        // weapon: weaponFenced.value,
        // type: classType.value,
        // isPrivate: false,
        // name: enteredClassName.value,
        notes: loadedSession.value.notes,
        // level: "intermediate",
        postLessonNotes: loadedSession.value.postLessonNotes,
        dayTime: loadedSession.value.dayTime,
        studentsAttended: loadedSession.value.studentsAttended,
        // classList: ["displayed in attendance", "make sure they have a record in classList"], IMPORTANT TO ADD
        studentRoster: loadedSession.value.studentRoster,
      };
      // emits("save-student", classData);
      console.log("submitForm sessionData: ", sessionData);
      saveClass(sessionData);
    };

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
          const sortedSessionList = sessionList.value.sort(dateComparison);
          const filteredSessionList = sortedSessionList.filter((session) => session.date <= dayTime.value);
          const previousSessionInfo = filteredSessionList[filteredSessionList.length-1];
        //   console.log("previousSessionInfo - getPrevSession", previousSessionInfo, filteredSessionList.length-1)
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

    const clickCancelButton = () => {
      // console.log("clickCancelButton");
      store.dispatch("deleteLastSession");
      store.dispatch("deleteLastClass");
      router.replace(`/classList`);
    };

    const previousSessionNotes = ref("loading...");
    const previousSessionPostNotes = ref("loading..");

    watchEffect(async () => {
      const previousSession = await getPreviousSession();
      if (previousSession) {
        console.log("previousSession watchEffect: ", previousSession)
        previousSessionNotes.value = previousSession.notes;
        previousSessionPostNotes.value = previousSession.postLessonNotes;
        }
      else {
        previousSessionNotes.value = "N/A: No Previous Session";
        previousSessionPostNotes.value = "N/A"
      }
      
    })


    return {
      saveClass,
      submitForm,
      weaponFencedConversion,
      //foil info return
      postLessonNotes,
      notes,
      classType,
      weaponFenced,
      studentAddition,
      studentRosterAddition,
      removeStudent,
      studentRoster,
      studentList,
      students,
      close,
      checkmark,
      chevronDown,
      chevronUp,
      loadedClass,
      regularDay,
      regularTime,
      dayTime,
      format,
      parseISO,
      syllabusToggle,
      notesToggle,
      previousSessionNotes,
      previousSessionPostNotes,
      clickCancelButton,
      loadedSession,
      studentAttendanceAddOrRemove,

    };
  },
};
</script>