export interface Client {
  id: string;
  name: string;
  admin: string;
  created_at: Date;
}

export interface ClientCreatePayload {
  name: string;
}

export interface ClientUpdatePayload {
  id: string;
  name?: string;
  admin?: string;
}
