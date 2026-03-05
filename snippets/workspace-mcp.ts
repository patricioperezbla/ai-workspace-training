// #region slide
// extensions/workspace-mcp/index.ts
// AI Workspace MCP Server — 3 lightweight tools
// Based on: MCP Multi-Agent Framework (arXiv:2504.21030v1)

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// Tools exposed:
// - session-search:   Search past sessions semantically
// - knowledge-query:  Query the knowledge graph
// - role-recommend:   Get role recommendations for a task

const TOOLS: Tool[] = [sessionSearchTool, knowledgeQueryTool, roleRecommendTool];

const TOOL_HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<string>> = {
  'session-search': executeSessionSearch,
  'knowledge-query': executeKnowledgeQuery,
  'role-recommend': executeRoleRecommend,
};
// #endregion slide

async function main() {
  const server = new Server(
    { name: 'ai-workspace', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const handler = TOOL_HANDLERS[name];
    if (!handler) throw new Error(`Unknown tool: ${name}`);

    try {
      const result = await handler(args || {});
      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
