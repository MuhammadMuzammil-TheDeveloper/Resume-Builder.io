
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface ResumeData {
  id?: string;
  userId: string;
  fullName: string;
  jobTitle: string;
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
  generatedResume?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const resumeService = {
  async saveResume(resumeData: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const resumeId = doc(collection(db, 'resumes')).id;
      const resumeWithMeta: ResumeData = {
        ...resumeData,
        id: resumeId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'resumes', resumeId), resumeWithMeta);
      return resumeId;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  },

  async updateResume(resumeId: string, updates: Partial<ResumeData>) {
    try {
      const updatesWithMeta = {
        ...updates,
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'resumes', resumeId), updatesWithMeta, { merge: true });
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  },

  async getResume(resumeId: string): Promise<ResumeData | null> {
    try {
      const docRef = doc(db, 'resumes', resumeId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as ResumeData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching resume:', error);
      return null;
    }
  },

  async getUserResumes(userId: string): Promise<ResumeData[]> {
    try {
      const q = query(collection(db, 'resumes'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as ResumeData);
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      return [];
    }
  }
};
