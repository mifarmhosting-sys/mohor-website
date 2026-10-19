# How to Backup Your Conversations and Assistant Data

If you are configuring or resetting your machine, follow these steps to backup and restore your conversation history, artifacts, and settings.

## 1. Full Backup (Recommended)
The simplest and most complete way to back up all conversations, files, and settings is to copy the entire `.gemini` folder from your user directory.

* **Source Path:** `C:\Users\Admin\.gemini`
* **Action:** Copy this entire `.gemini` folder to an external drive, USB stick, or cloud storage.
* **Restoration:** Once your machine is reconfigured and you have reinstalled the environment, copy the `.gemini` folder back to `C:\Users\Admin\.gemini`.

---

## 2. Backup Specific Conversations
If you only want to save the history of specific conversations, you can locate their individual directories.

* **Conversations Path:** `C:\Users\Admin\.gemini\antigravity\brain\`
* **Inside this folder**, you will see subfolders named after each unique Conversation ID (UUID).
* **For this current conversation:** The ID is `e66a4584-ed2e-4223-8934-381943e3685f`.
  * **Raw Transcript (JSON Lines format):** 
    `C:\Users\Admin\.gemini\antigravity\brain\e66a4584-ed2e-4223-8934-381943e3685f\.system_generated\logs\transcript.jsonl`
  * **Generated Artifacts:** 
    `C:\Users\Admin\.gemini\antigravity\brain\e66a4584-ed2e-4223-8934-381943e3685f\artifacts\`
