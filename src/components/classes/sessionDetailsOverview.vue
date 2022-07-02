<template>
  <ion-list>
    <p>
      <strong
        >Syllabus &nbsp;&nbsp;<ion-icon
          v-show="syllabusToggle"
          :icon="chevronDown"
          @click="() => (syllabusToggle = !syllabusToggle)"
        />
        <ion-icon
          v-show="!syllabusToggle"
          :icon="chevronUp"
          @click="() => (syllabusToggle = !syllabusToggle)"
        />
        :
      </strong>
    </p>
    <p v-show="syllabusToggle">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ loadedClass.syllabus }}
    </p>
    <!-- need to add verification that this is unique later on -->
  </ion-list>

  <!-- need to add in getter so a the current filter is the default -->
  <!-- user is asked what swords the fencers uses -->

  <!-- information for each weapon is asked about if the user says a student uses that weapon -->
  <ion-list class="ion-padding-top">
    <ion-label class="ion-padding-top">Session Info:</ion-label>
    <!-- <ion-item lines="none">
      <ion-label position="floating">Classes</ion-label>
      </ion-item> -->
    <ion-item>
      <ion-label position="floating">Notes</ion-label>
      <ion-textarea
        readonly="true"
        rows="2"
        :value="loadedSession.notes"
      ></ion-textarea>
    </ion-item>
    <!-- @input="$emit('update:notes', $event.target.value)" -->

    <ion-item>
      <ion-label position="floating">postLessonNotes</ion-label>
      <ion-textarea
        readonly="true"
        rows="2"
        :value="loadedSession.postLessonNotes"
      ></ion-textarea>
    </ion-item>
    <!-- @input="$emit('update:postLessonNotes', $event.target.value)" -->
  </ion-list>

  <!-- <h2>{{ parseISO(loadedSession.dayTime) }}</h2> -->
  <!-- add students to roster and display them -->
  <!-- <ion-item> -->
    <!-- <ion-button fill="outline" id="open-time-input" size="medium">
        Time: {{ format(parseISO(loadedSession.dayTime), " MM/dd hh:mm aaa") }}
      </ion-button> -->
    <!-- <ion-popover trigger="open-time-input" :show-backdrop="false" side="top">
        <ion-datetime
          minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
          v-model="loadedSession.dayTime"
        />
      </ion-popover> -->
  <!-- </ion-item> -->

  <ion-list>
    <p>
      <strong
        >Previous Class Notes: &nbsp;&nbsp;<ion-icon
          v-show="notesToggle"
          :icon="chevronDown"
          @click="() => (notesToggle = !notesToggle)"
        />
        <ion-icon
          v-show="!notesToggle"
          :icon="chevronUp"
          @click="() => (notesToggle = !notesToggle)"
        />
      </strong>
    </p>
    <p v-show="notesToggle">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ previousSessionNotes }}
    </p>
    <p v-show="notesToggle">
      <strong> Previous Class Post Lesson Notes: </strong>
    </p>
    <p v-show="notesToggle">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ previousSessionPostNotes }}
    </p>
    <!-- need to add verification that this is unique later on -->
  </ion-list>

  <ion-list class="ion-padding-top">
    <ion-label>Student Attendance </ion-label>
  </ion-list>
  <ion-list>
    <ion-item v-for="student in loadedSession.studentRoster" :key="student.id">
      <!-- <ion-toggle
          slot="end"
          disabled="true"

          :value="student.id"
          :checked="loadedSession.studentsAttended.indexOf(student.id) != -1"
        ></ion-toggle> -->
      <ion-icon
        slot="end"
        v-show="loadedSession.studentsAttended.indexOf(student.id) != -1"
        :icon="radioButtonOn"
      />
      <ion-icon
        slot="end"
        v-show="loadedSession.studentsAttended.indexOf(student.id) == -1"
        :icon="radioButtonOff"
      />
      <!-- <ion-icon :icon="close" @click="removeStudent(student)"></ion-icon> -->
      <ion-label>{{ student.name }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { format, parseISO } from "date-fns";

import {
  IonList,
  IonItem,
  IonLabel,
  //   IonInput,
  //IonTextarea,
  IonButton,
  // IonSelect,
  // IonSelectOption,
  IonIcon,
  IonTextarea,
  //   IonToggle,
} from "@ionic/vue";

import {
  chevronDown,
  chevronUp,
  radioButtonOff,
  radioButtonOn,
} from "ionicons/icons";
// import { ref } from '@vue/reactivity';

import { ref } from 'vue';

// import tagsInput from '../base/tagsInput.vue'
// import pickClassesList from '../student/pickClassesList.vue'
// import { calendar } from "ionicons/icons";
// import { ref } from '@vue/reactivity';

export default {
  props: ["loadedSession", "previousSessionNotes", "previousSessionPostNotes", "loadedClass"],
  emits: ["update:loadedSession"],
  components: {
    // classInfoEdit,
    // weaponType,
    IonList,
    IonItem,
    IonLabel,
    // IonInput,
    // IonTextarea,
    IonButton, //may want to make it a global component
    // IonSelect,
    // IonSelectOption,
    IonIcon,
    IonTextarea,
    // IonToggle,
  },

  // composition api code
  setup() {
    // const time = ref('');

    const syllabusToggle = ref(true);
    const notesToggle = ref(true);

    return {
      format,
      parseISO,
      syllabusToggle,
      notesToggle,
      chevronDown,
      chevronUp,
      radioButtonOff,
      radioButtonOn,
    };
  },
};
</script>