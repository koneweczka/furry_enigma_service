// To jest do apki:
const db_mod = require('../db_mod/db.js');

async function myShow() {
    try {
        // Czy ten await jst potrzebny tu?
        // nie jest potrzebny teraz tutaj:
        const myList = await db_mod.showList();
        // nie moze byc z pluem bo to castuje a stringa
        console.log("This is my list: ", myList)
    } catch (error) {
        console.log(error)
    }
}

async function adding() {
    try {
        const newList = await db_mod.addTask("Zadanie trzy.");
        console.log("New list is ", newList)
    } catch (error) {
        console.log(error)
    }
}

async function editing() {
    try {
        const editedList = await db_mod.editTask(1, "Edytowane.");
        console.log("After edition ", editedList)
    } catch (error) {
        console.log(error)
    }
}

async function removing() {
    try {
        const removeList = await db_mod.removeTask(3);
        console.log("After removing list ", removeList)
    } catch (error) {
        console.log(error)
    }
}

// to w kolejnoscy wywoluje te rzeczy i czeka na wynik ze wszystkiego;
(async () => {
    try {
        //to czeka az to sie skonczy:
        await myShow();
        await adding();
        await editing();
        await removing();
    } catch (e) {
         console.error(e);
    }
})();

//For check:
//console.log(db_mod.list)