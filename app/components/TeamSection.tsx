'use client';

import { motion } from 'framer-motion';

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "/api/placeholder/300/300"
    },
    {
      name: "David Kim",
      role: "Project Manager",
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <section id="team" className="py-20 bg-transparent">
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
              Meet the creative minds behind <span className="italic">our success</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together creativity, technical expertise, and strategic thinking to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={`https://placehold.co/192x192/6366f1/ffffff?text=${member.name.split(' ')[0]}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
