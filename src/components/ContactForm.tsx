import React, { useState } from "react";
import { submitContact } from "../services/api";
import { ContactFormData } from "../types";

interface ExtendedContactFormData extends ContactFormData {
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ExtendedContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
    topic: "",
    message: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitContact(formData);
      setMessage(response.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        companySize: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Last name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Company name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Input text"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Company size
        </label>
        <select
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Please select</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="200+">200+</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Which topic best fit your needs?
        </label>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Please select</option>
          <option value="Support">Support</option>
          <option value="Sales">Sales</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          How can we help you?
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Input text"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full"
      >
        Submit
      </button>
      {message && <p className="text-center text-green-500">{message}</p>}
    </form>
  );
};

export default ContactForm;
