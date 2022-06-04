<template>
  <base-layout page-title="Student List" page-default-back-link="/studentList">
    <!-- second button at end in baseLayout slot -->
    <template v-slot:actions-end>
      <ion-button router-link="/studentList/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
      <ion-item>
        <ion-select
          interface="popover"
          value="all"
          v-model="selectedClassFilter"
        >
          <ion-select-option value="all">All</ion-select-option>
          <ion-select-option value=0>Foil</ion-select-option>
          <ion-select-option value=1>Epee</ion-select-option>
          <ion-select-option value=2>Saber</ion-select-option>
        </ion-select>
      </ion-item>
    </template>

    <ion-item>
      <ion-label>Users</ion-label>
      <ion-select>
        <ion-select-option v-for="student in students()" :key="student.id">{{
          student.name + " " + student.id
        }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-list>
      <ion-item
        v-for="student in students()"
        :router-link="`/studentList/${student.id}`"
        :key="student.id"
        @click="passFilter()"
      >
        {{ student.name }}
      </ion-item>
      <!-- <ion-item>Abby</ion-item>
      <ion-item>Virginia</ion-item>  -->
    </ion-list>

    <!-- <h2>{{ selectedClassFilter }}Test</h2> -->





  </base-layout>
</template>

<script>
import { ref } from "vue";
// import { computed, ref, watch } from 'vue';

// import baseLayout from "@/components/base/baseLayout.vue";
import {
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from "@ionic/vue";
import { add } from "ionicons/icons"; //will be returned in setup
import { useStore } from "vuex";
export default {
  components: {
    // baseLayout,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonLabel,
  },
  // computed: //options way of doing getter
  //   students() {
  //     return this.$store.getters.students;
  //   }
  // }
  setup() {
    const store = useStore(); //get store for global data access
    // const students = computed(() => store.actions.placeGoogleData);

    //get filter info
    const selectedClassFilter = ref("all");
    // const classFilter = refselectedClassFilter.value;
    const passFilter = () => {
      store.dispatch("passClassTypeFilter", selectedClassFilter.value);
    };

    //get student info
    // const students = computed(() => store.getters.students);
    const students = () => {
      var studentArray = store.getters.students;
      if (selectedClassFilter.value != "all") {
      // studentArray = studentArray.filter(student => student.classTypes[selectedClassFilter.value].fences == true);
      var weaponFilterArray = null;
      console.log("selectedClassFilter.value: ", selectedClassFilter.value)
      switch(selectedClassFilter.value) {
        case "0":
          weaponFilterArray = store.getters.foilStudentList;
          console.log("switch 1 filter", store.getters.foilStudentList)
          break;
        case "1":
          weaponFilterArray = store.getters.epeeStudentList;
          break;
        case "2":
          weaponFilterArray = store.getters.saberStudentList;
          break;
      }

      console.log("weaponFilterArray: ", weaponFilterArray);
      // studentArray = studentArray.filter(student => student.id in `studentListWeapon${selectedClassFilter.value}`);
      studentArray = studentArray.filter(student => weaponFilterArray.includes(student.id));
      console.log("studentArrayFiltered: ", studentArray);
      //

      }
      // console.log("studentarray: ",studentArray);
      return studentArray;
    }

    // returns needed data and import icons from Ionic
    return { students, add, selectedClassFilter, passFilter };
  },
};
</script>