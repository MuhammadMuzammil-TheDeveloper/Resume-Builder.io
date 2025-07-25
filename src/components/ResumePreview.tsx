
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Edit, Scan, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { openaiService } from '../services/openaiService';

interface ResumePreviewProps {
  resumeText: string;
  onEdit?: () => void;
}

export const ResumePreview = ({ resumeText, onEdit }: ResumePreviewProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [atsScore, setATSScore] = useState<any>(null);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);
      toast({
        title: "Success!",
        description: "Resume copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy resume",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Success!",
      description: "Resume downloaded successfully!",
    });
  };

  const handleATSScan = async () => {
    setLoading(true);
    try {
      const score = await openaiService.scanResumeATS(resumeText);
      setATSScore(score);
      toast({
        title: "Success!",
        description: "ATS scan completed!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to scan resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your AI-Generated Resume
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Review and customize your professional resume
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              )}
              
              <button
                onClick={handleATSScan}
                disabled={loading}
                className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 border border-purple-300 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                ) : (
                  <Scan className="w-4 h-4 mr-2" />
                )}
                ATS Scan
              </button>
              
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center px-4 py-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* ATS Score */}
        {atsScore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-b border-gray-200 dark:border-gray-700 p-6"
          >
            <div className={`rounded-lg p-4 ${getScoreBgColor(atsScore.score)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ATS Compatibility Score
                </h3>
                <div className={`text-2xl font-bold ${getScoreColor(atsScore.score)}`}>
                  {atsScore.score}/100
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {atsScore.feedback.map((item: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Edit className="w-4 h-4 mr-2 text-blue-500" />
                    Improvements
                  </h4>
                  <ul className="space-y-1">
                    {atsScore.improvements.map((item: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resume Content */}
        <div className="p-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed overflow-x-auto">
              {resumeText}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
