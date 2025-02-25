
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
    garage_name: string;            
    contact_person_tel: string;     
    physical_location: string;       
    [key: number]: {
        status: 'yes' | 'no' | 'neutral';
        comments: string;
    };
  
  }
  
  export interface InspectionSubmission {
    garage_name: string;            
    contact_person_tel: string;     
    physical_location: string;      
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
    garage_name?: string;            
    contact_person_tel?: string;     
    physical_location?: string; 
  }

  export interface Inspection {
    id: number | string;
    garage_name: string;
    date: string;
    contact_person_tel: string;
    physical_location: string;
    total_score: number;
    percentage: number;
  }