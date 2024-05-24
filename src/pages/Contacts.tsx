import React, { useState } from "react";
import Form from "../components/ContactForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../src/redux/store";
import { deleteContacts } from "../../src/redux/contactsSlice";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  isActive: boolean;
}

const Contacts: React.FC = () => {
  const [showAddContactForm, setShowAddContactForm] = useState(false); // State for showing/hiding Add Contact form
  const [isEditing, setIsEditing] = useState(false); // State for indicating whether editing mode is active
  const [currentContactId, setCurrentContactId] = useState(""); // State for storing ID of currently edited contact
  const [viewedContact, setViewedContact] = useState<Contact | null>(null); // State for storing currently viewed contact details

  const contacts = useSelector((state: RootState) => state.contacts.contacts); // Access contacts array from Redux store
  const dispatch = useDispatch<AppDispatch>(); // Access dispatch function from Redux store

  const handleViewClick = (contact: Contact) => {
    if (contact === viewedContact) {
      setViewedContact(null);
    } else {
      setViewedContact(contact);
    }
    setIsEditing(false);
    setShowAddContactForm(false);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center ">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => {
            setShowAddContactForm(!showAddContactForm);
            setIsEditing(false);
          }}
        >
          Add Contact
        </button>
      </div>

      <div className="flex items-center justify-center ">
        {showAddContactForm && <Form contactId={null} />}
        {isEditing && <Form contactId={currentContactId} />}
      </div>

      {viewedContact && (
        <div className="flex justify-center m-4">
          <div className="w-5/6 lg:w-1/3 mt-4 p-4 border border-gray-300 rounded-md bg-black">
            <h2 className="text-xl font-bold mb-2">Contact Details</h2>
            <p>
              <strong>First Name:</strong> {viewedContact.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {viewedContact.lastName}
            </p>
            <p>
              <strong>Phone Number:</strong> {viewedContact.phoneNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {viewedContact.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      )}

      <ul>
        {contacts.length !== 0 ? (
          contacts.map((contact) => (
            <li
              key={contact.id}
              className="mb-4 flex justify-between items-center"
            >
              <div className="flex">
                <strong>
                  {contact.firstName} {contact.lastName}
                </strong>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => handleViewClick(contact)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    setCurrentContactId(contact.id);
                    setIsEditing(!isEditing);
                    setShowAddContactForm(false);
                    setViewedContact(null);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    dispatch(deleteContacts(contact.id));
                    setViewedContact(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className=" bg-slate-700 flex justify-center m-5 rounded-md text-xl">
            No contacts found. Please add contact using Add Contact button.
          </div>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
