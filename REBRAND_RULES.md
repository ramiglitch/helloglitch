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

## Delivery protocol (applies to every phase, no exceptions)
1. Start from an up-to-date master. Create branch rebrand/phase-N-<name>.
2. Do only the work in the phase scope. If something outside the scope
   needs changing, do not change it; list it under "Deferred".
3. Self-verify: pnpm run build (must be 10 passed), plus vitest only for
   the packages touched (never the full suite, never e2e). Compare with
   the Phase 1 baseline: anything that passed before must still pass.
4. Commit with a conventional message and let ALL hooks run.
   NEVER use --no-verify, --force, or any hook bypass.
5. If a hook or test fails: diagnose, fix the cause, retry. Maximum 3
   attempts per failure. After that, STOP and report the exact error.
6. Push to origin only. NEVER push to or open a PR against upstream
   (deepseek-ai/deepseek-harness). No GitHub PR/issue tools. No npm
   publish. Use git --no-pager for every git command.
7. The pre-push typecheck takes about 6 minutes: run it in the
   background and poll until it finishes. Do not cancel it.
8. Only if everything passed: merge locally into master (fast-forward),
   push master, then create the next phase branch.
9. Protected paths (never modify): LICENSE beyond the existing added
   line, THIRD_PARTY_NOTICES.md, vendor/, snapshots/, patches/.
10. STOP immediately and report if: a protected file would change, a
    file outside the phase scope would change, or a previously passing
    check fails and you cannot fix it within 3 attempts.
11. Final report format:
    - What was done (files changed, grouped)
    - Commands run with pass/fail and hook results
    - Verification: output of git rev-parse for master, origin/master,
      the phase branch and origin/<phase branch> (all four must match)
    - git diff --name-only against the previous master (must contain
      no protected paths)
    - Deferred items and anything needing a human decision or visual check
    - If the phase has UI/CLI output: screenshots or rendered previews
