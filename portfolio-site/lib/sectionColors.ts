export type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact';

export const sectionColors: { [key in Section]: string } = {
  hero: '#3b82f6',      // Blue
  about: '#a855f7',     // Purple
  projects: '#6366f1',  // Indigo
  skills: '#8b5cf6',    // Purple
  contact: '#ec4899',   // Pink
};

export const getSectionColor = (section: Section): string => {
  return sectionColors[section];
};

export const getSectionGlowStyle = (section: Section) => {
  const color = sectionColors[section];
  return {
    boxShadow: `0 0 30px ${color}40, 0 0 60px ${color}20, inset 0 0 30px ${color}10`,
    borderColor: `${color}60`,
  };
};

export const getSectionBorderStyle = (section: Section) => {
  const color = sectionColors[section];
  return {
    borderColor: `${color}60`,
    boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
  };
};

