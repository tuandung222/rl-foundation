#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
TEXT_EXTENSIONS = {".md", ".py", ".ts", ".tsx", ".json", ".yml", ".yaml", ".css"}
IGNORED_PARTS = {"node_modules", "build", ".docusaurus", ".git", "huggingface-deep-rl-class"}
OLD_SECTION_TERMS = ("\u0043\u1ee5m", "\u0063\u1ee5m")
REFERENCE_ROOT = ROOT / "huggingface-deep-rl-class"
REFERENCE_TEXT_EXTENSIONS = {".md", ".mdx"}

REQUIRED_AGENT_SECTIONS = [
    "## 1. Project overview",
    "## 2. Repository map",
    "## 3. Curriculum-wide content standard",
    "## 4. Pedagogical writing style",
    "## 5. Math, diagrams, and examples",
    "## 6. Source material and attribution policy",
    "## 7. Public privacy and safety constraints",
    "## 8. Commands and verification",
    "## 9. Completion checklist",
    "## 10. Repo specialization: RL Foundation",
    "## 11. Maintenance notes for future agents",
]


def iter_text_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix not in TEXT_EXTENSIONS:
            continue
        if any(part in IGNORED_PARTS for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def check_readme_empty(errors: list[str]) -> None:
    readme = ROOT / "README.md"
    if not readme.exists():
        errors.append("README.md is missing")
        return
    if readme.stat().st_size != 0:
        errors.append(f"README.md must stay empty, got {readme.stat().st_size} bytes")


def check_privacy_controls(errors: list[str]) -> None:
    robots = ROOT / "static" / "robots.txt"
    if not robots.exists():
        errors.append("static/robots.txt is missing")
    elif read(robots).strip() != "User-agent: *\nDisallow: /":
        errors.append("static/robots.txt must disallow all crawling")
    config = read(ROOT / "docusaurus.config.ts")
    if "noindex,nofollow,noarchive,nosnippet" not in config:
        errors.append("docusaurus.config.ts is missing noindex robots metadata")
    if "sitemap: false" not in config:
        errors.append("docusaurus.config.ts must disable sitemap generation")


def check_source_hygiene(errors: list[str]) -> None:
    for path in iter_text_files():
        rel = path.relative_to(ROOT)
        if rel == Path("README.md"):
            continue
        text = read(path)
        if "\u2014" in text:
            errors.append(f"em dash found in {rel}")
        if any(term in text for term in OLD_SECTION_TERMS):
            errors.append(f"old section wording found in {rel}")
        if path.is_relative_to(DOCS) and re.search(r"README rỗng|STYLING_WRITING|private user instructions", text, re.I):
            errors.append(f"public/internal wording found in {rel}")


def normalize_reference_line(line: str) -> str:
    return re.sub(r"\s+", " ", line.strip())


def collect_reference_lines() -> set[str]:
    if not REFERENCE_ROOT.exists():
        return set()
    reference_lines: set[str] = set()
    for path in REFERENCE_ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in REFERENCE_TEXT_EXTENSIONS:
            continue
        for raw_line in read(path).splitlines():
            line = normalize_reference_line(raw_line)
            if len(line) < 120:
                continue
            if line.startswith(("---", "import ", "export ", "<", "![")):
                continue
            reference_lines.add(line)
    return reference_lines


def check_reference_copying(errors: list[str]) -> None:
    reference_lines = collect_reference_lines()
    if not reference_lines:
        return
    for path in DOCS.rglob("*.md"):
        for line_number, raw_line in enumerate(read(path).splitlines(), start=1):
            line = normalize_reference_line(raw_line)
            if len(line) >= 120 and line in reference_lines:
                errors.append(
                    f"possible copied reference line in {path.relative_to(ROOT)}:{line_number}"
                )


def check_agent_guide(errors: list[str]) -> None:
    agent = ROOT / "AGENT.md"
    if not agent.exists():
        errors.append("AGENT.md is missing")
        return
    text = read(agent)
    for section in REQUIRED_AGENT_SECTIONS:
        if section not in text:
            errors.append(f"AGENT.md missing required section: {section}")
    required_phrases = [
        "README.md` must remain empty",
        "Do not copy paragraphs from the reference",
        "Public chapters must be original Vietnamese teaching material",
        "noindex,nofollow,noarchive,nosnippet",
        "sitemap",
        "npm run verify",
    ]
    for phrase in required_phrases:
        if phrase not in text:
            errors.append(f"AGENT.md missing required guidance phrase: {phrase}")


def check_sidebar_doc_ids(errors: list[str]) -> None:
    sidebars = read(ROOT / "sidebars.ts")
    ids: list[str] = []
    for block in re.findall(r"items:\s*\[(.*?)\]", sidebars, re.S):
        ids.extend(re.findall(r"'([^']+)'", block))
    for doc_id in ids:
        candidates = [DOCS / f"{doc_id}.md", DOCS / doc_id / "index.md"]
        if not any(candidate.exists() for candidate in candidates):
            errors.append(f"sidebar doc id does not exist: {doc_id}")


def check_absolute_doc_links(errors: list[str]) -> None:
    for path in DOCS.rglob("*.md"):
        text = read(path)
        for match in re.finditer(r"\]\((/docs/[^)#]+)", text):
            doc_id = match.group(1).replace("/docs/", "")
            candidates = [DOCS / f"{doc_id}.md", DOCS / doc_id / "index.md"]
            if not any(candidate.exists() for candidate in candidates):
                errors.append(f"broken absolute docs link in {path.relative_to(ROOT)}: {doc_id}")


def main() -> int:
    errors: list[str] = []
    check_readme_empty(errors)
    check_privacy_controls(errors)
    check_source_hygiene(errors)
    check_reference_copying(errors)
    check_agent_guide(errors)
    check_sidebar_doc_ids(errors)
    check_absolute_doc_links(errors)

    doc_files = list(DOCS.rglob("*.md"))
    total_words = sum(len(read(path).split()) for path in doc_files)
    print(f"Docs: {len(doc_files)} markdown files, {total_words} words")
    print(f"README bytes: {(ROOT / 'README.md').stat().st_size}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("QA passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
