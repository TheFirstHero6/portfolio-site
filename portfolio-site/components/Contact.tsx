import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact</h2>
        <p className="text-white/75 max-w-2xl mx-auto">
          Have a project in mind or a question? Send me a message and I’ll reply soon.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
