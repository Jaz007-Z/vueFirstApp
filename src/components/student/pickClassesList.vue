<template>
  <div>
    <ion-item lines="none">
      <ion-label position="floating">Classes</ion-label>
    </ion-item>

    <ion-item>
      <!-- add in dependency on classes available later -->
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[0]"
        @force-render="forceRender"
        :key="componentKey"
      ></pick-class>
    </ion-item>
    <ion-item v-if="selectedClasses[0]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[1]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item>
    <ion-item v-if="selectedClasses[1]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[2]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item>
    <ion-item v-if="selectedClasses[2]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[3]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item>
    <ion-item v-if="selectedClasses[3]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[4]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item>

    <ion-item v-if="selectedClasses[4]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[5]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item><ion-item v-if="selectedClasses[5]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[6]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item><ion-item v-if="selectedClasses[6]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[7]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item><ion-item v-if="selectedClasses[7]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[8]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item><ion-item v-if="selectedClasses[8]">
      <pick-class
        :classes="weaponClassList"
        v-model:previouslySelectedClasses="selectedClasses"
        v-model:selectedClass="selectedClasses[9]"
        :key="componentKey"
        @force-render="forceRender"
      ></pick-class>
    </ion-item>
    
  </div>
</template>

<script>
import {
  //   IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";

import { ref } from "vue";

// import tagsInput from '../base/tagsInput.vue'
import pickClass from "../student/pickClass.vue";

export default {
  props: ["classes"],
  emits: ["update:classes"],
  components: {
    // IonList,
    IonItem,
    IonLabel,
    pickClass,
  },

  // composition api code
  setup(props, context) {
    // const previouslySelectedClasses = ref([
    //   { name: "Foil Int at 7:00 Monday", id: "foilMonInt7" },
    // ]);

    console.log("setup props classes: ", props.classes);
    // save for later, data is hardcoded right now
    // const selectedClasses = ref({classes: props.classes });
    // const selectedClasses = ref([
    //   { name: "Foil Int at 7:00 Monday", id: "foilMonInt7" },
    // ]);

    // const getClassIds = () => {
    //   if (props.classes) {
    //     const array = [];
    //     props.classes.forEach(classX => {
    //       array.push(classX.id)
          
    //     });
    //   }
    // }

    // const selectedClassesZ = props.classes
      
    // get array from state once that's in place DO LATER
    const selectedClasses = ref([
      "foilMonBeg8"
      // { name: "Foil Int at 7:00 Monday", id: "foilMonInt7" },
    ]);


    // this will be obtained through a store.get later DO LATER
    const weaponClassList = ref([
      //  {name: "Epee Thursday at 7", id: "EpeeThurInt7"},
      { name: "Foil Int at 7:00 Monday", id: "foilMonInt7" },
      { name: "Foil Thursday Int at 7:00", id: "foilThurInt7" },
      { name: "Foil Beg at 8:00 Monday", id: "foilMonBeg8" },
      { name: "Foil Beg Thursday at 8", id: "foilThurBeg8" },
      { name: "None", id: "none" },
    ]);

    console.log("- props.classes studentInfo: ", selectedClasses.value.classes);

    const fillSelectedClasses = () => {
      var array = selectedClasses.value;
      // console.log("ARRAY in fillSelectedClasses: ", array);
      for (var i = array.length; i < 25 + 1; i++) {
        array.push(null);
      }
      // console.log("ARRAY Filled in fillSelectedClasses: ", array);
      selectedClasses.value = array;
      return array;
    };

    var test = null;
    test = fillSelectedClasses();
    console.log("TEST: ", test);

  //  this is not tested and may not work right (if I'm lucky it does)
    const emitClasses = () => {
      // add in filter for the emit

      context.emit("update:classes", selectedClasses);
    }

    const componentKey = ref(0);
    const forceRender = () => {
      componentKey.value += 1;
      console.log("forceRender()");
      emitClasses();
    }




    return {selectedClasses, weaponClassList, componentKey, forceRender };
  },
};
</script>