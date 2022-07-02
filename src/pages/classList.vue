<template>
  <base-layout page-title="Class List" page-default-back-link="null">
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
        {{ classG.name }}
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
  //   }
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
    // const classes = () => {
    //   var classArray = store.getters.classes;
    //   if (selectedClassFilter.value != "all") {
    //     classArray = classArray.filter(
    //       (student) =>
    //         student.classTypes[selectedClassFilter.value].fences == true
    //     );
    //   }
    //     return classArray;
    // };
      const classes = () => {
      var classArray = store.getters.classes;
      if (selectedClassFilter.value != "all") {
      // classArray = classArray.filter(class => class.classTypes[selectedClassFilter.value].fences == true);
      var weaponFilterArray = null;
      console.log("selectedClassFilter.value: ", selectedClassFilter.value)
      // switch(selectedClassFilter.value) {
      //   case "0":
      //     weaponFilterArray = store.getters.foilClassList;
      //     console.log("switch 1 filter", store.getters.foilClassList)
      //     break;
      //   case "1":
      //     weaponFilterArray = store.getters.epeeClassList;
      //     break;
      //   case "2":
      //     weaponFilterArray = store.getters.saberClassList;
      //     break;
      // };

      console.log("weaponFilterArray: ", weaponFilterArray);
      // classArray = classArray.filter(class => class.id in `classListWeapon${selectedClassFilter.value}`);
      // classArray = classArray.filter(class => weaponFilterArray.includes(class.id));
      console.log("classArrayFiltered: ", classArray);
      //

      }
      // console.log("studentarray: ",studentArray);
      return classArray;
    }
      // console.log("classArray: ",classArray);
    
    //end reuse

    // returns needed data and import icons from Ionic
    return { classes, add, selectedClassFilter, passFilter };
  },
};
</script>