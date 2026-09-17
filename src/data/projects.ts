// Shared by NowBuilding.astro (the `./workflow --status` pane). Only list
// real, defensible work — an honest single row beats padded rows.

/** Stages of the working loop the site keeps describing. Order matters. */
export const stages = ['plan', 'build', 'verify', 'ship', 'write'] as const;
export type Stage = (typeof stages)[number];

export interface Project {
  /** Directory-style name rendered as `name/` in the listing. */
  name: string;
  description: string;
  /** Where the project sits in the loop right now. Drives the pipeline. */
  stage: Stage;
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
    stage: 'write',
    tools: ['Astro'],
    href: 'https://github.com/fort-worth-dev/fortworthdev',
  },
  {
    name: 'ai-devs-meeting',
    description:
      'A recurring AI Developers meeting at work: assistants, agents, and the habits that make them safe on real codebases. Notes from it feed the field notes here.',
    stage: 'build',
    tools: [],
  },
  // Template for the next entry:
  // {
  //   name: 'project-name',
  //   description: 'One or two sentences: what it does and what it demonstrates.',
  //   stage: 'verify',
  //   tools: ['Claude Code', 'MCP'],
  //   href: 'https://github.com/fort-worth-dev/project-name',
  // },
];
