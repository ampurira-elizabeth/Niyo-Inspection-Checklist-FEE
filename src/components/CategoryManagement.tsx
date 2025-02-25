"use client";
import { useState } from "react";
import { api } from '@/services/api';


export default function AddCategoryForm() {
    const [showForm, setShowForm] = useState(false);
    const [checklistItems, setChecklistItems] = useState<string[]>([""]);

    const handleAddChecklistItem = () => {
        setChecklistItems([...checklistItems, ""]); // Add an empty input for a new checklist item
    };

    const handleChecklistItemChange = (index: number, value: string) => {
        const updatedChecklistItems = [...checklistItems];
        updatedChecklistItems[index] = value;
        setChecklistItems(updatedChecklistItems);
    };

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();

        // Remove empty items
        const filteredChecklistItems = checklistItems.filter(item => item.trim() !== "");

        if (filteredChecklistItems.length === 0) {
            alert("Please add at least one valid checklist item.");
            return;
        }

        const requestData = { description: filteredChecklistItems }; // API expects "description" array

        try {
            const response = await fetch("/api/tools/equipments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert("Checklist items added successfully!");
                setChecklistItems([""]); // Reset checklist items
                setShowForm(false);
            } else {
                const errorData = await response.json();
                console.error("Server Error:", errorData);
                alert(`Failed to add data: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        console.log("🚀 handleSubmit triggered!");
    
        const filteredChecklistItems = checklistItems.filter(item => item.trim() !== "");
    
        if (filteredChecklistItems.length === 0) {
            console.log("⛔ No valid checklist items.");
            alert("Please add at least one valid checklist item.");
            return;
        }
    
        console.log("✅ Filtered Items:", filteredChecklistItems);
    
        const requestData = { description: filteredChecklistItems };
    
        try {
            console.log("📡 Sending request to add tools/equipment...");
            const response = await api.addToolsEquipment(requestData);
    
            console.log("✅ Response:", response);
    
            alert("Checklist items added successfully!");
            setChecklistItems([""]);
            setShowForm(false);
        } catch (error) {
            console.error("🔥 API Error:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="p-4">
            {/* Button to Open Modal */}
            <button
                type="button"
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Item
            </button>

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                        <h2 className="text-lg font-bold mb-4">Add Tools & Equipment</h2>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            ✖
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Checklist Items Input */}
                            {checklistItems.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <label className="block font-semibold">Checklist Item:</label>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                                        required
                                        className="border p-2 w-full rounded"
                                    />
                                </div>
                            ))}

                            {/* Button to add more checklist items */}
                            <button
                                type="button"
                                onClick={handleAddChecklistItem}
                                className="bg-blue-200 text-blue-600 px-4 py-2 rounded mb-3"
                            >
                                + Add Another Checklist Item
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
