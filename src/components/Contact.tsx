'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe } from 'lucide-react';
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  // Formspree form hook - uses environment variable
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "");
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form when submission is successful
  if (state.succeeded) {
    if (formData.name || formData.email || formData.subject || formData.message) {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "(954) 540-1902",
      href: "tel:+19545401902",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "henrybarefoot1987@gmail.com",
      href: "mailto:henrybarefoot1987@gmail.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Website",
      value: "next.henrybarefoot.com",
      href: "https://next.henrybarefoot.com",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "6755 W. Broward Blvd, Apt 208, 33317",
      href: "https://maps.google.com/?q=6755+W.+Broward+Blvd,+Apt+208,+33317",
      color: "from-red-500 to-red-600"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/HBarefoot",
      color: "hover:bg-gray-800"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hbarefoot/",
      color: "hover:bg-blue-600"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: "Website",
      href: "https://next.henrybarefoot.com",
      color: "hover:bg-purple-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to work together? I&apos;d love to hear about your project and discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Feel free to reach out through any of the channels below. I typically respond within 24 hours and look forward to discussing your project needs.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {info.label}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-gray-800 rounded-lg text-gray-300 ${social.color} text-white transition-colors`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: state.submitting ? 1 : 1.02 }}
                whileTap={{ scale: state.submitting ? 1 : 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors ${
                  state.submitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {state.submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Validation Errors */}
              <ValidationError 
                errors={state.errors}
                className="text-red-400 text-sm"
              />

              {/* Status Messages */}
              {state.succeeded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center p-3 bg-green-900/20 rounded-lg"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
