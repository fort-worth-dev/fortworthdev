// Shared by Projects.astro (the `ls ./projects` pane) and StatsBar (the count).
// Only list real, defensible work — an honest `total 1` beats padded rows.

export interface Project {
  /** Directory-style name rendered as `name/` in the listing. */
  name: string;
  description: string;
  /** `building` renders green (live state); `shipped` renders neutral. */
  status: 'building' | 'shipped';
  /** Exact substrings of `description` to highlight as product names. */
  tools: string[];
  /** Repo or live URL. Omit to render as plain text. */
  href?: string;
}

export const projects: Project[] = [
  {
    name: 'fortworthdev.com',
    description:
      'This site — a terminal-native Astro build, designed and shipped end-to-end with AI coding agents. The workflow behind it is the first case study.',
    status: 'building',
    tools: ['Astro'],
  },
  // Template for the next entry:
  // {
  //   name: 'project-name',
  //   description: 'One or two sentences: what it does and what it demonstrates.',
  //   status: 'building',
  //   tools: ['Claude Code', 'MCP'],
  //   href: 'https://github.com/fortworthdev/project-name',
  // },
];
