<template>
  <base-layout page-title="Edit Class" page-default-back-link="/classList">
    <form class="ion-padding" @submit.prevent.once="submitForm">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Class Name</ion-label>
          <ion-input type="text" required v-model="enteredClassName" />
        </ion-item>
        <!-- need to add verification that this is unique later on -->
        <ion-item>
          <ion-label position="floating">
            Class ID (Recommend USFA ID)
          </ion-label>
          <ion-input type="text" required v-model="enteredClassId" />
        </ion-item>
      </ion-list>

      <ion-list class="ion-padding-top">
        <ion-label>Weapon Fenced</ion-label>
      </ion-list>
      <weapon-type
        v-model:classTypeFilter="weaponFenced"
        :allShow="null"
      ></weapon-type>

      <!-- information for each weapon is asked about if the user says a student uses that weapon -->
      <class-info-edit
        v-model:swordType="weaponFenced"
        v-model:syllabus="syllabus"
        v-model:notes="loadedClass.notes"
        v-model:classType="classType"
        v-model:day="day"
        v-model:time="time"
      >
      </class-info-edit>

      <!-- add students to roster and display them -->
      <ion-list class="ion-padding-top">
        <ion-label>Add Students to Roster: </ion-label>
      </ion-list>
      <ion-list>
        <ion-item v-for="student in studentRoster" :key="student.id">
          <ion-icon
            slot="end"
            :icon="close"
            @click="removeStudent(student)"
          ></ion-icon>
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
            <ion-button @click="() => clickCancelButton()" expand="block"
              >Cancel</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
      <!-- <ion-button type="submit" >Save</ion-button>
      <ion-button @click="() => clickCancelButton()">Cancel</ion-button> -->
    </form>
  </base-layout>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  //IonTextarea,
  IonButton,
  // IonSelect,
  // IonSelectOption,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

// vue select imports
// import Vue from 'vue'
import vSelect from "vue-select";

import { close } from "ionicons/icons";

// Vue.component('v-select', vSelect)
// style import for Vue select
import "vue-select/dist/vue-select.css";

//imports from vue for composition api
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "@vue/reactivity";
import classInfoEdit from "../components/classes/classInfoEdit.vue";
import weaponType from "../components/base/classTypeFilter.vue";
// import database from "../store/database"
// import { defineEmits } from "vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { watchEffect } from "@vue/runtime-core";

export default {
  //   emits: ["save-student"],
  components: {
    classInfoEdit,
    weaponType,
    vSelect,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    // IonSelect,
    // IonSelectOption,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
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

    watchEffect(async () => {
      await storage.create();
    });

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
    const loadedClass = computed(() => store.getters.classG(classId.value));
    console.log("loadedClass.value class edit: ", loadedClass.value);

    const weaponFenced = ref(loadedClass.value.weapon);

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
    const enteredClassId = ref(loadedClass.value.id);
    const enteredClassName = ref(loadedClass.value.name);
    // const isPrivateLesson = ref("");

    // class info
    const syllabus = ref(loadedClass.value.syllabus);
    const notes = ref(loadedClass.value.notes);
    const classType = ref(loadedClass.value.type);
    const day = ref(loadedClass.value.day);
    const time =ref(loadedClass.value.time);

    // variables and functions to handle the student roster
    const studentList = ref(store.getters.students);
    const studentRoster = ref(loadedClass.value.studentRoster);
    const studentAddition = ref(null);

    const students = () => {
      const studentListFiltered = studentList.value.filter(
        (student) => !studentRoster.value.includes(student)
      );
      return studentListFiltered;
    };

    const studentRosterAddition = (student) => {
      studentRoster.value.push(student);
      studentAddition.value = null;
      console.log("classAdd - studentRoster: ", studentRoster.value);
    };

    const removeStudent = (student) => {
      const index = studentRoster.value.indexOf(student);
      console.log("removeStudent: ", student);
      if (index > -1) {
        studentRoster.value.splice(index, 1); // 2nd parameter means remove one item only
      }
    };

    // saves class info to storage and changes and saves the new classList Array
    const saveClass = async (classData) => {
      
      console.log("saveClass - classData: ", classData);
      // store.dispatch("editStudent", studentData); //still want to, may want to get rid of student after loading to keep load light

      //gets edited class info gathered
      var editedClass = loadedClass.value;
      // console.log("editedCLass: ", editedClass);

      editedClass.name = classData.name;
      editedClass.id = classData.id;

      if (classData.id != classData.oldId) {
        const keyArray = await storage.keys();
        if (keyArray.includes(classData.id)) {
          console.log(
            "error, Id already used, all Ids (for classes and classes) must be unique"
          );
          return "error";
        }
        await storage.remove(classData.oldId);
      }

      // store.dispatch("addStudent", classData);
      const classDataJSON = JSON.stringify(classData);
      console.log("class edit save: ", classDataJSON)
      await storage.set(classData.id, classDataJSON);

      //updates classList
      const classList = store.getters.classes;
      const index = classList.findIndex(
        (classG) => classG.id == classData.oldId
      );
      classList[index] = {
        id: classData.id,
        name: classData.name,
        weapon: classData.classType,
      };

      const classListJson = JSON.stringify(classList);
      await storage.set("classList", classListJson);
      store.dispatch("createClassArray", classList);
      // console.log("edited class Array: ", classList);

      // reroute after adding student
      store.dispatch("deleteLastClass");
      router.replace("/classList");
    };

    const submitForm = () => {
      // const studentId = enteredClassId.value;
      const classData = {
        oldId: classId.value,

        id: enteredClassId.value,
        weapon: weaponFenced.value,
        type: classType.value,
        isPrivate: false,
        name: enteredClassName.value,
        syllabus: syllabus.value,
        notes: loadedClass.value.notes,
        time: time.value,
        day: day.value,
        // regularTime: "Thursday at 8:00", IMPORTANT TO ADD
        // classList: ["displayed in attendance", "make sure they have a record in classList"], IMPORTANT TO ADD
        studentRoster: studentRoster.value,
        individualSessions: loadedClass.value.individualSessions,
      };
      // emits("save-student", classData);
      saveClass(classData);
    };

    const clickCancelButton = () => {
      // console.log("clickCancelButton");
      store.dispatch("deleteLastClass");
      router.replace(`/classList/${classId.value}`);
    };

    return {
      saveClass,
      submitForm,
      weaponFencedConversion,
      enteredClassId,
      enteredClassName,
      //foil info return
      syllabus,
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
      clickCancelButton,
      time,
      day,
      loadedClass
    };
  },
};
</script>