import React, { useState } from "react";
import { submitContact } from "../services/api";
import { ContactFormData } from "../types";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
    topic: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      });
    } catch (error) {
      console.error(error);
      setMessage("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">First name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block">Last name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Input text"
          required
        />
      </div>
      <div>
        <label className="block">Company name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Input text"
        />
      </div>
      <div>
        <label className="block">Company size</label>
        <select
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Please select</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="200+">200+</option>
        </select>
      </div>
      <div>
        <label className="block">Which topic best fit your needs?</label>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Please select</option>
          <option value="Support">Support</option>
          <option value="Sales">Sales</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
      >
        Submit
      </button>
      {message && <p className="text-center text-green-500">{message}</p>}
    </form>
  );
};

export default ContactForm;
