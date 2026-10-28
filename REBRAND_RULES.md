# REBRAND_RULES.md
Project: helloglitch (fork of DeepSeek Harness, MIT).
- Never touch: LICENSE (beyond the existing added line),
  THIRD_PARTY_NOTICES.md, vendor/, snapshots/, patches/.
- Never use the DeepSeek whale logo or wordmark. Never imply official
  endorsement. Never name the product "DeepSeek Harness".
  README may say "built on DeepSeek Harness".
- Keep internal package scopes @deepseek-ai/* unchanged.
- CLI command: helloglitch (alias: glitch). Never use "hg".
- Home dir .helloglitch, env HELLOGLITCH_HOME; still read legacy
  DSH_HOME and .dsh as fallback.
- Put brand name/strings in one central place where possible.
- One phase per branch. Before finishing: pnpm run build && pnpm run test.
  List every changed file, then STOP. Do not start the next phase.
