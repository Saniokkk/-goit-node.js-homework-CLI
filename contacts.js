const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require('uuid');
const contactsPath = path.join(__dirname, "db", "contacts.json");

/* update list contacts */

async function updateListContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
}

/* get list contacts  */

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

/* get contact by id */

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts?.filter(contact => contact.id === contactId.toString());   
    if (contact.length === 0) {
        return null;
    }
    return contact;
}

/* delete contact by id  */

async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(item => item.id === String(contactId));
  if (indexContact === -1) {
    return null
  }
  const [removeContact] = contacts.splice(indexContact, 1);
  updateListContacts(contacts);
  return removeContact;
}

/* add contact by id  */

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: uuid(),
    name,
    email,
    phone,
  }
  contacts.push(newContacts);
  updateListContacts(contacts);
  return newContacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}