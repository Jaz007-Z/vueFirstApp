// import { StatusBarStyle } from '@capacitor/status-bar';
// import { forEach } from 'core-js/core/array';
import { createStore } from 'vuex';
// import { Drivers, Storage } from '@ionic/storage';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// const storage = new Storage({
//   driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
// });
// // in example, this had an await, but this isn't inside of a function. 
// storage.create();



const state = () => ({

    // filters
    studentIdList: [
        {
            id: "JimmyId",
            name: "Jimmy Zimsky"
        },
        {
            id: "AbbyId",
            name: "Abby"
        },
        {
            id: "VirginiaId",
            name: "Virginia Placeholder"
        }
    ],
    foilStudentList: ["JimmyId", "AbbyId", "VirginiaId"], //foil is weapon 0
    epeeStudentList: ["JimmyId", "AbbyId"], //epee is weapon 1
    saberStudentList: [], //empty on purpose //saver is weapon 2
    intermediateStudentList: [],

    classGroupIdList: [],
    privateClassesList: [],





    students: [
        {
            id: "JimmyId",
            name: "Jimmy Zimsky",
            takesPrivateLessons: "yes",
            classTypes: [
                {
                    class: "Foil",
                    takesPrivateLessons: true, //may or may not need
                    fences: true,
                    classGroupIds: ["Mon: 7:00", "groupId"],
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFences: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false,
                    attendance: [
                        {
                            id: "classId",
                            classGroupId: "classGroupId - private or time",
                        },
                        // "list of classes attended", "Thursday - 8:00 - intermediate"
                    ],
                },
                {
                    class: "Epee",
                    fences: true,
                    classGroupIds: ["None"],
                    coaches: ["None"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false
                },
                {
                    class: "Saber",
                    fences: false,
                    classGroupIds: ["None"],
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: false,
                    abilityScale: 4,
                    readyToProgress: false
                }]
        },
        {
            id: "AbbyId",
            name: "Abby",
            classTypes: [
                {
                    class: "Foil",
                    fences: true,
                    classGroupIds: ["Mon: 7:00"],
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false
                },
                {
                    class: "Epee",
                    fences: true,
                    classGroupIds: ["None"],
                    coaches: ["None"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false
                },
                {
                    class: "Saber",
                    fences: false,
                    classGroupIds: ["None"],
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: false,
                    abilityScale: 4,
                    readyToProgress: false
                }]
        },
        {
            id: "VirginiaId",
            name: "Virginia",
            classTypes: [
                {
                    class: "Foil",
                    fences: true,
                    classGroupIds: ["Mon: 7:00"],
                    classTime: "fill with classGroupId by default",
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["None"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false,

                },
                {
                    class: "Epee",
                    fences: false,
                    classGroupIds: ["None"],
                    coaches: ["None"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "none",
                    openFence: ["None"],
                    attendsTournaments: true,
                    abilityScale: 4,
                    readyToProgress: false
                },
                {
                    class: "Saber",
                    fences: false,
                    classGroupIds: ["None"],
                    coaches: ["John", "Danny"],
                    notes: "blabla needs to work on distance more and closing distance in lunges",
                    studentType: "competitive",
                    openFence: ["Tuesday: 8:00 - Sometimes", "Thursday: 8:00 - Regular"],
                    attendsTournaments: false,
                    abilityScale: 4,
                    readyToProgress: false
                }]
        },
    ],
    classes: [
    //     {
    //         id: "classGroupId",
    //         weapon: "foil",
    //         isPrivate: false,
    //         name: "make a default from info, but allow choice",
    //         type: "intermediate",
    //         syllabus: "work on footwork",
    //         notes: "notes general",
    //         regularTime: "Thursday at 8:00",
    //         studentRoster: ["displayed in attendance", "make sure they have a record in studentList"],
    //         individualClasses: [
    //             {
    //                 id: "might end up being date + time",
    //                 date: "dateObject"
    //                 // lessonPlans: "Lesson plan, do russian drill",
    //                 // postLessonNotes: "class needs to do better on lunges",
    //             },
    //         ]
    //     },
    //     {
    //         id: "classGroupId2",
    //         type: "epee",
    //         isPrivate: false,
    //         name: "make a default from info, but allow choice",
    //         level: "intermediate",
    //         syllabus: "work on footwork",
    //         regularTime: "Thursday at 8:00",
    //         studentList: ["displayed in attendance", "make sure they have a record in studentList"],
    //         individualClasses: [
    //             {
    //                 id: "might end up being date + time",
    //                 // lessonPlans: "Lesson plan, do russian drill",
    //                 // postLessonNotes: "class needs to do better on lunges",
    //             },
    //         ]
    //     },

    ],
    sessions: [
        {
            id: "id",
            classGroupId: "classGroupId",
            lessonPlans: "Lesson Plans, do Russian drill",
            postLessonNotes: "class needs to better on lunges",
            attended: ["JimmyId", "AbbyId", "VirginiaId"]
        }
    ],

    // studentListClassFilter: "all"
    classTypeFilter: "all"


})

const getters = {
    students(state) {
        return state.studentIdList;
    },
    studentListStudent(state) {
        return (studentId) => {
            return state.studentIdList.find((student) => student.id === studentId);
        }
    },
    student(state) {
        return (studentId) => {
            const student = state.students.find((student) => student.id === studentId);
            // if (student != null) {
            //     console.log("gotten from State: ", student);
            return student;
            //     }
            //     else {
            //         const studentJson = await storage.get(`${studentId}`);
            //         const studentParsed = JSON.parse(studentJson);
            //         actions.addStudent(studentParsed);
            //         console.log("gotten from sql and added to state: ", student);
            //         return student;
            //     }
        }
    },
    class(state) {
        return (classId) => {
            const classG = state.classes.find((classG) => classG.id === classId);
            // if (student != null) {
            //     console.log("gotten from State: ", student);
            return classG;
            //     }
            //     else {
            //         const studentJson = await storage.get(`${studentId}`);
            //         const studentParsed = JSON.parse(studentJson);
            //         actions.addStudent(studentParsed);
            //         console.log("gotten from sql and added to state: ", student);
            //         return student;
            //     }
        }
    },
    session(state) {
        return (sessionId) => {
            const session = state.sessions.find((session) => session.id === sessionId);
            return session;
        }
    },

    classes(state) {
        return state.classGroupIdList;
    },
    classG(state) {
        return (classGroupId) => {
            console.log("classG classList: ", state.classes)
            return state.classes.find((classG) => classG.id === classGroupId);
        }
    },
    classObjectsFiltered(state) {
        return (idArray) => {
            // fill in later once classes are actually in place
            // code to red of errors
            state.classes;
            idArray;
        }
    },
    // studentListClassFilter(state) {
    //     return state.studentListClassFilter;
    // }
    classTypeFilter(state) {
        return state.classTypeFilter;
    },

    //filter list getters
    foilStudentList(state) {
        return state.foilStudentList;
    },
    epeeStudentList(state) {
        return state.epeeStudentList;
    },
    saberStudentList(state) {
        return state.saberStudentList;
    },

}
// needs a lot of updating
const mutations = {
    addStudent(state, studentData) {
        const newStudent = studentData;
        state.students.unshift(newStudent);
    },
    deleteStudent(state, studentId) {
        const studentIndex = state.studentIdList.findIndex((student) => student.id === studentId);
        state.students.splice(studentIndex);
    },
    deleteLastStudent(state) {
        state.students.pop();
    },

    addClass(state, classData) {
        const newClass = classData;
        state.classes.unshift(newClass);
    },
    deleteLastClass(state) {
        state.classes.pop();
    },

    addSession(state, sessionData) {
        const newSession = sessionData;
        state.sessions.unshift(newSession);
    },
    deleteLastSession(state) {
        state.sessions.pop();
    },


    // passStudentListClassFilter(state, studentListClassFilter) {
    //     state.studentListClassFilter = studentListClassFilter;
    // }
    passClassTypeFilter(state, classTypeFilter) {
        state.classTypeFilter = classTypeFilter;
    },

    editStudent(state, studentData) {
        // const student = state.students.find((student) => student.id === studentData.oldId);
        // console.log("editStudent - StudentData: ", studentData);
        state.students.find((student) => student.id === studentData.oldId).name = studentData.name;
        // state.students.find((student) => student.id === studentId).overallNotes = studentData.overallNotes;
        state.students.find((student) => student.id === studentData.oldId).takesPrivateLessons = studentData.takesPrivateLessons;
        state.students.find((student) => student.id === studentData.oldId).classTypes[0] = studentData.classTypes[0];
        // console.log("classType[0]: ", studentData.classType[0])
        // needs verification that student id hasn't been taken.
        state.students.find((student) => student.id === studentData.oldId).id = studentData.id;
        console.log("new id: ", state.students.find((student) => student.id === studentData.id).id);

    },

    createStudentArray(state, studentArray) {
        state.studentIdList = studentArray;
    },
    createFencesFoilArray(state, fencesFoilArray) {
        state.fencesFoilArray = fencesFoilArray;
    },


    createClassArray(state, classArray) {
        state.classGroupIdList = classArray;
    },

}
const actions = {

    // this would be the place where I reach out to a back end server like Google sheets to save it
    addStudent(context, studentData) {
        context.commit('addStudent', studentData);
    },
    deleteStudent(context, studentId) {
        context.commit('deleteStudent', studentId);
    },
    deleteLastStudent(context) {
        context.commit('deleteLastStudent')
    },
    addClass(context, classData) {
        context.commit('addClass', classData);
    },
    deleteLastClass(context) {
        context.commit('deleteLastClass')
    }, 
    addSession(context, sessionData) {
        context.commit('addSession', sessionData);
    },
    deleteLastSession(context) {
        context.commit('deleteLastSession')
    },


    passClassTypeFilter(context, classTypeFilter) {
        context.commit('passClassTypeFilter', classTypeFilter);
    },
    editStudent(context, studentData) {
        context.commit('editStudent', studentData);
    },
    createStudentArray(context, studentArray) {
        context.commit('createStudentArray', studentArray);
    },
    createFencesFoilArray(context, fencesFoillArray) {
        context.commit('createFencesFoilArray', fencesFoillArray);
    },

    createClassArray(context, classArray) {
        context.commit('createClassArray', classArray);
    },

}



// const store = createStore({
//     state() {
//         return {
//             nameTest: "Nathan",

//             students: [
//                 {
//                     id: "Jimmy",
//                     class: "Foil",
//                     classTime: "Mon: 7:00",
//                 },
//                 {
//                     id: "Abby",
//                     class: "Foil",
//                     classTime: "Mon: 7:00",
//                 },
//                 {
//                     id: "Virginia",
//                     class: "Epee",
//                     classTime: "Tues: 7:00",
//                 },
//             ]
//         };
//     },
//     getters
//     // getters: {
//     //     students(state) {
//     //         return state.students;
//     //     },
//     //     student(state) {
//     //         return (studentId) => {
//     //             return state.students.find((student) => student.id === studentId);
//     //         }
//     //     },
//     //     nate(state) {
//     //         return state.nameTest;
//     //     }

//     // },
// })

// export default {store};
export default createStore({
    state, getters, mutations, actions,
});