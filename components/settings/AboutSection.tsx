import React from 'react';
import { GitBranch, User, Mail, MessageSquare } from 'lucide-react';
import { getResponsiveValue, translations } from '../../utils/appUtils';

interface AboutSectionProps {
  t: (key: keyof typeof translations) => string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  const iconSize = getResponsiveValue(14, 16);

  return (
    <div className="space-y-4 p-4 sm:p-6 text-center">
      <h3 className="text-xl font-semibold text-[var(--theme-text-primary)] mb-4">
        关于作者
      </h3>
      
      <div className="text-left max-w-xs mx-auto space-y-3 text-[var(--theme-text-secondary)]">
        <p className="flex items-center gap-3">
          <User size={18} className="text-[var(--theme-text-link)]" />
          <span><strong>名称:</strong> 魁煞</span>
        </p>
        <p className="flex items-center gap-3">
          <MessageSquare size={18} className="text-[var(--theme-text-link)]" />
          <span><strong>QQ:</strong> 27844232369</span>
        </p>
        <p className="flex items-center gap-3">
          <Mail size={18} className="text-[var(--theme-text-link)]" />
          <span><strong>邮箱:</strong> quasar2333@gmail.com</span>
        </p>
      </div>

      <div className="pt-5 mt-5 border-t border-[var(--theme-border-secondary)]">
        <a 
          href="https://github.com/quasar2333" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-[var(--theme-bg-tertiary)] hover:bg-[var(--theme-bg-input)] text-[var(--theme-text-link)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-secondary)] focus:ring-[var(--theme-border-focus)]"
        >
          <GitBranch size={iconSize} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};