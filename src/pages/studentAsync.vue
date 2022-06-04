<template>
    <Suspense>
        <student-async></student-async>
    </Suspense>
</template>
 


<script>

import studentAsync from "./studentAsync.vue";
 export default {
  components: { studentAsync },

     setup() {
        //  components: {
        //      studentAsync
        //  }
         
     },
 }
 </script>z