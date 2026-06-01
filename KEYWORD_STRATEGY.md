# Keyword Strategy

## Allowed by Default

Low and Medium sensitivity keywords can be recommended for normal SEO usage when they support useful informational content.

Examples:

- 百家樂規則
- 百家樂新手教學
- 百家樂牌值計算
- 百家樂第三張牌規則
- 百家樂術語
- 責任娛樂
- 百家樂下注流程
- 莊閒和說明

## Manual Review Required

High sensitivity keywords require manual review and should not be placed automatically in titles, meta descriptions, H1 headings, or CTA copy.

Example:

- 百家樂勝率

## Restricted

Restricted terms must not be used for SEO generation or promotional copy.

Examples:

- 百家樂必勝法
- 博弈漏洞
- 包贏方法
- 平台漏洞
- 非法套利

## Update Process

1. Edit `src/content/keywords.js`.
2. Run `npm run build`.
3. Review `keyword-recommendations.md`.
4. Run `npm run validate`.

The GitHub Actions workflow repeats the same process on every push to `main` and on the weekly schedule.
