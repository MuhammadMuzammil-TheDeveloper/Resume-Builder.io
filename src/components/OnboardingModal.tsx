
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, FileText, Brain, Download, Scan } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const onboardingSteps = [
  {
    title: 'Welcome to Resume AI!',
    description: 'Create professional, ATS-optimized resumes with the power of AI',
    icon: FileText,
    content: 'Get started by building your resume manually or uploading an existing one for AI-powered improvements.'
  },
  {
    title: 'AI-Powered Generation',
    description: 'Let our AI create professional resumes based on your input',
    icon: Brain,
    content: 'Our advanced AI analyzes your information and generates compelling, ATS-friendly resume content.'
  },
  {
    title: 'ATS Scanning & Optimization',
    description: 'Ensure your resume passes Applicant Tracking Systems',
    icon: Scan,
    content: 'Upload any resume to get detailed ATS compatibility scores and improvement suggestions.'
  },
  {
    title: 'Export & Share',
    description: 'Download or copy your resume instantly',
    icon: Download,
    content: 'Export your completed resume as formatted text or copy directly to your clipboard.'
  }
];

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { currentUser } = useAuth();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    if (currentUser) {
      await authService.updateUserProfile(currentUser.uid, {
        hasCompletedOnboarding: true
      });
    }
    onClose();
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <button
              onClick={completeOnboarding}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
              >
                <IconComponent className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h2
                key={`title-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {currentStepData.title}
              </motion.h2>
              
              <motion.p
                key={`desc-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-300 mb-4"
              >
                {currentStepData.description}
              </motion.p>
              
              <motion.p
                key={`content-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
              >
                {currentStepData.content}
              </motion.p>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8'
                      : index < currentStep
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              {currentStep > 0 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < onboardingSteps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={completeOnboarding}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
