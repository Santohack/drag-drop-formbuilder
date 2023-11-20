"use client"
import { useState, useEffect } from 'react';
import { Form, getForms } from '@/action/form';


export const useFormsData = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const fetchedForms = await getForms();
        setForms(fetchedForms);
      } catch (error) {
        console.error("Failed to fetch forms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  return { forms: [], isLoading: false };
};
