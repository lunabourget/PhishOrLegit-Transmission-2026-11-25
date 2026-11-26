# Interface design system

## Game companion surfaces

The home, `/scan`, and `/link` experiences use a restrained board-game visual system: a charcoal background, one flat card surface, square corners, and color accents taken from the physical game's difficulty and verdict conventions. They use the `--game-*` tokens in `src/styles/tokens.css`; difficulty colors are separate from PHISH and LEGIT colors.

`BoardHomeScreen` assembles the original logo, a short game introduction, the real `CardScanner`, three accessible tutorial cards, and the training notice. `GameCardShell` provides the shared scenario header, difficulty or LINK accent, return-to-home action, and single content surface. Message, clue, and result states remain regular HTML and preserve the existing game rules. `GameAudioPlayer` provides custom controls for local recordings, with duration metadata and a readable transcript fallback.

`public/board-style/icons/` supplies the small, decorative home and training-notice icons. The scenario and result copy is not embedded in images. The scanner, manual card-code entry, and safe LINK actions remain functional and use their existing routing and rule data.

## System-style component foundations

System-style utility components and the `/dev` workshop retain their existing visual treatment. They use project-owned SVG icon paths and semantic system color tokens; they do not bundle proprietary Apple assets or represent the web app as a native application.

Official references:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
- https://developer.apple.com/sf-symbols/

### Foundations

### Color

Semantic CSS variables represent system backgrounds, labels, separators, fills, tint, feedback colors, and physical-card difficulty colors. Light and dark values are separate. Color never carries the only copy of essential information.

### Typography

The web application uses the native system stack beginning with `-apple-system`. The default body size is 17 CSS pixels, matching the iOS reading baseline. Regular, medium, semibold, and bold weights are preferred. Apple font files are not bundled.

### Spacing and geometry

Spacing uses a four-pixel base. Interactive targets are at least 44 × 44 CSS pixels. Corners distinguish content containers, floating navigation controls, and capsules. Safe-area environment variables are applied at viewport edges.

### Materials

Liquid Glass is represented as a functional layer for floating navigation and controls. It combines translucency, backdrop blur, saturation, a subtle border, and restrained depth. Content surfaces use standard opaque system backgrounds. Reduced-transparency preferences replace blur with an opaque surface.

The iOS 27 pass follows Apple's revised Liquid Glass treatment: stronger diffusion behind controls, a darker lower edge, a brighter specular highlight, and hardware-informed curvature. Navigation bars remain visually transparent; only their actionable items use the glass material. Message, email, transcript, and result content stays on standard system materials rather than becoming glass.

### Motion

Motion is short and physical. Buttons compress slightly on press. Selection movement uses a restrained spring. `prefers-reduced-motion` removes nonessential animation.

### System-style components

- `NavigationBar`
- `GlassButton`
- `IconButton`
- `SegmentedControl`
- `SystemList` and `SystemListRow`
- `TabBar`
- `SystemIcon`
- `DeviceCanvas`
- `ConversationPreview`

All components expose semantic labels and focus states. The `/dev` route presents their normal, selected, disabled, destructive, light, and dark states.

### Game components

- `BoardHomeScreen`
- `GameCardShell`
- `ScanReviewPanel`
- `GameAudioPlayer`
- `CardScanner`

The scanner action uses the same component and QR resolver as before. LINK buttons remain equally weighted before selection, and scenario verdicts appear only after the player has voted.

### Desktop and mobile behavior

On a real mobile viewport, content uses the device screen directly. The application does not add a phone frame, fake status bar, or duplicate home indicator. On desktop, `DeviceCanvas` supplies a 402 × 874 development frame so the reference viewport can be reviewed consistently.

### Icon policy

The initial components use small project-owned SVG paths that represent common actions. They are not SF Symbols and must not be described as such. A production icon pass may use legally permitted exported symbols or equivalent project-owned artwork after licensing and distribution requirements are confirmed.

### Accessibility baseline

- 44 × 44 minimum hit areas.
- Visible keyboard focus.
- Semantic buttons, navigation, headings, and labels.
- Light and dark appearances.
- Increased contrast support.
- Reduced motion and reduced transparency support.
- Text layouts that can grow rather than clipping.
- Voice scenarios provide a readable transcript alongside custom playback controls.
- Game tutorials use native modal dialogs with close controls, Escape handling, and focus return.
