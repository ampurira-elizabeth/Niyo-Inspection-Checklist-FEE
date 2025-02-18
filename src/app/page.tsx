'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Category, FormData } from '@/types/inspection';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
      
      // Initialize form data
      const initialFormData: FormData = {};
      data.forEach(category => {
        category.items.forEach(item => {
          initialFormData[item.id] = {
            status: 'no',
            comments: ''
          };
        });
      });
      setFormData(initialFormData);
      setError(null);
    } catch (err) {
      setError('Error loading categories. Please try again.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (itemId: number, status: 'yes' | 'no' | 'neutral') => {
    setFormData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        status
      }
    }));
  };

  const handleCommentChange = (itemId: number, comment: string) => {
    setFormData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        comments: comment
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const items = Object.entries(formData).map(([checklistItemId, data]) => ({
        checklistItemId: parseInt(checklistItemId),
        ...data
      }));

      const response = await api.submitInspection({ items });

      alert(`Inspection completed!\nTotal Score: ${response.percentage.toFixed(2)}%`);
      // Reset form
      fetchCategories();
    } catch (err) {
      setError('Error submitting inspection. Please try again.');
      console.error('Error submitting inspection:', err);
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

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Inspection Checklist</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {categories.map(category => (
          <div key={category.id} className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">{category.name}</h2>
            
            {category.items.map(item => (
              <div key={item.id} className="mb-6 border-b pb-4">
                <p className="mb-3 font-medium text-gray-600">{item.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-3">
                  {(['yes', 'neutral', 'no'] as const).map((status) => (
                    <label key={status} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name={`status-${item.id}`}
                        checked={formData[item.id]?.status === status}
                        onChange={() => handleStatusChange(item.id, status)}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span className="group-hover:text-blue-600">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {' '}
                       
                      </span>
                      {/* ({status === 'yes' ? '2' : status === 'neutral' ? '1' : '0'} marks) */}
                    </label>
                  ))}
                </div>
                
                <textarea
                  value={formData[item.id]?.comments || ''}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  placeholder="Add comments here..."
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                />
              </div>
            ))}
          </div>
        ))}
        
        <button
          type="submit"
          disabled={submitLoading}
          className={`
            w-full py-3 px-4 rounded-md text-white font-medium
            ${submitLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
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
            'Submit Inspection'
          )}
        </button>
      </form>
    </main>
  );
}
