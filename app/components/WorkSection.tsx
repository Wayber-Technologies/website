'use client';

import { motion } from 'framer-motion';

export default function WorkSection() {
  const projects = [
    {
      title: "FlowBank",
      description: "Mobile banking application with intuitive payment interface",
      image: "/api/placeholder/600/400",
      tags: ["UX Research", "Interface Design"],
      mockup: "mobile",
      color: "from-green-900 to-green-800"
    },
    {
      title: "Academy.co",
      description: "Online learning platform with comprehensive course management",
      image: "/api/placeholder/600/400",
      tags: ["Product Design", "Interaction Design"],
      mockup: "desktop",
      color: "from-purple-100 to-purple-50"
    },
    {
      title: "Genome",
      description: "Scientific research platform with advanced data visualization",
      image: "/api/placeholder/600/400",
      tags: ["Brand Design", "Data Visualization"],
      mockup: "image",
      color: "from-gray-900 to-gray-800"
    },
    {
      title: "Hotto",
      description: "E-commerce platform for health and wellness products",
      image: "/api/placeholder/600/400",
      tags: ["E-commerce Design", "Brand Strategy"],
      mockup: "laptop",
      color: "from-blue-100 to-blue-50"
    }
  ];


  return (
    <section id="work" className="py-20 bg-transparent">
      <div className="container">
        <motion.div 
          className="flex flex-col justify-center items-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-aloevera">
              How we transformed a small business's <span className="italic">online presence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-4">
                  <img 
                    alt={project.title}
                    loading="lazy"
                    width="625"
                    height="410"
                    className="rounded-2xl w-full h-auto object-cover"
                    src="https://placehold.co/600x400"
                  />
                  <a 
                    target="blank" 
                    className="absolute top-0 left-0 bg-black/50 w-full h-full rounded-2xl hidden group-hover:flex" 
                    href="#"
                  >
                    <span className="flex justify-end p-5 w-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-12 h-12 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </span>
                  </a>
                </div>
                
                <div className="flex flex-col items-start gap-4">
                  <h5 className="group-hover:text-blue-600 text-xl font-bold text-gray-800 font-instrumentSerif">
                    {project.title}
                  </h5>
                  <div className="flex gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <p 
                        key={tagIndex}
                        className="text-sm border border-gray-300 w-fit py-1.5 px-4 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
