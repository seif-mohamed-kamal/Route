"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebooks;
    constructor(name, email, password, phone, age) {
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.setAge(age);
        this.notebooks = [];
    }
    setAge(age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.age = age;
    }
    displayInfo() {
        console.log(`--- USER INFO ---`);
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
        console.log("user added a notBook");
    }
    removeNotebook(notebook) {
        this.notebooks = this.notebooks.filter((nb) => nb !== notebook);
    }
    getNotebooks() {
        return this.notebooks.length;
    }
}
class AdminUser extends User {
    _role;
    constructor(name, email, password, phone, age, role) {
        super(name, email, password, phone, age);
        this._role = role;
    }
    addNote(notebook, note) {
        notebook.addNote(note);
        console.log(`Admin added a note`);
    }
    deleteNote(notebook, noteId) {
        notebook.removeNote(noteId);
        console.log(`Admin removed a note`);
    }
}
class Note {
    id;
    title;
    content;
    user;
    constructor(title, content, user) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
        this.user = user;
    }
    preview() {
        return this.content;
    }
    getId() {
        return this.id;
    }
    getInfo() {
        console.log(`\n--- NOTE ---`);
        console.log(`Title: ${this.title}`);
        console.log(`Content: ${this.content}`);
        console.log(`Author: ${this.user["name"]}`);
    }
}
class NoteBook {
    notes;
    constructor() {
        this.notes = [];
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((n) => n.getId() != noteId);
    }
    showNotes() {
        console.log(`\n--- NOTEBOOK NOTES ---`);
        this.notes.forEach((note) => {
            console.log(note.preview());
        });
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getItems() {
        return this.items;
    }
}
