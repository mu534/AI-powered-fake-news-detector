export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companySize: string;
  topic: string;
}

export interface Result {
  label: string;
  confidence: number;
  source: string;
}
