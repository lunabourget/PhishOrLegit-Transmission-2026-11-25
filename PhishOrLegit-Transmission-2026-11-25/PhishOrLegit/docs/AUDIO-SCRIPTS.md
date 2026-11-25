# ElevenLabs voice scripts

## Delivery specification

- Export format: MP3.
- Recommended encoding: 44.1 or 48 kHz, mono, 128 kbps or higher.
- Do not add music, sound effects, spoken card IDs, or silence longer than one second.
- Keep the exact English meaning and all security clues.
- Use fictional voices only. Do not clone or imitate a real person.
- Normalize the six files to a similar perceived volume.

Deliver the files with these exact lowercase names under `public/audio/`.

## G-S3 - fake delivery call

Filename: `g-s3.mp3`

Voice direction: Neutral automated service voice. Clear international English, calm pace, slightly impersonal. Do not sound comic or obviously suspicious.

```text
Hello, this is ParcelGo. Your parcel could not be delivered. Press one and give your card number to pay the two-euro fee.
```

## G-S5 - legitimate school call

Filename: `g-s5.mp3`

Voice direction: Warm adult voice. Clear international English, natural pace, informative and relaxed. No urgency.

```text
Hello, this is the front desk of your school. A parcel arrived for you. You can pick it up at reception until six p.m. No need to call back.
```

## O-S5 - fake bank call

Filename: `o-s5.mp3`

Voice direction: Professional adult voice. Clear international English, controlled urgency, reassuring but persuasive. Do not make the scam obvious.

```text
Hello, this is Mark from the NovaBank fraud team. We blocked a suspicious payment. To cancel it, please tell me the code you just received by SMS.
```

## O-S6 - legitimate school IT call

Filename: `o-s6.mp3`

Voice direction: Calm adult technical-support voice. Clear international English, natural pace, factual and reassuring. No urgency.

```text
Hello, this is the school IT desk. The Wi-Fi will be unavailable from six to seven p.m. No action is needed.
```

## R-S1 - fake manager call

Filename: `r-s1.mp3`

Voice direction: Confident adult corporate voice. Slight travel background feeling, hurried but believable. The voice must be wholly fictional and must not imitate a real person.

```text
It's your manager. I'm boarding a plane. I need you to make an urgent transfer of nine thousand eight hundred euros to a new supplier. I'll email the details. Don't tell anyone.
```

## R-S2 - legitimate HR call

Filename: `r-s2.mp3`

Voice direction: Friendly adult corporate voice. Clear international English, natural pace, calm and helpful. No pressure or sales tone.

```text
Hi, it's Sarah from Brightwave HR. Just a reminder: your onboarding training is tomorrow at ten a.m. in room B two. If you can't come, tell your manager. Have a nice day!
```

## Integration contract

The application will load the files from these stable URLs:

```text
/audio/g-s3.mp3
/audio/g-s5.mp3
/audio/o-s5.mp3
/audio/o-s6.mp3
/audio/r-s1.mp3
/audio/r-s2.mp3
```

The written transcripts remain available in the interface as an accessible alternative to audio.
