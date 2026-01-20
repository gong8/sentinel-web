import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What problem does Sentinel solve?',
    answer:
      'AI agents are being deployed with access to production systems — GitHub, databases, Slack, payment processors — but there\'s no governance layer. Agents inherit user permissions, operate without audit trails, and execute sensitive operations without approval. Sentinel is the authorization layer that sits between your agents and their tools, enforcing policies, logging everything, and requiring approval for risky operations.',
  },
  {
    question: 'How does the DENY-first policy engine work?',
    answer:
      'By default, all tool calls are blocked. You must explicitly allow access through policies. Policies target users, roles, or agents using patterns like "user:*@company.com" or "role:Engineer". DENY policies always take precedence over ALLOW. This fail-closed approach means new tools and agents are secure by default.',
  },
  {
    question: 'What protocols are supported?',
    answer:
      'Sentinel supports MCP (Model Context Protocol) for AI agent tool access and A2A (Agent-to-Agent Protocol) for peer-to-peer agent communication. Both protocols are managed through a single proxy with unified policies and audit logging. As new protocols emerge, we\'ll add support.',
  },
  {
    question: 'Can I deploy Sentinel in my own infrastructure?',
    answer:
      'Yes, Sentinel is designed for self-hosted deployment. You can run it using Docker Compose or Kubernetes in your own VPC. Your data never leaves your infrastructure. We\'re also planning a managed cloud option for teams who prefer not to self-host.',
  },
  {
    question: 'What audit data is captured?',
    answer:
      'Every tool invocation is logged with: the tool called, all parameters, user/agent identity, which policy matched, the decision (ALLOW/DENY), and a snapshot of the policy at evaluation time. This creates an immutable audit trail for compliance and forensic analysis.',
  },
  {
    question: 'How do I integrate with my existing AI agents?',
    answer:
      'Integration requires minimal code changes. Point your MCP client to Sentinel\'s proxy endpoint instead of directly to MCP servers. For A2A, register your agents and route requests through our proxy. Sentinel handles authentication, policy evaluation, and logging transparently.',
  },
  {
    question: 'Does Sentinel help with compliance?',
    answer:
      'Yes. Sentinel\'s complete audit trails, policy snapshots, AES-256 encryption, and role-based access control are designed with SOC 2, HIPAA, GDPR, and EU AI Act requirements in mind. For enterprises, we offer compliance-ready exports and extended log retention.',
  },
  {
    question: 'What stage is the product in?',
    answer:
      'Sentinel has a functional MVP with the core policy engine, MCP/A2A proxy, complete audit logging, and admin/user dashboards. We\'re working with design partners to validate the product and pricing before general availability. The free tier is available now.',
  },
];

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <div
      className={`border-b border-border/30 transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group"
      >
        <span className="text-sm font-medium group-hover:text-brand-300 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-400' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const { ref, isInView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-28 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-brand-500/5 via-brand-500/8 to-brand-500/5 blur-3xl -z-10 rounded-full" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-small opacity-15" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-card/30 text-xs mb-6">
            <HelpCircle className="h-3 w-3 text-brand-400" />
            <span className="text-muted-foreground">Common Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to know about SENTINEL.
          </p>
        </div>

        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30 px-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <p
          className={`text-center mt-10 text-sm text-muted-foreground transition-all duration-700 delay-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Still have questions?{' '}
          <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}
