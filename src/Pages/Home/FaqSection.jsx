import faqImage from "../../../src/assets/faq.jpg"; // Adjust the path to your FAQ image
import PageCover from "../../Shared/PageCover/PageCover";

const FaqSection = () => {
  const faqs = [
    {
      question: "What is the purpose of the medical camp?",
      answer:
        "The medical camp aims to provide free medical check-ups and basic healthcare services to underserved communities.",
    },
    {
      question: "Who can participate in the camp?",
      answer:
        "Anyone in need of medical assistance can participate. We welcome people of all ages and backgrounds.",
    },
    {
      question: "How do I register for a camp?",
      answer:
        "You can register by visiting our website and clicking on the 'Join Camp' button for your chosen camp.",
    },
    {
      question: "Are the medical services free?",
      answer:
        "Yes, all medical consultations and basic check-ups are free. However, there might be a nominal fee for specialized tests.",
    },
    {
      question: "What should I bring to the camp?",
      answer:
        "Please bring any medical records you have, a list of current medications, and an ID card.",
    },
  ];

  return (
    <div>
      <PageCover title={"FAQ"}></PageCover>

      <div className="flex flex-col md:flex-row items-center justify-between lg:px-10 lg:py-10 mx-4 md:mx-10 lg:mx-32 bg-white">
        {/* Left Side: FAQ Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img src={faqImage} alt="FAQ" className="rounded-lg shadow-md" />
        </div>

        {/* Right Side: FAQ Content */}
        <div className="w-full md:w-1/2 md:pl-10 space-y-4">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-center md:text-left mb-4">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-base md:text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
