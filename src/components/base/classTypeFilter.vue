<template>
  <ion-item>
    <ion-select
      interface="popover"
      :value="classTypeFilter"
      @IonChange="$emit('update:classTypeFilter', $event.target.value)"
    >
      <ion-select-option v-if="allShow" value="All">All</ion-select-option>
      <ion-select-option value="0">Foil</ion-select-option>
      <ion-select-option value="1">Epee</ion-select-option>
      <ion-select-option value="2">Saber</ion-select-option>
    </ion-select>
  </ion-item>
</template>

    <!-- value="classTypeFilter" -->
    <script>
import { IonSelectOption, IonSelect, IonItem } from "@ionic/vue";

export default {
    props: ['allShow', 'classTypeFilter'],
    emits: ["update:classTypeFilter",],

  components: {
    IonSelectOption,
    IonSelect,
    IonItem,
  },

  setup() {
    //   const classTypeFilter = ref
  },
};
</script>