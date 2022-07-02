<template>
  <base-layout page-title="Edit Student" page-default-back-link="/studentList">
    <!-- <h2>Add Student</h2> -->
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

      <ion-item>
        <ion-label>Fences {{ weaponType }}</ion-label>
        <ion-select interface="popover" v-model="fencesWeapon">
          <!-- :value="fencesWeapon" -->
          <ion-select-option value="true">True</ion-select-option>
          <ion-select-option value="false">False</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- <h2>Test: {{ fencesFoil }}</h2> -->

      <!-- user is asked what swords the fencers uses -->
      <!-- <ion-list class="ion-padding-top">
        <ion-label>Swords Fenced</ion-label>
        <ion-item>
          <ion-label>Foil</ion-label>
          <ion-select interface="popover" v-model="fencesFoil">
            <ion-select-option value="true">True</ion-select-option>
            <ion-select-option value="false">False</ion-select-option>
          </ion-select>
          <ion-label>Epee</ion-label>
          <ion-select interface="popover" v-model="fencesEpee">
            <ion-select-option value="true">True</ion-select-option>
            <ion-select-option value="false">False</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Saber</ion-label>
          <ion-select interface="popover" v-model="fencesSaber">
            <ion-select-option value="true">True</ion-select-option>
            <ion-select-option value="false">False</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list> -->

      <!-- information for each weapon is asked about if the user says a student uses that weapon -->
      <div>
        <student-info-edit
          :swordType="weaponType"
          v-model:classes="studentClasses"
          v-model:notes="studentNotes"
          v-model:studentType="studentType"
          v-model:openFences="openFences"
          v-model:attendsTournaments="attendsTournaments"
          v-model:abilityScale="abilityScale"
          v-model:readyToProgress="readyToProgress"
        >
        </student-info-edit>
      </div>
      <!-- <student-info-edit
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
      </student-info-edit> -->

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
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

//imports from vue for composition api
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";
import studentInfoEdit from "../components/student/studentInfoEdit.vue";
// import database from "../store/database"
// import { defineEmits } from "vue";

//imports for storage
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { watchEffect } from "@vue/runtime-core";

export default {
  //   emits: ["save-student"],
  components: {
    studentInfoEdit,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
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
  setup() {
    // creates constants to work with route, store, and storage and set them up properly
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const storage = new Storage({
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });

    // const id = ref(route.params.id);
    // console.log("id for student id from params: ", id)
    // var loadedStudent = ref(null);
    //data for student being Added, universal here
    // var enteredStudentId = ref(null);
    // var enteredStudentName = ref(null);
    // var takesPrivateLessons = ref(null);

    // Foil class info
    // var fencesWeapon = ref(null);
    // var studentClasses = ref(null);
    // var studentNotes = ref(null);
    // var studentType = ref(null);
    // var openFences = ref(null);
    // var attendsTournaments = ref(null);
    // var abilityScale = ref(null);
    // var readyToProgress = ref(null);
    watchEffect(async () => {
      await storage.create();
      // const loadedStudentJson = await storage.get(id.value);
      // loadedStudent.value = JSON.parse(loadedStudentJson);
      // console.log("loadedStudent 1 from editStudent: ", loadedStudent.value);
      // console.log("loadedStudent from editStudent: ", loadedStudent.id)
      //data for student being Added, universal here
      // enteredStudentId = loadedStudent.value.id;
      // enteredStudentName = loadedStudent.value.name;
      // takesPrivateLessons = loadedStudent.value.takesPrivateLessons;

      // // Foil class info
      // fencesWeapon.value =
      //   loadedStudent.value.classTypes[classTypeFilter.value].fences;
      // studentClasses =
      //   loadedStudent.value.classTypes[classTypeFilter.value].classGroupIds;
      // studentNotes =
      //   loadedStudent.value.classTypes[classTypeFilter.value].notes;
      // studentType =
      //   loadedStudent.value.classTypes[classTypeFilter.value].studentType;
      // openFences =
      //   loadedStudent.value.classTypes[classTypeFilter.value].openFences;
      // attendsTournaments =
      //   loadedStudent.value.classTypes[classTypeFilter.value]
      //     .attendsTournaments;
      // abilityScale =
      //   loadedStudent.value.classTypes[classTypeFilter.value].abilityScale;
      // readyToProgress =
      //   loadedStudent.value.classTypes[classTypeFilter.value].readyToProgress;

      //get all variables ready
    });
    // console.log("loadedStudent id from editStudent: ", loadedStudent.value.id);

    // const emits = defineEmits(['save-student']);
    //compostion api vue functionality imports

    //see if fences each section, only ask for info if student fences that weapon\
    // const fencesFoil = () => {
    //  ref(false);
    //   }
    const booleanConversion = (booleanString) => {
      var convertedBoolean = null;
      // console.log("converted boolean - booleanString: ", booleanString);
      if (booleanString == "false" || booleanString === false) {
        convertedBoolean = false;
      }
      if (booleanString == "true" || booleanString === true) {
        convertedBoolean = true;
      }
      console.log("converted boolean: ", convertedBoolean);
      return convertedBoolean;
    };

    const fencesWeaponConversion = () => {
      var fencesWeaponBoolean = null;
      if (fencesWeapon.value == "false" || fencesWeapon.value === false) {
        fencesWeaponBoolean = false;
      }
      if (fencesWeapon.value == "true" || fencesWeapon.value === true) {
        fencesWeaponBoolean = true;
      }
      return fencesWeaponBoolean;
    };
    // const fencesFoil = ref(false);
    // const fencesEpee = ref(false);
    // const fencesSaber = ref(false);
    // //since ion select option only deals in text values, this converts teh fences[weapon] to a boolean
    // const fencesFoilConversion = () => {
    //   var fencesFoilBoolean = null;
    //   if (fencesFoil.value == "false") {
    //     fencesFoilBoolean = false;
    //   }
    //   if (fencesFoil.value == "true") {
    //     fencesFoilBoolean = true;
    //   }
    //   return fencesFoilBoolean;
    // };
    // const fencesEpeeConversion = () => {
    //   var fencesEpeeBoolean = null;
    //   if (fencesEpee.value == "false") {
    //     fencesEpeeBoolean = false;
    //   }
    //   if (fencesEpee.value == "true") {
    //     fencesEpeeBoolean = true;
    //   }
    //   return fencesEpeeBoolean;
    // };
    // const fencesSaberConversion = () => {
    //   var fencesSaberBoolean = null;
    //   if (fencesSaber.value == "false") {
    //     fencesSaberBoolean = false;
    //   }
    //   if (fencesSaber.value == "true") {
    //     fencesSaberBoolean = true;
    //   }
    //   return fencesSaberBoolean;
    // };

    // get student information and chosen weapon type
    const studentId = ref(route.params.id);
    const loadedStudent = computed(() =>
      store.getters.student(studentId.value)
    );
    // console.log("loadedStudent without value: ", loadedStudent);
    // console.log("loadedStudent without value: ", loadedStudent);

    // const loadedStudent = store.getters.student(studentId.value);

    var classTypeFilter = ref(store.getters.classTypeFilter);
    if (classTypeFilter.value === "all") {
      classTypeFilter.value = "0";
    }

    var weaponType = null;
    if (classTypeFilter.value == "0") {
      weaponType = "Foil";
    } else if (classTypeFilter.value == "1") {
      weaponType = "Epee";
    } else {
      weaponType = "Saber";
    }

    //data for student being Added, universal here
    const enteredStudentId = ref(loadedStudent.value.id);
    const enteredStudentName = ref(loadedStudent.value.name);
    const takesPrivateLessons = ref(loadedStudent.value.takesPrivateLessons);

    // Foil class info
    const fencesWeapon = ref(
      String(loadedStudent.value.classTypes[classTypeFilter.value].fences)
    );
    const studentClasses = ref(
      loadedStudent.value.classTypes[classTypeFilter.value].classGroupIds
    );
    const studentNotes = ref(
      loadedStudent.value.classTypes[classTypeFilter.value].notes
    );
    const studentType = ref(
      loadedStudent.value.classTypes[classTypeFilter.value].studentType
    );
    const openFences = ref(
      loadedStudent.value.classTypes[classTypeFilter.value].openFences
    );
    const attendsTournaments = ref(
      String(
        loadedStudent.value.classTypes[classTypeFilter.value].attendsTournaments
      )
    );
    const abilityScale = ref(
      loadedStudent.value.classTypes[classTypeFilter.value].abilityScale
    );
    const readyToProgress = ref(
      String(
        loadedStudent.value.classTypes[classTypeFilter.value].readyToProgress
      )
    );

    //button functions

    const saveStudent = async (studentData) => {
      console.log("saveStudent - StudentData: ", studentData);
      // store.dispatch("editStudent", studentData); //still want to, may want to get rid of student after loading to keep load light

      //gets edited student info gathered
      var editedStudent = loadedStudent.value;
      // console.log("editedStudent: ", editedStudent);

      editedStudent.name = studentData.name;
      editedStudent.id = studentData.id;
      // editedStudent.overallNotes = studentData.overallNotes;
      editedStudent.classTypes[classTypeFilter.value] =
        studentData.classTypes[0];

      //check if it's the same ID, then checks if Id is used (returns if so), then deletes the old ID
      if (studentData.id != studentData.oldId) {
        const keyArray = await storage.keys();
        if (keyArray.includes(studentData.id)) {
          console.log(
            "error, Id already used, all Ids (for students and classes) must be unique"
          );
          return "error";
        }
        await storage.remove(studentData.oldId);
      }
      //stringifies student info and updates localStorage with it
      const editedStudentJson = JSON.stringify(editedStudent);
      await storage.set(studentData.id, editedStudentJson);

      console.log("editedStudent: ", editedStudent);

      //updates studentList
      const studentList = store.getters.students;
      const index = studentList.findIndex(
        (student) => student.id == studentData.oldId
      );
      // console.log("index for editing array: ", index)
      studentList[index] = { id: editedStudent.id, name: editedStudent.name };

      const studentListJson = JSON.stringify(studentList);
      await storage.set("studentList", studentListJson);
      store.dispatch("createStudentArray", studentList);
      // console.log("edited Student Array: ", studentList);

      //fencesWeaponUpdate
      var studentWeaponList = null;
      if (weaponType == "Foil") {
        studentWeaponList = store.getters.foilStudentList;
      } else if (weaponType == "Epee") {
        studentWeaponList = store.getters.epeeStudentList;
      } else {
        studentWeaponList = store.getters.saberStudentList;
      }
      // if (studentWeaponList.length === 0) {
      //   if (weaponType == "Foil") {
      //     studentWeaponList = await storage.get("foilStudentList");
      //   } else if (weaponType == "Epee") {
      //     studentWeaponList = await storage.get("epeeStudentList");
      //   } else {
      //     studentWeaponList = await storage.get("saberStudentList");
      //   }
      // }
      //checks if ID is in the list, and changes to the new ID if so,

      const indexWeaponList = studentWeaponList.findIndex(
        (studentId) => studentId == studentData.oldId
      );
      if (indexWeaponList === -1 && fencesWeaponConversion() != false) {
        studentWeaponList.push(editedStudent.id);
        console.log("studentWeaponList push if: ", studentWeaponList);
      } else if (indexWeaponList != -1 && fencesWeaponConversion() == false) {
        delete studentWeaponList[indexWeaponList];
        console.log("studentWeaponList delete if: ", studentWeaponList);
      } else if (fencesWeaponConversion() != false) {
        // console.log("index for editing array: ", indexWeaponList)
        studentWeaponList[indexWeaponList] = editedStudent.id;
        console.log(
          "studentWeaponList nuetral or new Idif if: ",
          studentWeaponList
        );
      }

      const studentWeaponListJson = JSON.stringify(studentWeaponList);
      if (weaponType == "Foil") {
        await storage.set("foilStudentList", studentWeaponListJson);
        store.dispatch("createFencesFoilArray", studentWeaponList);
      } else if (weaponType == "Epee") {
        await storage.set("epeeStudentList", studentWeaponListJson);
        // put in vuex store code here
      } else {
        await storage.set("saberStudentList", studentWeaponListJson);
        //put in vuex store code here
      }

      //   router.replace(`/studentFoilList/${enteredStudentId.value}`);
      store.dispatch("deleteLastStudent");
      router.replace("/studentList");
    };

    const submitForm = () => {

      // const studentId = enteredStudentId.value;
      const studentData = {
        //   edit specific values
        classType: classTypeFilter.value,
        oldId: studentId.value,

        id: enteredStudentId.value,
        name: enteredStudentName.value,
        takesPrivateLessons: takesPrivateLessons.value,
        classTypes: [
          {
            class: weaponType.value,
            fences: fencesWeaponConversion(),
            classGroupIds: studentClasses.value,
            notes: studentNotes.value,
            studentType: studentType.value,
            openFences: openFences.value,
            attendsTournaments: booleanConversion(attendsTournaments.value),
            abilityScale: abilityScale.value,
            readyToProgress: booleanConversion(readyToProgress.value),
            // attendance: [],
          },
        ],
      };
      // emits("save-student", studentData);

      saveStudent(studentData);
    };

    const clickCancelButton = () => {
      // console.log("clickCancelButton");
      store.dispatch("deleteLastStudent");
      router.replace(`/studentList/${studentId.value}`);
    };

    return {
      clickCancelButton,
      saveStudent,
      submitForm,
      // fencesFoilConversion,
      // fencesEpeeConversion,
      // fencesSaberConversion,
      // fencesFoil,
      // fencesEpee,
      // fencesSaber,
      enteredStudentId,
      enteredStudentName,
      //classSpecificInfo
      fencesWeapon,
      studentClasses,
      studentNotes,
      studentType,
      openFences,
      attendsTournaments,
      abilityScale,
      readyToProgress,
      //other variables
      weaponType,
    };
  },
};
</script>