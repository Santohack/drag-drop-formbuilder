// Assuming you have these interfaces defined in your project
export interface Form {
    id: number;
    userId: string;
    createdAt: Date;
    published: boolean;
    name: string;
    description: string;
    content: string;
    visits: number;
    submissions: number;
    shareURL: string;
    FormSubmissions: FormSubmission[];
  }
  
  export interface FormSubmission {
    id: number;
    createdAt: Date;
    formId: number;
    form: Form;
    content: string;
  }
  
  class UserNotFoundErr extends Error {}
  
  function saveSubmissionToLocal(formUrl: string, content: string) {
    const submissions = localStorage.getItem('formSubmissions') ? JSON.parse(localStorage.getItem('formSubmissions')!) : {};
    submissions[formUrl] = submissions[formUrl] ? [...submissions[formUrl], content] : [content];
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
  }
  
  export async function getFormStats(): Promise<{ visits: number; submissions: number; submissionRate: number; bounceRate: number; }> {
    // Dummy data for demonstration
    return {
      visits: 150,
      submissions: 75,
      submissionRate: 50,
      bounceRate: 50,
    };
  }
  
  export async function createForm(data: any): Promise<number> {
    // Save form creation data to local storage
    const newFormId = Date.now(); // Using timestamp as a mock ID
    data.id = newFormId;
    localStorage.setItem(`form-${newFormId}`, JSON.stringify(data));
    return newFormId;
  }
  
  export async function getForms(): Promise<Form[]> {
    // Fetch forms from local storage (Dummy implementation)
    // Here you should replace this with actual logic to fetch forms
    return [
      { id: 1, userId: 'user1', createdAt: new Date(), published: true, name: 'Form 1', description: 'Description 1', content: 'Content 1', visits: 10, submissions: 5, shareURL: 'url1', FormSubmissions: [] }
      // Add more dummy forms as needed
    ];
  }
  
  export async function getFormById(id: number): Promise<Form | null> {
    // Fetch a specific form by ID from local storage
    const form = localStorage.getItem(`form-${id}`);
    return form ? JSON.parse(form) : null;
  }
  
  export async function updateFormContent(id: number, jsonContent: string): Promise<void> {
    const form = await getFormById(id);
    if (form) {
      form.content = jsonContent;
      localStorage.setItem(`form-${id}`, JSON.stringify(form));
    }
  }
  
  export async function publishForm(id: number): Promise<void> {
    const form = await getFormById(id);
    if (form) {
      form.published = true;
      localStorage.setItem(`form-${id}`, JSON.stringify(form));
    }
  }
  
  export async function getFormContentByUrl(formUrl: string): Promise<string | null> {
    // Iterate through all forms and find the one with the matching URL
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('form-')) {
        const form = JSON.parse(localStorage.getItem(key)!);
        if (form.shareURL === formUrl) {
          return form.content;
        }
      }
    }
    return null;
  }
  
  export async function submitForm(formUrl: string, content: string): Promise<void> {
    // Save the submission in local storage
    saveSubmissionToLocal(formUrl, content);
  }
  
  export async function getFormWithSubmissions(id: number): Promise<(Form & { FormSubmissions: FormSubmission[] }) | null> {
    const form = await getFormById(id);
    if (form) {
      const submissions = JSON.parse(localStorage.getItem('formSubmissions')!)[form.shareURL] || [];
      return { ...form, FormSubmissions: submissions.map((content: string, index: number) => ({ id: index, createdAt: new Date(), formId: id, form: form, content: content })) };
    }
    return null;
  }
  