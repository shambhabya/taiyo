import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

// Define the Contact interface
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  isActive: boolean;
}

// Define the ContactsState interface
interface ContactsState {
  contacts: Contact[];
}

// Define the initial state
const initialState: ContactsState = {
  contacts: [],
};

const normalizeBoolean = (value: any): boolean => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

// Create the contacts slice
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContacts: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const contact: Contact = {
        id: nanoid(),
        ...action.payload,
      };
      state.contacts.push(contact);
    },
    editContacts: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Contact> }>
    ) => {
      const { id, updates } = action.payload;
      state.contacts = state.contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updates,
              isActive: normalizeBoolean(updates.isActive),
            }
          : contact
      );
    },
    deleteContacts: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
  },
});

// Export actions
export const { addContacts, editContacts, deleteContacts } =
  contactsSlice.actions;

// Export the reducer
export default contactsSlice.reducer;
