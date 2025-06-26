#!/usr/bin/env python3
import sys
import struct
import json
import subprocess
import os

def read_message():
    raw_length = sys.stdin.buffer.read(4)
    if len(raw_length) == 0:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def send_message(message_content):
    encoded_content = json.dumps(message_content).encode('utf-8')
    sys.stdout.buffer.write(struct.pack('=I', len(encoded_content)))
    sys.stdout.buffer.write(encoded_content)
    sys.stdout.buffer.flush()

def find_profile_dir_by_name(target_name):
    chrome_dir = os.path.expanduser('~/Library/Application Support/Google/Chrome')
    for entry in os.listdir(chrome_dir):
        if entry.startswith('Profile') or entry == 'Default':
            pref_path = os.path.join(chrome_dir, entry, 'Preferences')
            if os.path.exists(pref_path):
                with open(pref_path, encoding='utf-8') as f:
                    try:
                        prefs = json.load(f)
                        if prefs.get('profile', {}).get('name') == target_name:
                            return entry
                    except Exception:
                        continue
    return None

def main():
    message = read_message()
    url = message.get('url')
    profile = message.get('profile', 'Profile 2')
    dir_name = find_profile_dir_by_name(profile)
    if dir_name:
        profile = dir_name
    if url:
        subprocess.Popen([
            'open', '-na', 'Google Chrome',
            '--args', f'--profile-directory={profile}', url
        ])
        send_message({'result': 'ok'})
    else:
        send_message({'result': 'error', 'reason': 'no url'})

if __name__ == '__main__':
    main()
