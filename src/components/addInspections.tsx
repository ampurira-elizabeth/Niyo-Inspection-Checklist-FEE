"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Category, FormData } from "@/types/inspection";
import AddCategoryForm from "@/components/CategoryManagement";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function AddInspection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    garage_name: "",
    contact_person_tel: "",
    physical_location: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);

      // Initialize form data
      const initialFormData: FormData = {
        garage_name: "",
        contact_person_tel: "",
        physical_location: "",
      };
      data.forEach((category) => {
        category.items.forEach((item) => {
          initialFormData[item.id] = {
            status: "no",
            comments: "",
          };
        });
      });
      setFormData(initialFormData);
      setError(null);
    } catch (err) {
      setError("Error loading categories. Please try again.");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (
    itemId: number,
    status: "yes" | "no" | "neutral"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        status,
      },
    }));
  };

  const handleCommentChange = (itemId: number, comment: string) => {
    setFormData((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        comments: comment,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const items = Object.entries(formData).map(([checklistItemId, data]) => ({
        checklistItemId: parseInt(checklistItemId),
        ...data,
      }));

      const garage_name = formData.garage_name;
      const contact_person_tel = formData.contact_person_tel;
      const physical_location = formData.physical_location;

      const response = await api.submitInspection({
        garage_name,
        contact_person_tel,
        physical_location,
        items,
      });

      alert(
        `Inspection completed!\nTotal Score: ${response.percentage.toFixed(2)}%`
      );

      // Reset form
      fetchCategories();
    } catch (err) {
      setError("Error submitting inspection. Please try again.");
      console.error("Error submitting inspection:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to go to the previous category (optional)
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <Layout>
      <main className="min-h-screen bg-gray-50 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
          <div className="items-center ">
            {/* Logo and Header Section */}
            <div className="flex items-center justify-center mb-8">
              <div className="mr-4">
                <img
                  src="/public/niyo-logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <div className="text-xl font-bold text-gray-800">
                <p>Postal Box 160735 Kampala,UG</p>
                <p> +256 756 234 800</p>
                <p>secretariat@nagoa.org</p>
                <p>www.nagoa.org</p>
              </div>
            </div>
            {/* Name, Contact, and Location Fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="garage_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Garage Name
                </label>
                <input
                  type="text"
                  id="garage_name"
                  name="garage_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter garage name"
                  required
                  value={formData.garage_name}
                  onChange={(e) =>
                    setFormData({ ...formData, garage_name: e.target.value })
                  } // Update the state
                />
              </div>

              <div>
                <label
                  htmlFor="contact_person_tel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Person/Tel
                </label>
                <input
                  type="text"
                  id="contact_person_tel"
                  name="contact_person_tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter contact information"
                  required
                  value={formData.contact_person_tel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_person_tel: e.target.value,
                    })
                  } // Update the state
                />
              </div>

              <div>
                <label
                  htmlFor="physical_location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Physical Location
                </label>
                <input
                  type="text"
                  id="physical_location"
                  name="physical_location"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter physical location"
                  required
                  value={formData.physical_location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physical_location: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="">
              <h6 className="mt-10 text-center text-3xl font-bold text-gray-800">
                Physical Site-Visit Checklist
              </h6>
              <h2 className="text-center text-3xl font-bold text-gray-800">
                Basic Standard Requirements for NAGOA Membership
              </h2>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {categories.length > 0 && (
            <div className="mb-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">
                {categories[currentCategoryIndex].name}
              </h2>

              {categories[currentCategoryIndex].items.map((item) => (
                <div key={item.id} className="mb-6 border-b pb-4">
                  <p className="mb-3 font-medium text-gray-600">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-6 mb-3">
                    {(["yes", "neutral", "no"] as const).map((status) => (
                      <label
                        key={status}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name={`status-${item.id}`}
                          checked={formData[item.id]?.status === status}
                          onChange={() => handleStatusChange(item.id, status)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="group-hover:text-blue-600">
                          {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                        </span>
                      </label>
                    ))}
                    <textarea
                      value={formData[item.id]?.comments || ""}
                      onChange={(e) =>
                        handleCommentChange(item.id, e.target.value)
                      }
                      placeholder="Add comments here..."
                      className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4 mb-10">
            {currentCategoryIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              {currentCategoryIndex < categories.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
          {/* {categories.map((category) => (
          <div
            key={category.id}
            className="mb-8 bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              {category.name}
            </h2>

            {category.items.map((item) => (
              <div key={item.id} className="mb-6 border-b pb-4">
                <p className="mb-3 font-medium text-gray-600">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-3">
                  {(["yes", "neutral", "no"] as const).map((status) => (
                    <label
                      key={status}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name={`status-${item.id}`}
                        checked={formData[item.id]?.status === status}
                        onChange={() => handleStatusChange(item.id, status)}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span className="group-hover:text-blue-600">
                        {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                      </span>
                    </label>
                  ))}
                  <textarea
                  value={formData[item.id]?.comments || ""}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  placeholder="Add comments here..."
                  className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                />
                </div>

                
              </div>
            ))}
          </div>
        ))} */}

          {/* <div className="mb-4">
          <p>Which other Tools & Equipment would you want?</p>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showForm ? "Close Form" : "Add"}
          </button>

          {showForm && (
            <div className="mt-4 border p-4 rounded bg-gray-100">
              <AddCategoryForm />
            </div>
          )}
        </div> */}

          <button
            type="submit"
            disabled={submitLoading}
            className={`
            w-full py-3 px-4 rounded-md text-white font-medium
            ${
              submitLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            }
            transition-colors duration-200
          `}
          >
            {submitLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                Submitting...
              </span>
            ) : (
              "Submit Inspection"
            )}
          </button>
        </form>
      </main>
    </Layout>
  );
}
