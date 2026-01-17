import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is SENTINEL?',
    answer:
      'SENTINEL is a unified control plane for AI agents. It provides policy-based access control, complete audit logging, and secure credential management for both MCP (Model Context Protocol) tools and A2A (Agent-to-Agent) communications.',
  },
  {
    question: 'How does the policy engine work?',
    answer:
      'SENTINEL uses a DENY-first policy engine. All tool calls are blocked by default unless explicitly allowed by a policy. Policies can target users, roles, or agents, and support wildcard patterns for flexible access control. DENY policies always take precedence over ALLOW policies.',
  },
  {
    question: 'What protocols does SENTINEL support?',
    answer:
      'SENTINEL supports both MCP (Model Context Protocol) for tool access and A2A (Agent-to-Agent Protocol) for peer-to-peer agent communication. Both protocols are managed through a single control plane with unified policies and audit logging.',
  },
  {
    question: 'Can I self-host SENTINEL?',
    answer:
      'Yes, SENTINEL is designed to be self-hosted. You can deploy it in your own infrastructure using Docker or Kubernetes. We also offer a managed cloud option for teams who prefer not to manage their own infrastructure.',
  },
  {
    question: 'What kind of audit logs are captured?',
    answer:
      'SENTINEL captures comprehensive audit logs for every tool invocation, including the tool called, parameters passed, user/agent identity, policy that matched, and the decision made. Policy snapshots are preserved for compliance and forensic analysis.',
  },
  {
    question: 'How do I integrate with existing agents?',
    answer:
      'Integration is straightforward. For MCP, point your agent to SENTINEL\'s proxy endpoint instead of directly to MCP servers. For A2A, register your agent cards in SENTINEL and route A2A requests through our proxy. Both approaches require minimal code changes.',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'We offer a free tier for small teams and individual developers with up to 3 users and 10,000 tool calls per month. For larger deployments, contact us for enterprise pricing.',
  },
  {
    question: 'What about compliance requirements?',
    answer:
      'SENTINEL is built with compliance in mind. Features like complete audit trails, policy snapshots, AES-256 encryption, and role-based access control help you meet SOC 2, GDPR, and HIPAA requirements.',
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
