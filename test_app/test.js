const db_mod = require('../db_mod/db.js');

async function myShow() {
    try {
        const myList = await db_mod.showList();
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

(async () => {
    try {
        await myShow();
        await adding();
        await editing();
        await removing();
    } catch (e) {
         console.error(e);
    }
})();
