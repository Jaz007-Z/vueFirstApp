<template>
  <base-layout page-title="Add Student" page-default-back-link="/classList">
    <!-- <h2>Add Class</h2> -->
    <form class="ion-padding" @submit.prevent="submitForm">
      <!-- student's name and unique ID, it's recommended but not required that the USFA ID is used -->
      <ion-list>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input type="text" required v-model="enteredStudentName" />
        </ion-item>
        <!-- need to add verification that this is unique later on -->
        <ion-item>
          <ion-label position="floating">
            Student ID (recommend USFA ID)
          </ion-label>
          <ion-input type="text" required v-model="enteredStudentId" />
        </ion-item>
      </ion-list>
      <!-- <h2>Test: {{ fencesFoil }}</h2> -->

      <!-- user is asked what swords the fencers uses -->
      <ion-list class="ion-padding-top">
        <ion-label>Weapon Used</ion-label>
        <!-- trying to use classTypeFilter dropdown here -->
        <weapon-type></weapon-type>
        
      </ion-list>

      <!-- information for each weapon is asked about if the user says a student uses that weapon -->
      <div v-show="fencesFoilConversion()">
        <student-info-edit
          :swordType="'Foil'"
          v-model:classes="foilStudentClasses"
          v-model:notes="foilStudentNotes"
          v-model:studentType="foilStudentType"
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
import studentInfoEdit from "../components/student/studentInfoEdit.vue";
import weaponType from "../components/base/classTypeFilter.vue"
// import database from "../store/database"
// import { defineEmits } from "vue";

export default {
  //   emits: ["save-student"],
  components: {
    weaponType,
    studentInfoEdit,
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
  //       enteredStudentId: "",
  //     };
  //   },

  //   methods: {
  //     saveStudent(studentData) {
  //       this.$store.dispatch('addStudent', studentData);
  //       this.$router.replace('/studentList');
  //     },

  //     submitForm() {
  //       const studentData = {
  //         id: this.enteredStudentId,
  //       };
  //     //   this.$emit("save-student", studentData);
  //       this.saveStudent(studentData);
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
    const enteredStudentId = ref("");
    const enteredStudentName = ref("");
    const takesPrivateLessons = ref("");

    // Foil class info
    const foilStudentClasses = ref("");
    const foilStudentNotes = ref("");
    const foilStudentType = ref("");
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

    const saveStudent = (studentData) => {
      store.dispatch("addStudent", studentData);

      router.replace("/studentList");
    };

    const submitForm = () => {
      // const studentId = enteredStudentId.value;
      const studentData = {
        id: enteredStudentId.value,
        name: enteredStudentName.value,
        takesPrivateLessons: takesPrivateLessons.value,
        classTypes: [
          {
            class: "Foil",
            fences: fencesFoilConversion(),
            classGroupIds: foilStudentClasses.value,
            notes: foilStudentNotes.value,
            studentType: foilStudentType.value,
            openFence: foilOpenFences.value,
            attendsTournaments: foilAttendsTournaments.value,
            abilityScale: foilAbilityScale.value,
            readyToProgress: foilReadyToProgress.value,
            attendance: [],
          },
          {
            class: "Epee",
            fences: fencesEpeeConversion(),
            classGroupIds: epeeStudentClasses.value,
            notes: epeeStudentNotes.value,
            studentType: epeeStudentType.value,
            openFence: epeeOpenFences.value,
            attendsTournaments: epeeAttendsTournaments.value,
            abilityScale: epeeAbilityScale.value,
            readyToProgress: epeeReadyToProgress.value,
            attendance: [],
          },
          {
            class: "Saber",
            fences: fencesSaberConversion(),
            classGroupIds: saberStudentClasses.value,
            notes: saberStudentNotes.value,
            studentType: saberStudentType.value,
            openFence: saberOpenFences.value,
            attendsTournaments: saberAttendsTournaments.value,
            abilityScale: saberAbilityScale.value,
            readyToProgress: saberReadyToProgress.value,
            attendance: [],
          },
        ],
      };
      // emits("save-student", studentData);
      saveStudent(studentData);
    };

    return {
      saveStudent,
      submitForm,
      fencesFoilConversion,
      fencesEpeeConversion,
      fencesSaberConversion,
      fencesFoil,
      fencesEpee,
      fencesSaber,
      enteredStudentId,
      enteredStudentName,
      //foil info return
      foilStudentClasses,
      foilStudentNotes,
      foilStudentType,
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
</script>