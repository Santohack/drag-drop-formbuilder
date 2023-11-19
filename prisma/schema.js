import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

class Form {
  constructor(userId, name, description = "", content = "[]", published = false) {
    this.id = uuidv4();
    this.userId = userId;
    this.createdAt = new Date();
    this.published = published;
    this.name = name;
    this.description = description;
    this.content = content;
    this.visits = 0;
    this.submissions = 0;
    this.shareURL = uuidv4(); // Unique share URL
    this.FormSubmissions = [];
  }
}

class FormSubmissions {
  constructor(formId, content) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.formId = formId;
    this.content = content;
  }
}

class FormStorage {
  constructor(filename) {
    this.filename = filename;
    this.data = { forms: [] };
    this._load();
  }

  _load() {
    if (existsSync(this.filename)) {
      this.data = JSON.parse(readFileSync(this.filename, 'utf8'));
    }
  }

  _save() {
    writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
  }

  addForm(form) {
    this.data.forms.push(form);
    this._save();
  }

  // Additional methods to update, delete, and retrieve forms would go here
}

// Usage example
const storage = new FormStorage(join(__dirname, 'forms.json'));
const newForm = new Form('user123', 'Sample Form', 'This is a description');
storage.addForm(newForm);
