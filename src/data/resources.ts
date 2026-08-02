// Curated resource lists, rendered by /resources/ and /resources/[type]/.
//
// One collection, three views. Adding an entry is one object — never markup.
//
// Two rules for this file:
//   1. Nothing goes in that hasn't actually been used. The list is only worth
//      reading because it's a personal endorsement; padding it with things that
//      merely look reputable is what makes every other "awesome" list worthless.
//   2. `checked` is the date the link was last opened and confirmed good. Link
//      lists rot faster than any other content — an unreviewed list is worse
//      than no list. Re-check periodically and bump the date.

export type ResourceType = 'video' | 'repo' | 'article';

/** Which learning track the resource serves — mirrors the blog categories. */
export type Track = 'assistants' | 'agents';

export interface Resource {
  type: ResourceType;
  title: string;
  url: string;
  /** Channel, org, or author. Rendered as the owner column. */
  source: string;
  /**
   * Why it earns a slot: what it's good for, who it's for, what it gets wrong.
   * The annotation *is* the value — a bare link is just a bookmark.
   */
  note: string;
  track: Track;
  /** ISO date added to the list. */
  added: string;
  /** ISO date the URL was last verified. */
  checked: string;
}

export const resourceTypes: {
  type: ResourceType;
  /** Directory name in the listing and the URL segment. */
  dir: string;
  blurb: string;
}[] = [
  {
    type: 'video',
    dir: 'videos',
    blurb: 'Talks and walkthroughs worth the runtime.',
  },
  {
    type: 'repo',
    dir: 'repos',
    blurb: 'Reference implementations and source worth reading.',
  },
  {
    type: 'article',
    dir: 'articles',
    blurb: 'Writing that changed how I work, not just what I know.',
  },
];

export const resources: Resource[] = [
  // ---------------------------------------------------------------- articles
  {
    type: 'article',
    title: 'Building Effective AI Agents',
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
    source: 'Anthropic Engineering',
    note: 'The piece that separates "workflow" from "agent" and argues most problems only need the former. Start here before building anything autonomous — it will talk you out of complexity you do not need.',
    track: 'agents',
    added: '2026-08-02',
    checked: '2026-08-02',
  },
  {
    type: 'article',
    title: 'Effective context engineering for AI agents',
    url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    source: 'Anthropic Engineering',
    note: 'Treats the context window as a finite budget to be managed rather than a box to fill. The clearest statement of why context engineering, not prompt phrasing, is the skill that transfers.',
    track: 'agents',
    added: '2026-08-02',
    checked: '2026-08-02',
  },

  // ------------------------------------------------------------------- repos
  {
    type: 'repo',
    title: 'modelcontextprotocol/servers',
    url: 'https://github.com/modelcontextprotocol/servers',
    source: 'Model Context Protocol',
    note: 'Reference MCP server implementations across several languages. Read one end-to-end before writing your own — the protocol makes far more sense from the source than from the spec.',
    track: 'agents',
    added: '2026-08-02',
    checked: '2026-08-02',
  },
  {
    type: 'repo',
    title: 'wong2/awesome-mcp-servers',
    url: 'https://github.com/wong2/awesome-mcp-servers',
    source: 'wong2',
    note: 'The directory to check before building an integration that probably already exists. Breadth over judgment, as these lists always are — treat it as an index, not a recommendation.',
    track: 'agents',
    added: '2026-08-02',
    checked: '2026-08-02',
  },
  {
    type: 'repo',
    title: 'microsoft/semantic-kernel',
    url: 'https://github.com/microsoft/semantic-kernel',
    source: 'Microsoft',
    note: 'The most mature agent-orchestration story for C#, and useful reading for how .NET idioms map onto LLM plumbing. Note that Microsoft has since positioned Agent Framework as its successor — read it for the patterns, check the migration guide before starting new work on it.',
    track: 'agents',
    added: '2026-08-02',
    checked: '2026-08-02',
  },
  {
    type: 'repo',
    title: 'AI apps for .NET developers',
    url: 'https://learn.microsoft.com/dotnet/ai/',
    source: 'Microsoft Learn',
    note: 'The current, maintained home for .NET AI samples and Microsoft.Extensions.AI. Worth linking specifically because the older dotnet/ai-samples repo it replaced was archived in June 2026 and still ranks well in search.',
    track: 'assistants',
    added: '2026-08-02',
    checked: '2026-08-02',
  },

  // ------------------------------------------------------------------ videos
  // Deliberately empty. A "most useful videos" list is only worth reading if
  // every entry is one I actually watched and would defend — seeding it with
  // search results would make it exactly the list nobody needs.
];

export function byType(type: ResourceType) {
  return resources
    .filter((r) => r.type === type)
    .sort((a, b) => b.added.localeCompare(a.added));
}

export function countOf(type: ResourceType) {
  return resources.filter((r) => r.type === type).length;
}
