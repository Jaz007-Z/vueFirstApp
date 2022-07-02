<template>
  <!-- <div v-if="fencesFoil"> commented out for ease of testing-- may want to make this whole thing a component for ease of use -->
  <!-- <div> -->
  <ion-list class="ion-padding-top">
    <ion-label class="ion-padding-top">Class Info:</ion-label>
    <!-- <ion-item lines="none">
      <ion-label position="floating">Classes</ion-label>
      </ion-item> -->
    <ion-item>
      <ion-label position="floating">Syllabus</ion-label>
      <ion-textarea
        rows="2"
        :value="syllabus"
        @input="$emit('update:syllabus', $event.target.value)"
      ></ion-textarea>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Notes</ion-label>
      <ion-textarea
        rows="2"
        :value="notes"
        @input="$emit('update:notes', $event.target.value)"
      ></ion-textarea>
    </ion-item>

    <ion-item>
      <!-- add in dependency on classes available later -->
      <ion-label position="stacked">Class Type:</ion-label>
      <ion-input
        type="text"
        placeholder="Intermediate"
        :value="classType"
        @input="$emit('update:classType', $event.target.value)"
      />
    </ion-item>

    <!-- <div class="grid-item">
      <ion-button id="open-modal"
      >Open Datetime Modal</ion-button>
      <ion-modal trigger="open-modal"
      :breakpoints="[0.05, 0.25, 5]"
      :initialBreakpoint="0.25"
      >
        <ion-content force-overscroll="false">
          <ion-datetime presentation="time"></ion-datetime>
        </ion-content>
      </ion-modal>
    </div> -->

    <ion-item>
    <ion-select
      interface="popover"
      :value="day"
      @ionChange="$emit('update:day', $event.target.value)"
    >
      <ion-select-option value="1">Monday</ion-select-option>
      <ion-select-option value="2">Tuesday</ion-select-option>
      <ion-select-option value="3">Wednesday</ion-select-option>
      <ion-select-option value="4">Thursday</ion-select-option>
      <ion-select-option value="5">Friday</ion-select-option>
      <ion-select-option value="6">Saturday</ion-select-option>
      <ion-select-option value="7">Sunday</ion-select-option>
    </ion-select>
    <!-- <ion-input :value="time" /> -->
    <ion-button fill="outline" id="open-time-input">
      Time: {{ format(parseISO(time), 'hh:mm aaa') }}
    </ion-button>
    <ion-popover trigger="open-time-input" :show-backdrop="false">
      <ion-datetime
        presentation="time"
        minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
        :value="time"
        @ionChange="$emit('update:time', $event.target.value)"
      />
    </ion-popover>
  </ion-item>
<!-- minuteValues="0,5,10,15,20,25,30,35,40,45,50,55" -->
    <!-- ion range for ability scale, with ticks -->

    <!-- <ion-item class="ion-padding-vertical">
        <ion-label>Takes Private Lessons</ion-label>
        <ion-select interface="popover" v-model="takesPrivateLessons">
          <ion-select-option value="true">True</ion-select-option>
          <ion-select-option value="false">False</ion-select-option>]
        </ion-select>
      </ion-item> -->
  </ion-list> 
  <!-- </div> -->
</template>

<script>
import { format, parseISO } from 'date-fns';


import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
    IonButton,
  //   IonRange,
  //   IonSelect,
  //   IonSelectOption,
  // IonModal,
  IonDatetime,
  // IonContent,
  // IonIcon,
  IonPopover,
  IonSelect,
  IonSelectOption,

} from "@ionic/vue";
// import { ref } from '@vue/reactivity';

// import { ref } from 'vue';

// import tagsInput from '../base/tagsInput.vue'
// import pickClassesList from '../student/pickClassesList.vue'
// import { calendar } from "ionicons/icons";
// import { ref } from '@vue/reactivity';

export default {
  props: ["swordType", "notes", "classType", "syllabus", "day", "time"],
  emits: ["update:notes", "update:classType", "update:syllabus", "update:day", "update:time"],
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    // IonRange,
    // IonSelect,
    // IonSelectOption,
    // tagsInput,
    // pickClassesList,
    // IonModal,
    IonDatetime,
    // IonIcon,
    // IonContent,
    IonPopover,
    IonSelect,
    IonSelectOption,
  },

  

  // composition api code
  setup() {
      // const time = ref('');

      return { format, parseISO }
  },
};
</script>