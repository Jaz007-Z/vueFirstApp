<template>
  <base-layout page-title="Class List" page-default-back-link=null>
    <!-- second button at end in baseLayout slot -->
    <template v-slot:actions-end>
      <ion-button router-link="/classList/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
      <class-type-filter
        :allShow="true"
        v-model:classTypeFilter="selectedClassFilter"
      ></class-type-filter>
    </template>

    <ion-list>
      <ion-item
        v-for="classG in classes()"
        :router-link="`/classList/${classG.id}`"
        :key="classG.id"
        @click="passFilter()"
      >
        {{ classG.id }}
      </ion-item>
    </ion-list>

    
  </base-layout>
</template>

<script>
import { ref } from "vue";
// import { computed, ref, watch } from 'vue';
import classTypeFilter from "../components/base/classTypeFilter.vue"
// import baseLayout from "@/components/base/baseLayout.vue";
import {
  IonList,
  IonItem,
    IonButton,
    IonIcon,
  //   IonSelect,
  //   IonSelectOption,
} from "@ionic/vue";
import { add } from "ionicons/icons"; //will be returned in setup
import { useStore } from "vuex";
export default {
  components: {
    classTypeFilter,
    // baseLayout,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    // IonSelect,
    // IonSelectOption,
  },
  // computed: //options way of doing getter
  //   classes() {
  //     return this.$store.getters.classes;
  //   }s
  // }
  setup() {
    const store = useStore(); //get store for global data access

    //reused classes from studentList.vue

    //get filter info
    const selectedClassFilter = ref("all");
    // const classFilter = refselectedClassFilter.value;
    const passFilter = () => {
      store.dispatch("passClassTypeFilter", selectedClassFilter.value);
    };

    //get class info, same as student List but changed names and values
    const classes = () => {
      var classArray = store.getters.classes;
      if (selectedClassFilter.value != "all") {
        classArray = classArray.filter(
          (student) =>
            student.classTypes[selectedClassFilter.value].fences == true
        );
      }
      // console.log("classArray: ",classArray);
      return classArray;
    };
    //end reuse

    // returns needed data and import icons from Ionic
    return { classes, add, selectedClassFilter, passFilter };
  },
};
</script>