<template>
  <ion-item>
    <!-- <ion-select
      interface="popover"
      :value="chosenClass"
      @IonChange="$emit('update:chosenClass', $event.target.value)"
      @ionChange="$emit('update:selectedClass', $event.target.value)"
    > -->
    <ion-select
      interface="action-sheet"
      :value="classIdOriginal"
      @ionChange="$emit('update:selectedClass', $event.target.value); $emit('forceRender');"
    >
      <ion-select-option
        v-for="classX in filteredClasses"
        :key="classX.id"
        :value="classX.id"
      >
        {{ classX.name }}
      </ion-select-option>
      <!-- <ion-select-option value="0"> placeholder </ion-select-option> -->
    </ion-select>
  </ion-item>
</template>

    <!-- value="classTypeFilter" -->
<script>
import { IonSelectOption, IonSelect, IonItem } from "@ionic/vue";
import { ref } from "vue";
// import useEmit


export default {
  // props: ['classes', 'chosenClass', "previouslySelectedClasses"],
  props: ["classes", "previouslySelectedClasses", "selectedClass"],
  emits: ["update:selectedClass", "forceRender"],

  components: {
    IonSelectOption,
    IonSelect,
    IonItem,
  },

  setup(props) {
    // const props = defineProps( ['classes', 'previouslySelectedClasses'] );
    // const props = defineProps( {classes, previouslySelectedClasses} );
    console.log("props.selectedClass: ", props.selectedClass);
    console.log("props.classes pickClass: ", props.classes);
    console.log("props.previouslySelectedClasses pickClass: ", props.previouslySelectedClasses);

    // console.log(
    //   "props.previouslySelectedClasses pickClass: ",
    //   props.previouslySelectedClasses
    // );
    // console.log("props.classes[4].id pickClass: ", props.classes[4].id);
    // console.log(
    //   "props.previouslySelectedClasses[0].id pickClass: ",
    //   props.previouslySelectedClasses[0].id
    // );
    // const filteredClasses = props.classes;

    // const filteredClasses = props.classes.filter(
    //   (classX) => props.previouslySelectedClasses.some(classPrev => classPrev.id != classX.id || classPrev.id == "none")
    // );
    const classIdOriginal = ref(null);
    if (props.selectedClass != null) {
      console.log("props.selectedClass: ", props.selectedClass);
      const id = ref(props.selectedClass);
      classIdOriginal.value = id.value;
    }
    // console.log("filteredClasses - pickClass: ", filteredClasses);
    // const classNameOriginal = ref(props.selectedClass.name)
    console.log("classIdOriginal.value: ", classIdOriginal.value);


    //for reasons unknown, it seems to stop working there are more than one classes already selected, though one works fine
    const filterClasses = () => {
      const previouslySelectedClassesFiltered =
        props.previouslySelectedClasses.filter((classX) => classX != null);// || classX == null);
      console.log("previouslySelectedClassesFiltered", previouslySelectedClassesFiltered)
      const filteredClassesTemp = props.classes.filter((classX) =>

        !previouslySelectedClassesFiltered.includes(classX.id) ||
        previouslySelectedClassesFiltered.includes(classIdOriginal.value) ||
        classX.id == classIdOriginal.value //||
        // classX.id == "none"
        // previouslySelectedClassesFiltered.some(
        //   (classPrev) =>
        //     classPrev.id != classX.id ||
        //     classPrev == "none" //||
        //     // classPrev == classIdOriginal.value
        // )
      );
      console.log("pickClass - filteredClasses: ", filteredClassesTemp);
      filteredClasses.value = filteredClassesTemp;

      // console.log("pickClass - filteredClasses.value: ", filteredClasses.value);

      return filteredClassesTemp;
    };




    // const classIdOriginal = ref(null);
    // if (props.selectedClass != null) {
    //   console.log("props.selectedClass.id: ", props.selectedClass.id);
    //   const id = ref(props.selectedClass.id);
    //   classIdOriginal.value = id.value;
    // }
    // // console.log("filteredClasses - pickClass: ", filteredClasses);
    // // const classNameOriginal = ref(props.selectedClass.name)
    // console.log("classIdOriginal.value: ", classIdOriginal.value);

    // const filterClasses = () => {
    //   const previouslySelectedClassesFiltered =
    //     props.previouslySelectedClasses.filter((classX) => classX != null);
    //   const filteredClasses = props.classes.filter((classX) =>
    //     previouslySelectedClassesFiltered.some(
    //       (classPrev) =>
    //         classPrev.id != classX.id ||
    //         classPrev.id == "none" ||
    //         classPrev.id == classIdOriginal.value
    //     )
    //   );

    //   return filteredClasses;
    // };

    // const updateArray = () => {
    //   // $emit('update:selectedClass', $event.target.value);
    //   filteredClasses.value.sort();
    // }

    // const componentKey = ref(0);
    // const forceRender = () => {
    //   componentKey.value += 1;
    // }
    const filteredClasses = ref(null);
    // const filteredClasses = ref(filterClasses());
    filteredClasses.value = filterClasses();

    return { filteredClasses, classIdOriginal, filterClasses };
  },
};
</script>