"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

type ProjectDetails = {
  id?: number;
  title: string;
  description: string;
  about?: string;
  challenge?: string;
  result?: string;
  image: string;
  tags?: string[];
  link?: string;
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
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6 py-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full h-[80vh] flex flex-col"
          layoutId={`project-${project.id}`}
          initial={{ borderRadius: "16px" }}
          animate={{
            borderRadius: "24px",
            scale: 1,
          }}
          exit={{
            borderRadius: "16px",
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            layout: {
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
            },
          }}
          style={{
            willChange: "transform, border-radius",
          }}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Project image - morphing from project item */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-96 bg-gray-100 flex-shrink-0"
            initial={{ height: "410px" }}
            animate={{ height: "320px" }}
            exit={{ height: "410px" }}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              willChange: "height",
            }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              layoutId={`project-image-${project.id}`}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.h2
                className="text-white text-2xl sm:text-3xl md:text-4xl font-bold p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {project.title}
              </motion.h2>
            </motion.div>
          </motion.div>

          {/* Project content */}
          <motion.div
            className="p-6 md:p-8 overflow-y-auto flex-1"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 border-t pt-6 border-gray-200 pb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              {project.about && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3  pb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{project.about}</p>
                </div>
              )}

              {project.challenge && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3  pb-2">Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.result && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3  pb-2">Result</h3>
                  <p className="text-gray-600 leading-relaxed">{project.result}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-between items-center pt-6 border-t border-gray-200">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="group gap-2 text-white font-medium  bg-[#1f2937] rounded-full flex items-center lg:gap-4 py-2 pl-5 pr-2 border border-[#1f2937]  hover:bg-transparent hover:text-[#1f2937] transition-all duration-200 ease-in-out"
                  >
                    <span className="group-hover:translate-x-10 transform transition-transform duration-200 ease-in-out">
                      View Project
                    </span>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:-translate-x-28 transition-all duration-200 ease-in-out"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="20"
                        className="fill-white transition-colors duration-200 ease-in-out group-hover:fill-[#1f2937]"
                      />
                      <path
                        d="M15.832 15.3334H24.1654V23.6667"
                        className="stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.832 23.6667L24.1654 15.3334"
                        className="stroke-[#1B1D1E] transition-colors duration-500 ease-in-out group-hover:stroke-white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs sm:text-sm border border-gray-300 py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-gray-50 text-gray-700 font-medium"
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
      </motion.div>
    </AnimatePresence>
  );
}
