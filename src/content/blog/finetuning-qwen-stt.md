# How I Improved Hindi STT for My Voicebot (Short Note)

## Why I did this

I am building a voicebot with open-source speech-to-text.

The base model latency was already very good for real-time use (around **250 ms**), but quality was not good enough. So the goal was simple: keep speed, improve transcription quality.

## Why I chose PEFT (LoRA)

Full fine-tuning was possible in the original codebase, but not practical for larger runs on my hardware:
- **24 GB VRAM**
- **64 GB RAM**

Also, full fine-tuning is usually more data-hungry. I did not have enough compute + large high-quality data to do that at scale.

So I used parameter-efficient (PEFT) / preferential fine-tuning (LoRA-style) to get the best quality-to-compute tradeoff.

## What data preparation I did

I kept data preparation simple and practical:
- Used the [IndicVoices](https://huggingface.co/datasets/ai4bharat/IndicVoices) dataset as the primary source and built a modified ~5-hour training set.
- Used cleaner transcript text whenever available.
- Filtered unusable samples (bad text, weak language quality, problematic durations).
- Standardized audio format for training consistency.
- Kept evaluation on a fixed Hindi benchmark set (4,740 samples) so every run was comparable.

I also tested extra data strategies:
- Expanded to ~10 hours of training data.
- Tried balancing with more short utterances.

These extra data strategies did not improve final WER over the best 5-hour setup.

## What I changed

The key jump came from proper fine-tuning settings:
- LoRA rank `r=64`
- LoRA alpha `128`
- LoRA dropout `0.1`
- Learning rate `1e-4`
- 3 epochs

This moved the model from a weak baseline to a much better Hindi ASR system.

## Short journey

1. Base model gave **31.17% WER**.
2. Optimized LoRA fine-tuning on ~5 hours brought it to **24.75% WER**.
3. Re-evaluation with a stricter/reproducible pipeline gave **24.67% WER** (best verified).
4. I tested more ideas (more data, short-utterance balancing, decoding constraints, lower learning-rate sweeps), but none beat 24.67%.

## Other methods I tried (and what I learned)

- **Punctuation-added transcripts (GPT-based preprocessing):** I trained a model with punctuated text, but it performed worse (**28.67% WER**). So punctuation insertion was not a useful training boost here.
- **QLoRA + cleaned/augmented data:** This also regressed (**28.38% WER**), so memory-efficient quantized training was not enough by itself for better quality.
- **More data (5hr -> 10hr):** I expected improvement, but results were slightly worse (**24.85%-24.99% WER**) than the 5hr best.
- **Short-utterance balancing:** I increased short samples to help voicebot-style inputs, but short-audio errors still increased overall.
- **Decode-only constraints:** Short prompts and length caps did not improve final benchmark WER.

Main takeaway from these experiments: stable 5hr LoRA tuning with strong hyperparameters worked better than adding complexity.

## Benchmark vs other STT systems

All numbers below are on the same Hindi benchmark set (4,740 samples).

| System | WER | CER |
|---|---:|---:|
| Sarvam Saaras v3 | **17.12%** | 8.82% |
| **My best fine-tuned open-source model (Qwen 0.6B + LoRA)** | **24.67%** | 12.43% |
| Azure Speech | 29.22% | 20.06% |
| Qwen3-ASR-0.6B Base | 31.17% | 18.57% |
| Whisper Large v3 | 44.58% | 28.73% |
| Whisper Medium | 113.53% | 101.59% |

## Final takeaway

For my voicebot use case, the best balance so far is:
- low latency from the base architecture
- big quality gain from targeted LoRA fine-tuning
- final verified score: **24.67% WER**
