
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Plus, Sparkles } from 'lucide-react';
import { ResumeForm } from '../components/ResumeForm';
import { ResumePreview } from '../components/ResumePreview';
import { FileUpload } from '../components/FileUpload';

type DashboardView = 'main' | 'create' | 'upload' | 'preview' | 'edit';

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('main');
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [uploadedContent, setUploadedContent] = useState<string>('');

  const handleResumeGenerated = (resume: string) => {
    setGeneratedResume(resume);
    setCurrentView('preview');
  };

  const handleFileUpload = (content: string) => {
    setUploadedContent(content);
    setCurrentView('preview');
  };

  const handleEditResume = () => {
    setCurrentView('edit');
  };

  const renderMainDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Resume AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create professional, ATS-optimized resumes with the power of artificial intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create New Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 cursor-pointer group"
          onClick={() => setCurrentView('create')}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Create New Resume
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Build your resume from scratch with our intelligent form and let AI generate professional content
            </p>
            <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
              Get Started <FileText className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Upload Existing Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 cursor-pointer group"
          onClick={() => setCurrentView('upload')}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
              <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Upload & Optimize
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload your existing resume to get ATS compatibility scores and AI-powered improvement suggestions
            </p>
            <div className="flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
              Upload Resume <Upload className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Advanced AI creates compelling, professional resume content tailored to your experience
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ATS Optimization
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ensure your resume passes Applicant Tracking Systems with detailed compatibility scoring
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Easy Export
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Download your resume instantly or copy to clipboard with one click
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'main':
        return renderMainDashboard();
      case 'create':
        return <ResumeForm onResumeGenerated={handleResumeGenerated} />;
      case 'upload':
        return <FileUpload onFileUpload={handleFileUpload} />;
      case 'preview':
        return (
          <ResumePreview 
            resumeText={generatedResume || uploadedContent} 
            onEdit={generatedResume ? handleEditResume : undefined}
          />
        );
      case 'edit':
        return <ResumeForm onResumeGenerated={handleResumeGenerated} />;
      default:
        return renderMainDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      {currentView !== 'main' && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('main')}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};
