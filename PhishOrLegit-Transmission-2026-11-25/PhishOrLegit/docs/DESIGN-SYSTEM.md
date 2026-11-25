# iOS interface foundations

## Design intent

The interface recreates the hierarchy, spacing, interaction patterns, and material logic of current iOS system apps without redistributing proprietary Apple assets or pretending that a web page is a native application. The primary reference is the official iOS 27 UI Kit and Apple Human Interface Guidelines.

Official references:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
- https://developer.apple.com/sf-symbols/

## Foundations

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

## Implemented components

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

## Desktop and mobile behavior

On a real mobile viewport, content uses the device screen directly. The application does not add a phone frame, fake status bar, or duplicate home indicator. On desktop, `DeviceCanvas` supplies a 402 × 874 development frame so the reference viewport can be reviewed consistently.

## Icon policy

The initial components use small project-owned SVG paths that represent common actions. They are not SF Symbols and must not be described as such. A production icon pass may use legally permitted exported symbols or equivalent project-owned artwork after licensing and distribution requirements are confirmed.

## Accessibility baseline

- 44 × 44 minimum hit areas.
- Visible keyboard focus.
- Semantic buttons, navigation, headings, and labels.
- Light and dark appearances.
- Increased contrast support.
- Reduced motion and reduced transparency support.
- Text layouts that can grow rather than clipping.
- Audio scenarios will require synchronized transcripts or captions.
- Drawing interactions will require a non-drawing alternative.
