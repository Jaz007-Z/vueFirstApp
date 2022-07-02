<template>
  <!-- <div v-if="fencesFoil"> commented out for ease of testing-- may want to make this whole thing a component for ease of use -->
  <div>
    <ion-list class="ion-padding-top">
      <ion-label class="ion-padding-top"
        >{{ swordType }} Student Info:</ion-label
      >
      <!-- <ion-item lines="none">
      <ion-label position="floating">Classes</ion-label>
      </ion-item> -->

      <pick-classes-list
      :classes="classes"
      >
      </pick-classes-list>
      <!-- <ion-item>
        add in dependency on classes available later 
        <pick-class
          :classes="weaponClassList"
          :previouslySelectedClasses="previouslySelectedClasses"
          v-model:selectedClass="selectedClasses[0]"
        ></pick-class>
        <pick-class
          :classes="weaponClassList"
          :previouslySelectedClasses="previouslySelectedClasses"
          v-model:selectedClass="selectedClasses[1]"
          v-if="selectedClasses[0]"
        ></pick-class> -->
        
        
        <!-- <pick-class

        /> -->
        <!-- <pick-class

        /> -->
                <!-- :classes="classesList"
        :previouslySelectedClasses="previouslySelectedClasses" -->
        <!-- <ion-input type="text" :value="classes" @input="$emit('update:classes', $event.target.value)" /> -->
      <!-- </ion-item> -->
      
      <!-- <ion-item>
          <ion-label position="floating">Coaches</ion-label>
          <ion-input type="text" v-model="enteredStudentClassTime" />
          </ion-item> -->
      <ion-item>
        <ion-label position="floating">Notes</ion-label>
        <ion-textarea rows="2" :value="notes" @input="$emit('update:notes', $event.target.value)"></ion-textarea>
      </ion-item>

      <ion-item>
        <!-- add in dependency on classes available later -->
        <ion-label position="stacked">Student Type:</ion-label>
        <ion-input
          type="text"
          placeholder="placeholder"
          :value="studentType" @input="$emit('update:studentType', $event.target.value)"
        />
      </ion-item>
      <!-- ion range for ability scale, with ticks -->
      <ion-item>
        <ion-label position="stacked">Ability Scale</ion-label>
        <ion-range
          min="1"
          max="10"
          step="1"
          snaps
          mode="ios"
          :value="abilityScale" @click="$emit('update:abilityScale', $event.target.value)"
        ></ion-range>
        <!-- changed from at @input to @click -->
      </ion-item>

      <!-- add selection list later -->
      <ion-item>
        <ion-label>Open Fence</ion-label>
        <ion-input
          type="text"
          placeholder="placeholder"
          :value="openFences" @input="$emit('update:openFences', $event.target.value)"
        />
      </ion-item>

      <ion-item class="ion-padding-top">
        <ion-label>Fences Tournaments</ion-label>
        <ion-select interface="popover" :value="attendsTournaments" @ionChange="$emit('update:attendsTournaments', $event.target.value)">
          <ion-select-option value="true">True</ion-select-option>
          <ion-select-option value="false">False</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item class="ion-padding-top">
        <ion-label>Ready to Progress</ion-label>
        <ion-select interface="popover" :value="readyToProgress" @ionChange="$emit('update:readyToProgress', $event.target.value)">
          <ion-select-option value="true">True</ion-select-option>
          <ion-select-option value="false">False</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- <ion-item class="ion-padding-vertical">
        <ion-label>Takes Private Lessons</ion-label>
        <ion-select interface="popover" v-model="takesPrivateLessons">
          <ion-select-option value="true">True</ion-select-option>
          <ion-select-option value="false">False</ion-select-option>]
        </ion-select>
      </ion-item> -->
    </ion-list>
  </div>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
//   IonButton,
  IonRange,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";

// import { ref } from 'vue';

// import tagsInput from '../base/tagsInput.vue'
import pickClassesList from '../student/pickClassesList.vue'

export default {
  props: ["swordType","classes", "notes", "studentType", "openFences", "attendsTournaments", "abilityScale", "readyToProgress", ],
  emits: ['update:classes','update:notes', 'update:studentType', 'update:openFences', 'update:attendsTournaments', 'update:abilityScale', 'update:readyToProgress'],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    // IonButton,
    IonRange,
    IonSelect,
    IonSelectOption,
    // tagsInput,
    pickClassesList,
  },

  data() {
    return {
      tags: ["Hello", "World"],
      tags2: ["Hello"],
      // classesList: [
      //  {name: "Epee Thursday at 7", id: "EpeeThurInt7"},
      //  {name: "Foul Int at 7:00 Monday", id: "foilMonInt7"},
      //  {name: "Foil Thursday Int at 7:00", id: "foilThurInt7"}, 
      //  {name: "Foil Beg at 8:00 Monday", id: "foilMonBeg8"}, 
      //  {name: "Foil Beg Thursday at 8", id: "foilThurBeg8"},
      //  {name: "None", id: "none"}
      //  ],
    };
  },

    // composition api code
    setup() {
      //   const previouslySelectedClasses = ref([ {name: "Foil Beg Thursday at 8", id: "foilThurBeg8"} ] );


        
      //   console.log("setup props classes: ", props.classes)
      //   // save for later, data is hardcoded right now
      //   // const selectedClasses = ref({classes: props.classes });
      //   const selectedClasses = ref( [{name: "Foil Int at 7:00 Monday", id: "foilMonInt7"}] )

      //   const weaponClassList = ref( [
      // //  {name: "Epee Thursday at 7", id: "EpeeThurInt7"},
      //  {name: "Foil Int at 7:00 Monday", id: "foilMonInt7"},
      //  {name: "Foil Thursday Int at 7:00", id: "foilThurInt7"}, 
      //  {name: "Foil Beg at 8:00 Monday", id: "foilMonBeg8"}, 
      //  {name: "Foil Beg Thursday at 8", id: "foilThurBeg8"},
      //  {name: "None", id: "none"}
      //  ])

       
      //   console.log("- props.classes studentInfo: ", selectedClasses.value.classes);
        
      //   const fillSelectedClasses = () => {
      //     var array = selectedClasses.value;
      //     // console.log("ARRAY in fillSelectedClasses: ", array);
      //     for (var i=array.length; i<25+1;i++) {
      //       array.push(null)
      //     }
      //     // console.log("ARRAY Filled in fillSelectedClasses: ", array);
      //     selectedClasses.value = array;
      //     return array;

      //     // selectedClasses.value.classes.fill(null, selectedClasses.value.classes.length, 25);
      //     // for (i=selectedClasses.value.length() - 1; i<25; i++) {
      //     //   selectedClasses.value
      //     // }
      //   }

      //   var test = null;
      //   test =  fillSelectedClasses();
      //   console.log("TEST: ", test);



      //   return { previouslySelectedClasses, selectedClasses, weaponClassList }
    },
};
</script>