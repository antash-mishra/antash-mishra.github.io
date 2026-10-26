# Torchlight 0.1: a launcher for Linux that answers in under 5 ms

2026-10-22 by Antash Mishra. 4 min read. Tags: Release, C, Linux, Search, Performance.
Original: https://antash.dev/blog/torchlight-0-1

> Releasing Torchlight, a Spotlight-style launcher for Linux written in C: forgiving search over apps, settings and half a million files, a quiet daemon, and a popup that looks like teletext.

Torchlight 0.1Overview

[← antash.dev](https://antash.dev/)

# Torchlight 0.1

A launcher for Linux. Press a shortcut, type a few letters, and open any app, settings panel, file or folder. 95 of every 100 keystrokes are answered in under 5 milliseconds, even with half a million files indexed.

Released 14 October 2026Version 0.1.6Written in CUbuntu, Mint, Fedora, Arch and more

P100Torchlight5.1msMon 26 Oct 05:51/14

__Apps1

Terminal

~/workspace/torchlight

htop

New window

__Folders1

terminals~/Pictures

__Files2

terminal.c~/…/ui/gtk

terminal-notes.md~/…/torchlight/docs

**Terminal**__Application

AboutUse the command line

Windows2 open

Found byTerminalPrefix: the start of a word

Actions

__Switch to window

__New window

__**Enter** Open__**Ctrl Enter** Show in folder__**Ctrl C** Copy path__**Esc** Close

Try

This popup runs in your browser over a small sample home folder, using a simplified copy of Torchlight's matching rules. Type into it, use the arrow keys, or press Esc.

Torchlight is a Spotlight-style launcher I built for my Linux desktop. It forgives typos and abbreviations, lists the open windows of running apps, learns what you open, and keeps up with your files as they change. Only names and paths are indexed, never file contents.

All numbers below come from the project's benchmarks on one machine, a 6-core i7-8700K with 32 GB of memory.

## Under 5 ms a keystroke

One screen refresh at 60 Hz takes 16.7 ms. Torchlight's goal is 5 ms for 95 of every 100 keystrokes, with half a million paths in the index.

3.74msTo answer a keystroke at 500,000 entries95th percentile

0.11sFrom a new file on disk to a search result213,000 entries

0.14%Of one core while nothing happensabout 2 min of CPU a day

167MBMemory for 213,000 entriesabout 0.8 KB each

__95 of 100 keystrokes are faster__half are faster

50,000 entriessearch engine alone

0.46 ms_median 0.05 ms_

213,000 entriesreal daemon, through the socket

2.8 ms_median 0.74 ms_

500,000 entriessearch engine alone

3.74 ms_median 0.72 ms_

Time to answer one keystroke, with every test query typed one letter at a time. The big step under 5 ms came from moving search onto its own thread and scoring with [Frizbee](https://github.com/saghen/frizbee), a SIMD fuzzy matcher.

## One daemon does the work

The popup is only a window. A small daemon, `torchlightd`, keeps every name in memory, follows your files as they change, and answers each keystroke. Two paths run through it, and only the yellow one is something you wait for.

### __When you type a letter

1. **1**The popup sends the query to the daemon over a local socket. It never searches itself.
2. **2**A newer keystroke drops the older search, so you never wait on a stale one.
3. **3**The search reads only memory, never the disk or SQL. 95 of 100 answers return within 2.8 ms.

### __When a file changes

1. **1**inotify reports the folder that changed, and only that folder is rescanned.
2. **2**The persistence thread, the only writer, saves the change to catalog.db in one transaction.
3. **3**A new index version is built on the side and swapped in whole. The file is searchable about 0.11 s later.

Point at a step to find it on the map.

## Forgiving search

Four lookup tables find candidates, then only those are scored. Every word you type has to match the name or one of its folders, so finds `notes.md` inside a work folder.

PrefixprojectNotes.mdThe start of the name or of any word in it.

SubsequenceprojectNotes.mdLetters in order, with extra points at word starts.

TrigramprojectNotes.mdA piece from the middle, found through three-letter keys.

TypoREADME.mdOne wrong, missing, extra or swapped letter, even in an unfinished word.

Among similar matches, your own files come before SDKs, package caches and `node_modules`, and the things you open often rank higher. On my home folder, files from my own folders went from 29% to 45% of the top ten results for 50 everyday queries.

## Always current, quiet when idle

A change on disk rescans only its own folder and is searchable about a tenth of a second later. When nothing changes, almost nothing runs. The biggest wins:

Processor use while idle

8.7%0.14%

One check of every folder

3.97 s0.95 s

Disk traffic for that check

788 MB1 MB

100 changed files searchable (500k paths)

4 s0.11 s

Memory after a big change

434 MB191 MB

Each row is drawn to its own scale, with the old cost as the full outline.

## A look of its own

The design comes from teletext, the pages of news and scores that European TVs showed before the web: blocky letters, small colored squares, and a page number and clock in the top corner, which is why the popup shows P100. Torchlight sets that look on calm colors, in light and dark. This post uses the same fonts and colors; try the Light and Dark switch at the top.

![The real Torchlight popup for the query term: the Terminal app with one of its windows, two files and a folder, and a preview panel with the selected file's details and actions.](https://antash.dev/blog/torchlight/popup-dark.png)

The real popup on Linux Mint, in the dark palette.

## Install it

On Ubuntu 24.04, Linux Mint 22 or newer, or another Ubuntu-based system, download the `.deb` from the [latest release](https://github.com/antash-mishra/torchlight/releases/latest) and run the command below. New versions then arrive through your update manager.

`sudo apt install ./torchlight_*_amd64.deb`

On Fedora, Arch, openSUSE, Debian 13 or another distribution with GTK 4.14 or newer, download the `.tar.gz` from the same page instead. Its installer sets Torchlight up just for you, in `~/.local`, without root; to update, run a newer release’s installer.

`tar xf torchlight-*-linux-x86_64.tar.gz`

`./torchlight-*-linux-x86_64/install.sh`

Then bind `torchlight-gtk --toggle` to a shortcut such as Super+Space (the installer prints its full path), and you are done. [Desktop setup](https://github.com/antash-mishra/torchlight/blob/master/docs/desktop-setup.md) says where each desktop keeps its shortcuts. Open windows are listed on X11 and on GNOME, KDE Plasma, Cinnamon, COSMIC and the wlroots desktops under Wayland.

[Source on GitHub](https://github.com/antash-mishra/torchlight)[Latest release](https://github.com/antash-mishra/torchlight/releases/latest)

Set in Schibsted Grotesk and Bedstead.[Back to antash.dev](https://antash.dev/)