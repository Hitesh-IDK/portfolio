import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    document.title = "Contact | Hitesh Parmar";

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".animate-in").forEach((element, i) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset status after a delay
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <div ref={sectionRef} className="pt-24">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Get In <span className="title-gradient">Touch</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Fill out the form below or reach out through one of my
              contact channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 animate-in">
              <div className="space-y-8">
                <div className="card">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400 mr-4">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        10hiteshparmar@gmail.com
                      </p>
                      <a
                        href="mailto:10hiteshparmar@gmail.com"
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium mt-1 inline-block"
                      >
                        Send an email →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400 mr-4">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        +91 9740490947
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Mon-Fri, 9am-5pm IST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full text-primary-600 dark:text-primary-400 mr-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Mysore, Karnataka, India
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Available for remote work worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Availability</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">
                        Freelance Projects
                      </span>
                      <span className="bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">
                        Full-time Position
                      </span>
                      <span className="bg-error-100 text-error-800 dark:bg-success-900/30 dark:text-success-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">
                        Consulting
                      </span>
                      <span className="bg-success-100 text-success-800 dark:bg-error-900/30 dark:text-error-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Unavailable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 animate-in">
              <div className="card p-8">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Send Me a Message
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-md bg-success-50 dark:bg-success-900/10 border border-success-200 dark:border-success-900/30 text-success-800 dark:text-success-300">
                    Your message has been sent successfully! I'll get back to
                    you as soon as possible.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-md bg-error-50 dark:bg-error-900/10 border border-error-200 dark:border-error-900/30 text-error-800 dark:text-error-300">
                    There was an error sending your message. Please try again
                    later.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or inquiry..."
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="mt-12 animate-in">
        <div className="aspect-[3/1] bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <iframe
            title="Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75200.38941838624!2d76.6356898!3d12.31064575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d572ef9%3A0x2b89ece8c0f8396d!2sMysuru%2C%20Karnataka!5e1!3m2!1sen!2sin!4v1746421625483!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
