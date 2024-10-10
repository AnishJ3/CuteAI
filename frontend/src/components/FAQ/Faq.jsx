import { motion } from 'framer-motion';


function Faq() {
  // Define animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="sm:py-10 bg-black overflow-hidden" id="faq">
      <div className="container mx-auto px-4">
        <div className="relative py-16 px-8 bg-blend-darken overflow-hidden rounded-3xl">
          <div className="relative z-10 md:max-w-7xl mx-auto">
            <div className="md:max-w-xl mb-10">
              <span className="inline-block mb-5 text-md text-mygray font-bold uppercase tracking-widest font-extralight text-lg text-white">
                🫧 Updates & FAQ
              </span>
              <h2 className="font-heading text-4xl text-mygray lg:text-5xl font-bold text-white">
                Got questions? We’re here to help!
              </h2>
            </div>
            <div className="flex flex-wrap -m-3">
              {faqData.map((faq, index) => (
                <motion.div
                  className="w-full p-3"
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Add a delay for staggered effect
                >
                  <div className="p-10 bg-gray-600 rounded-3xl group transition-colors duration-300 ease-in-out hover:bg-blue-700">
                    <div className="flex flex-wrap -m-2">
                      <div className="w-full md:w-1/2 p-2">
                        <h3 className="font-serif text-xl  font-medium font-black text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="w-full md:w-1/2 p-2">
                        <p className="text-white font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-full mt-1 ">
        <p className="text-center font-bold text-white">🫧 CuteAi © 2024</p>
      </div>
    </section>
  );
}

// FAQ data
const faqData = [
    {
      question: "Why should I choose CuteAi?",
      answer: "CuteAi offers a unique blend of cutting-edge AI technology and user-friendly design, providing personalized experiences tailored to your needs. With advanced features and a dedicated support team, we ensure that you get the most out of our service, making it the perfect choice for enhancing productivity and creativity."
    },
    {
      question: "What is the price of the Pro version?",
      answer: "The Pro version of CuteAi is available for $19.99 per month, which includes additional features such as unlimited chat history, priority support, and advanced analytics tools to track your interactions and improve your experience."
    },
    
    {
      question: "Are there any upcoming features?",
      answer: "Absolutely! We are constantly improving our platform. Upcoming features include enhanced natural language understanding, integration with third-party applications, and customizable AI personalities to suit your specific needs. Stay tuned for our updates!"
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team through the 'Help' section on our website. We offer support via email, live chat, and a comprehensive knowledge base to assist you with any inquiries or issues you may have."
    },
    {
      question: "Is my data safe with CuteAi?",
      answer: "Yes, we prioritize your privacy and data security. CuteAi employs advanced encryption and data protection protocols to ensure that your information is kept safe and confidential. We do not sell your data to third parties."
    },
    {
      question: "Can I use CuteAi for commercial purposes?",
      answer: "Yes, CuteAi can be used for commercial purposes. However, please review our terms of service for specific guidelines regarding commercial use to ensure compliance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit cards, debit cards, and PayPal. You can choose your preferred payment option during the checkout process."
    },
    
    {
      question: "How do I provide feedback or suggestions?",
      answer: "We love hearing from our users! You can provide feedback or suggestions through the feedback form available in your account dashboard, or you can contact our support team directly. We value your input to help us improve our service."
    },
    {
      question: "Can I access CuteAi on mobile devices?",
      answer: "Yes, CuteAi is designed to be responsive and can be accessed on various mobile devices through your web browser. We are also working on a dedicated mobile app to enhance the user experience on smartphones and tablets."
    },
    {
      question: "What if I encounter technical issues?",
      answer: "If you encounter any technical issues, please contact our support team through the Help section. We are available 24/7 to assist you and resolve any problems you may face."
    },
    
  ];
  

export default Faq;
