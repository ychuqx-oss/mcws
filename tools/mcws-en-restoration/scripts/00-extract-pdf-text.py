#!/usr/bin/env python3
"""Extract raw text from the two source PDFs.

This is a conservative extraction helper. It does not invent missing columns;
it only dumps page text so rows can be reviewed and converted into the
structured restored JSON used by later scripts.

Usage:
  python scripts/00-extract-pdf-text.py input1.pdf input2.pdf --out data/generated/pdf_text
"""
from __future__ import annotations

import argparse
from pathlib import Path


def extract_with_pypdf(path: Path) -> list[str]:
    try:
        from pypdf import PdfReader  # type: ignore
    except Exception as exc:  # pragma: no cover
        raise SystemExit("Install pypdf first: pip install pypdf") from exc
    reader = PdfReader(str(path))
    return [(page.extract_text() or "") for page in reader.pages]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdfs", nargs="+")
    parser.add_argument("--out", default="data/generated/pdf_text")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    for pdf in map(Path, args.pdfs):
        pages = extract_with_pypdf(pdf)
        for index, text in enumerate(pages, start=1):
            target = out_dir / f"{pdf.stem}.page-{index:03d}.txt"
            target.write_text(text, encoding="utf-8")
            print(f"wrote {target}")


if __name__ == "__main__":
    main()
