<!-- student details displayed if Student ID is found -->
<template>
  <h3>Class: {{ classType }}, {{ classTime }}</h3>
  <p> {{ notes }} </p>
  <!-- <h2> {{ name }}</h2> -->
</template>

<script>

export default {

    props: ['name', 'classType', 'classTime', 'notes'],
    

//   watch: { //he commented it out because he said it wasn't needed
//       $route(currentRoute) {
//           this.memoryId = currentRoute.params.id;
//       }
//   }

  // composition api code
//   setup() {

//   },
};
</script>