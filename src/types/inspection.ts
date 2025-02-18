
export interface Category {
    id: number;
    name: string;
    items: ChecklistItem[];
  }
  
  export interface ChecklistItem {
    id: number;
    category_id: number;
    description: string;
    category_name: string;
  }
  
  export interface FormData {
    [key: number]: {
      status: 'yes' | 'no' | 'neutral';
      comments: string;
    };
  }
  
  export interface InspectionSubmission {
    items: {
      checklistItemId: number;
      status: 'yes' | 'no' | 'neutral';
      comments: string;
    }[];
  }
  
  export interface InspectionResponse {
    success: boolean;
    inspectionId: number;
    totalScore: number;
    percentage: number;
  }