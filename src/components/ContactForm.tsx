import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../src/redux/store";
import { addContacts, editContacts } from "../redux/contactsSlice";

interface FormProps {
  contactId: string | null;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  isActive: boolean;
}

const ContactForm: React.FC<FormProps> = ({ contactId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    isActive: false,
  });

  useEffect(() => {
    if (contactId) {
      const selectedContact = contacts.find(
        (contact) => contact.id === contactId
      );
      if (selectedContact) {
        setFormData(selectedContact);
      }
    }
  }, [contactId, contacts]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "phoneNumber" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactId) {
      dispatch(editContacts({ id: contactId, updates: formData }));
    } else {
      dispatch(addContacts(formData));
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: 0,
        isActive: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        contactId ? " bg-slate-950" : "bg-gray-800"
      }  p-8 rounded-lg shadow-lg`}
    >
      {contactId ? (
        <div className="font-medium text-red-400 text-2xl mb-2">
          Edit Contact
        </div>
      ) : (
        <div className="font-medium text-red-400 text-2xl mb-2">
          Add a New Contact
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-white mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-white mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-white mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="isActive" className="block text-white mb-2">
          Is Active?
        </label>
        <select
          id="isActive"
          name="isActive"
          value={formData.isActive.toString()}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        {contactId ? "Edit Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
