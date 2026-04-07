class User {
  protected id: number;
  protected name: string;
  protected email: string;
  protected password: string;
  protected phone: string;
  protected age: number | undefined;
  protected notebooks: NoteBook[];

  constructor(
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.setAge(age);
    this.notebooks = [];
  }

  setAge(age: number): void {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this.age = age;
  }

  displayInfo(): void {
    console.log(`--- USER INFO ---`);
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone: ${this.phone}`);
    console.log(`Age: ${this.age}`);
  }

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
    console.log("user added a notBook")
  }

  removeNotebook(notebook: NoteBook): void {
    this.notebooks = this.notebooks.filter((nb) => nb !== notebook);
  }

  getNotebooks(): number {
    return this.notebooks.length;
  }
}

class AdminUser extends User {
  private _role: string;

  constructor(
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    role: string
  ) {
    super(name, email, password, phone, age);
    this._role = role;
  }

  addNote(notebook: NoteBook, note: Note): void {
    notebook.addNote(note);
    console.log(`Admin added a note`);
  }

  deleteNote(notebook: NoteBook, noteId: number): void {
    notebook.removeNote(noteId);
    console.log(`Admin removed a note`);
  }
}

class Note {
  protected id: number;
  protected title: string;
  protected content: string;
  protected user: User; 

  constructor(title: string, content: string, user: User) {
    this.id = Date.now();
    this.title = title;
    this.content = content;
    this.user = user;
  }

  preview(): string {
    return this.content;
  }

  getId(): number {
    return this.id;
  }

  getInfo(): void {
    console.log(`--- NOTE ---`);
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
    console.log(`Author: ${this.user["name"]}`);
  }
}

class NoteBook {
  private notes: Note[];

  constructor() {
    this.notes = [];
  }

  addNote(note: Note): void {
    this.notes.push(note);
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.getId() != noteId);
  }

  showNotes(): void {
    console.log(`--- NOTEBOOK NOTES ---`);
    this.notes.forEach((note) => {
      console.log(note.preview());
    });
  }
}

class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getItems(): T[] {
    return this.items;
  }
}

// const user1 = new User("seif", "seif@mail.com", "1234", "01143551255", 21);
// const note1 = new Note("Note 1", "This is the first note", user1);
// const admin = new AdminUser(
//   "Admin",
//   "admin@mail.com",
//   "admin123",
//   "01111111111",
//   35,
//   "admin"
// );

// user1.displayInfo();
// admin.displayInfo();



// const notebook1 = new NoteBook();

// user1.addNotebook(notebook1);
// console.log(user1.getNotebooks());

// const note2 = new Note("Note 2", "This is the second note", user1);

// admin.addNote(notebook1, note1);
// admin.addNote(notebook1, note2);

// notebook1.showNotes();

// note1.getInfo();


// admin.deleteNote(notebook1, note1.getId());

// notebook1.showNotes();

// const userStorage = new Storage<User>();
// const user = new User("mohamed", "mohamed@mail.com", "1234", "01143551255", 25);
// const user2 = new User("seif", "seif@mail.com", "1234", "01143551255", 25);
// userStorage.addItem(user);
// userStorage.addItem(user2);
// userStorage.removeItem(user)
// console.log(userStorage.getItems());