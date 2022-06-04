// import { useStore } from "vuex";


// import { Drivers, Storage } from '@ionic/storage';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// // import { get } from "core-js/core/dict";

// const store = useStore();

// const storage = new Storage({
//     driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
// });
// // in example, this had an await, but this isn't inside of a function. 
// storage.create();

// export default {

// setup() {
    


// // const database = {
//     //returns an object from the database after parsing it
//      async function getValue(key) {
//         const jsonObject = await storage.get(key);
//         return JSON.parse(jsonObject);
//         //  const objectParsed = JSON.parse(jsonObject);
//         //  return objectParsed;
//     }

//     //
//      async function getStudent(studentId) {
//         // return (studentId) => {
//             const student = store.getters.student(studentId);
//             if (store.getters.student(studentId)) {
//                 console.log("gotten from State: ", student);
//                 return student;
//             }
//             else {
//                 const studentJson = await storage.get(studentId);
//                 const studentParsed = JSON.parse(studentJson);
//                 store.dispatch("addStudent", studentParsed);
//                 console.log("gotten from sql and added to state: ", student);
//                 return student;
//             }
//         }
//     }

//     // async addStudent(studentData) {

//     // }

//     // async addValueToState(key) {
//     //     const value = this.getValue(key);

//     // }
// // }
//     return { getStudent, getValue };

// }
// };

// // export default {
// //     database
// // }




// // // const database = {
// //     //returns an object from the database after parsing it
// //     export async function getValue(key) {
// //         const jsonObject = await storage.get(key);
// //         return JSON.parse(jsonObject);
// //         //  const objectParsed = JSON.parse(jsonObject);
// //         //  return objectParsed;
// //     }

// //     //
// //     export async function getStudent(studentId) {
// //         // return (studentId) => {
// //             const student = store.getters.student(studentId);
// //             if (store.getters.student(studentId)) {
// //                 console.log("gotten from State: ", student);
// //                 return student;
// //             }
// //             // else {
// //             //     const studentJson = await storage.get(studentId);
// //             //     const studentParsed = JSON.parse(studentJson);
// //             //     store.dispatch("addStudent", studentParsed);
// //             //     console.log("gotten from sql and added to state: ", student);
// //             //     return student;
// //             // }
// //         // }
// //     }

// //     // async addStudent(studentData) {

// //     // }

// //     // async addValueToState(key) {
// //     //     const value = this.getValue(key);

// //     // }
// // // }


// // // export default {
// // //     database
// // // }