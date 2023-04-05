export interface TimeoffType {
  id: string;
  label: string;
  client_id: string;
  created_at: string;
}

export interface TimeoffTypeCreatePayload {
  label: string;
  client_id: string;
}

export interface TimeoffTypeUpdatePayload {
  id: string;
  label?: string;
}

export interface TimeoffTypeFindAllPayload {
  client_id?: string;
  id?: string;
} 
