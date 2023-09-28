import { readFile, writeFile } from "fs/promises";
import nanoid from "nanoid";

const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  const result = await readFile(contactsPath, "utf8");
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idContact = contacts.findIndex((contact) => contact.id === contactId);
  if (idContact === -1) {
    return null;
  }
  const [contact] = contacts.splice(idContact, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null));
  return contact;
};

export { listContacts, getContactById, addContact, removeContact };
