'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';

type ProjectDetails = {
  id?: number;
  title: string;
  description: string;
  about?: string;
  challenge?: string;
  result?: string;
  image: string;
  tags?: string[];
};

type ProjectModalProps = {
  project: ProjectDetails | null;
  onClose: () => void;
  modalPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
};

export default function ProjectModal({ project, onClose, modalPosition }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
          initial={{
            opacity: 0,
            scale: 0.8,
            top: modalPosition?.top,
            left: modalPosition?.left,
            width: modalPosition?.width,
            height: modalPosition?.height,
            borderRadius: '16px',
            position: 'absolute',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            width: '100%',
            maxWidth: '900px',
            height: 'auto',
            borderRadius: '24px',
            position: 'fixed',
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            top: modalPosition?.top,
            left: modalPosition?.left,
            width: modalPosition?.width,
            height: modalPosition?.height,
            borderRadius: '16px',
            position: 'absolute',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Project image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-6 md:p-8">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Project content */}
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>

              {project.about && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">About</h3>
                  <p className="text-gray-600">{project.about}</p>
                </div>
              )}

              {project.challenge && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Challenge</h3>
                  <p className="text-gray-600">{project.challenge}</p>
                </div>
              )}

              {project.result && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Result</h3>
                  <p className="text-gray-600">{project.result}</p>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm border border-gray-300 py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-gray-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}