import axios from 'axios';
import { Category, InspectionSubmission, InspectionResponse,Inspection } from '../types/inspection';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(`${API_BASE_URL}/categories`);
    console.log('response cat...', response.data);
    return response.data;
  },

  submitInspection: async (data: InspectionSubmission): Promise<InspectionResponse> => {
    const response = await axios.post<InspectionResponse>(`${API_BASE_URL}/submit`, data);
    return response.data;
  },

  addToolsEquipment: async (data: { description: string[] }): Promise<any> => {
    const response = await axios.post(`${API_BASE_URL}/tools/equipments`, data);
    console.log("📡 Tools & Equipment Response:", response.data);
    return response.data;
  },

  inspectionResults: async (): Promise<Inspection[]> => {
    try {
        const response = await axios.get<Inspection[]>(`${API_BASE_URL}/inspections`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inspection results:", error);
        throw error;
    }
}

  
};