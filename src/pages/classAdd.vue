<!-- <template>
  <base-layout page-title="Add Student" page-default-back-link="/classList">
    <form class="ion-padding" @submit.prevent="submitForm">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Class Name
           </ion-label>
          <ion-input type="text" required v-model="enteredClassName" />
        </ion-item>
        <ion-item>
          <ion-label position="floating">
           Class ID (Must be Unique)
          </ion-label>
          <ion-input type="text" required v-model="enteredClassId" />
        </ion-item>
      </ion-list>

      <ion-list class="ion-padding-top">
        <ion-label>Weapon Used</ion-label>
        <weapon-type></weapon-type>
        
      </ion-list>

      <div v-show="fencesFoilConversion()">
        <student-info-edit
          :swordType="'Foil'"
          v-model:classes="foilStudentClasses"
          v-model:notes="notes"
          v-model:studentType="classType"
          v-model:openFence="foilOpenFences"
          v-model:attendsTournaments="foilAttendsTournaments"
          v-model:abilityScale="foilAbilityScale"
          v-model:readyToProgress="foilReadyToProgress"
        >
        </student-info-edit>
      </div>
      <student-info-edit
        v-if="fencesEpeeConversion()"
        :swordType="'Epee'"
        v-model:classes="epeeStudentClasses"
        v-model:notes="epeeStudentNotes"
        v-model:studentType="epeeStudentType"
        v-model:openFence="epeeOpenFences"
        v-model:attendsTournaments="epeeAttendsTournaments"
        v-model:abilityScale="epeeAbilityScale"
        v-model:readyToProgress="epeeReadyToProgress"
      >
      </student-info-edit>
      <student-info-edit
        v-if="fencesSaberConversion()"
        :swordType="'Saber'"
        v-model:classes="saberStudentClasses"
        v-model:notes="saberStudentNotes"
        v-model:studentType="saberStudentType"
        v-model:openFence="saberOpenFences"
        v-model:attendsTournaments="saberAttendsTournaments"
        v-model:abilityScale="saberAbilityScale"
        v-model:readyToProgress="saberReadyToProgress"
      >
      </student-info-edit>

      <ion-button type="submit" expand="block">Save</ion-button>
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
//   IonSelect,
//   IonSelectOption,
} from "@ionic/vue";

//imports from vue for composition api
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import classInfoEdit from "../components/student/classInfoEdit.vue";
import weaponType from "../components/base/classTypeFilter.vue"
// import database from "../store/database"
// import { defineEmits } from "vue";

export default {
  //   emits: ["save-student"],
  components: {
    weaponType,
    classInfoEdit,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    // IonSelect,
    // IonSelectOption,
  },

  //   data() {
  //     return {
  //       enteredClassId: "",
  //     };
  //   },

  //   methods: {
  //     saveClass(classData) {
  //       this.$store.dispatch('addStudent', classData);
  //       this.$router.replace('/classList');
  //     },

  //     submitForm() {
  //       const classData = {
  //         id: this.enteredClassId,
  //       };
  //     //   this.$emit("save-student", classData);
  //       this.saveClass(classData);
  //     },

  //   },
  name: "VModel",
  setup() {
    // const emits = defineEmits(['save-student']);
    //compostion api vue functionality imports
    const store = useStore();
    const router = useRouter();
    // const route = useRoute();

    //see if fences each section, only ask for info if student fences that weapon\
    // const fencesFoil = () => {
    //  ref(false);
    //   }
    var fencesFoil = ref(false);
    const fencesEpee = ref(false);
    const fencesSaber = ref(false);
    //since ion select option only deals in text values, this converts teh fences[weapon] to a boolean
    const fencesFoilConversion = () => {
      var fencesFoilBoolean = null;
      if (fencesFoil.value == "false") {
        fencesFoilBoolean = false;
      }
      if (fencesFoil.value == "true") {
        fencesFoilBoolean = true;
      }
      return fencesFoilBoolean;
    };
    const fencesEpeeConversion = () => {
      var fencesEpeeBoolean = null;
      if (fencesEpee.value == "false") {
         fencesEpeeBoolean = false;
      }
      if (fencesEpee.value == "true") {
         fencesEpeeBoolean = true;
      }
      return fencesEpeeBoolean;
    };
    const fencesSaberConversion = () => {
      var fencesSaberBoolean = null;
      if (fencesSaber.value == "false") {
        fencesSaberBoolean = false;
      }
      if (fencesSaber.value == "true") {
        fencesSaberBoolean = true;
      }
      return fencesSaberBoolean;
    };

    //data for student being Added, universal here
    const enteredClassId = ref("");
    const enteredClassName = ref("");
    const takesPrivateLessons = ref("");

    // Foil class info
    const foilStudentClasses = ref("");
    const notes = ref("");
    const classType = ref("");
    const foilOpenFences = ref("");
    const foilAttendsTournaments = ref("");
    const foilAbilityScale = ref("");
    const foilReadyToProgress = ref("");

    //Epee class info
    const epeeStudentClasses = ref("");
    const epeeStudentNotes = ref("");
    const epeeStudentType = ref("");
    const epeeOpenFences = ref("");
    const epeeAttendsTournaments = ref("");
    const epeeAbilityScale = ref("");
    const epeeReadyToProgress = ref("");

    //Saber class info
    const saberStudentClasses = ref("");
    const saberStudentNotes = ref("");
    const saberStudentType = ref("");
    const saberOpenFences = ref("");
    const saberAttendsTournaments = ref("");
    const saberAbilityScale = ref("");
    const saberReadyToProgress = ref("");

    const saveClass = (classData) => {
      store.dispatch("addStudent", classData);

      router.replace("/classList");
    };

    const submitForm = () => {
      // const studentId = enteredClassId.value;
      const classData = {
            id: "classGroupId",
            type: "foil",
            isPrivate: false,
            name: "make a default from info, but allow choice",
            level: "intermediate",
            syllabus: "work on footwork",
            regularTime: "Thursday at 8:00",
            classList: ["displayed in attendance", "make sure they have a record in classList"],
            individualClasses: [
                {
                    id: "might end up being date + time",
                    date: "dateObject"
                    // lessonPlans: "Lesson plan, do russian drill",
                    // postLessonNotes: "class needs to do better on lunges",
                },
            ]
        };
      // emits("save-student", classData);
      saveClass(classData);
    };

    return {
      saveClass,
      submitForm,
      fencesFoilConversion,
      fencesEpeeConversion,
      fencesSaberConversion,
      fencesFoil,
      fencesEpee,
      fencesSaber,
      enteredClassId,
      enteredClassName,
      //foil info return
      foilStudentClasses,
      notes,
      classType,
      foilOpenFences,
      foilAttendsTournaments,
      foilAbilityScale,
      foilReadyToProgress,
      //epee info return
      epeeStudentClasses,
      epeeStudentNotes,
      epeeStudentType,
      epeeOpenFences,
      epeeAttendsTournaments,
      epeeAbilityScale,
      epeeReadyToProgress,
      //saber info return
      saberStudentClasses,
      saberStudentNotes,
      saberStudentType,
      saberOpenFences,
      saberAttendsTournaments,
      saberAbilityScale,
      saberReadyToProgress,
    };
  },
}; 
</script> -->
<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<template>
  <base-layout page-title="Add Class" page-default-back-link="/classList">
    <form class="ion-padding" @submit.prevent.once="submitForm">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Class Name</ion-label>
          <ion-input type="text" required v-model="enteredClassName" />
        </ion-item>
        <!-- need to add verification that this is unique later on -->
        <ion-item>
          <ion-label position="floating">
            Class ID (recommend USFA ID)
          </ion-label>
          <ion-input type="text" required v-model="enteredClassId" />
        </ion-item>
      </ion-list>

      <!-- need to add in getter so a the current filter is the default -->
      <!-- user is asked what swords the fencers uses -->
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
        v-model:notes="notes"
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
            <ion-button @click.once="() => clickCancelButton()" expand="block"
              >Cancel</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
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
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import classInfoEdit from "../components/classes/classInfoEdit.vue";
import weaponType from "../components/base/classTypeFilter.vue";
// import database from "../store/database"
// import { defineEmits } from "vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
// import { watchEffect } from "@vue/runtime-core";

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

    const createStorage = async () => {
      await storage.create();
    }
    createStorage();

    // watchEffect(async () => {
    //   await storage.create();
    // });

    // const emits = defineEmits(['save-student']);
    //compostion api vue functionality imports
    const store = useStore();
    const router = useRouter();
    // const route = useRoute();

    //see if fences each section, only ask for info if student fences that weapon\
    // const fencesFoil = () => {
    //  ref(false);
    //   }
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
    const enteredClassId = ref("");
    const enteredClassName = ref("");
    // const isPrivateLesson = ref("");

    // class info
    const syllabus = ref("");
    const notes = ref("");
    const classType = ref("");
    const day = ref("1");
    const time = ref('2021-06-04T19:00:00-04:00');

    // variables and functions to handle the student roster
    const studentList = ref(store.getters.students);
    const studentRoster = ref([]);
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
      const keyArray = await storage.keys();
      if (keyArray.includes(classData.id)) {
        console.log(
          "error, Id already used, all Ids (for students and classes) must be unique"
        );
        return "error";
      }

      // store.dispatch("addStudent", classData);
      const classDataJSON = JSON.stringify(classData);
      await storage.set(classData.id, classDataJSON);

      //classList change
      const classList = store.getters.classes;
      classList.push({
        id: classData.id,
        name: classData.name,
        weapon: classData.weapon,
      });
      console.log("Classlist store state after push: ", store.getters.classes);

      // classList.push("Why is this here?");
      const classListJson = JSON.stringify(classList);
      await storage.set("classList", classListJson);

      //

      // reroute after adding student
      router.replace("/classList");
    };

    const submitForm = () => {
      // const studentId = enteredClassId.value;
      const classData = {
        id: enteredClassId.value,
        weapon: weaponFenced.value,
        type: classType.value,
        isPrivate: false,
        name: enteredClassName.value,
        notes: notes.value,
        // level: "intermediate",
        syllabus: syllabus.value,
        time: time.value,
        day: day.value,
        // classList: ["displayed in attendance", "make sure they have a record in classList"], IMPORTANT TO ADD
        studentRoster: studentRoster.value,
        individualSessions: [
          // {
          //   id: "might end up being date + time",
          //   date: "dateObject",
          //   // lessonPlans: "Lesson plan, do russian drill",
          //   // postLessonNotes: "class needs to do better on lunges",
          // },
        ],
      };
      // emits("save-student", classData);
      saveClass(classData);
    };

    const clickCancelButton = () => {
      // console.log("clickCancelButton");
      // store.dispatch("deleteLastClass");
      router.replace(`/classList`);
    };

    return {
      saveClass,
      submitForm,
      clickCancelButton,
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
      day,
      time
    };
  },
};
</script>