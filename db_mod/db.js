const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// ta chyba najlepsza:
async function openDB() {
    // open the database
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    });
    // PRIMARY KEY - okresla, ze to jest klucz główny tablicy; a AUTOINCREMENT odpowiada za to, ze przy insercie jak wstawiasz nulla
    // to on sam okresla nastepna wartosc poprawny i teraz nie potrzebuje tej logiki na ID z kodu
    // nie ma stringa samego, jest text
    await db.exec('CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY AUTOINCREMENT, summary TEXT not null)')
    // await db.exec('INSERT INTO myTable(id, summary) VALUES(1, "Wynieść śmieci.")')
    return db
};

// To jest do listy:
// let list = [
//     {id: 0, summary: "Posprzątać kuchnię."},
//     {id: 1, summary: "Wynieść śmieci."}
// ];


// to nie dziala jak definiuje funkcje z function, czemu?
exports.showList = async () => {
    // to sie owiera z pol. do db
    const db = await openDB()
    try {
        const result = await db.all('SELECT * FROM myTable')
        return result
    } catch (error) {
        console.log(error)
    // To finally sie wywoluje bez wzgledu czy try jest sukcesem czy nie
    } finally {
        await db.close()
    }
};

// Dodawanie:
exports.addTask = async (summary) => {
        const db = await openDB()
        try {
            // spr czy nie bylo """ w JSie"
            // jak dama tu nulla to bedzie autoincrement
            await db.run('INSERT INTO myTable(summary) VALUES($summary)', {
                '$summary': summary
            });
            return await this.showList();
        } catch (error) {
            console.log(error)
        } finally {
            await db.close()
        }
    };

// Edytowanie:
exports.editTask = async (id, summary) => {
    const db = await openDB()
    try {
        await db.run('UPDATE myTable SET summary = :summary WHERE id = :id', {
            ':summary': summary, ':id': id 
        });
        return await this.showList();
    } catch (error) {
        console.log(error)
    } finally {
        await db.close()
    }
};

// Usuwanie:
exports.removeTask = async (id) => {
    const db = await openDB()
    try {
        await db.run('DELETE FROM myTable WHERE id = ' + id)
        return await this.showList();
    } catch (error) {
        console.log(error)
    } finally {
        await db.close()
    }
};

// Tego nie wiem, czy potrzebuję:
// tego nie musze miec, bo nie chce tego pokazywac:
//exports.list = list;