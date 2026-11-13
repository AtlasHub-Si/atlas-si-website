#!/usr/bin/env python3
"""Copy exact owner-approved V0.7 website media into a safe versioned public staging path."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
from zipfile import ZipFile

EXPECTED_SHA="f23e9807bb7051d1dcaa23e7e20846390f9b223b68b5e090ab8827500fb1ef43"
ALLOW={"01_logo_approved", "02_favicons_web", "04_motion", "05_previews"}

def sha(data:bytes)->str:
    return hashlib.sha256(data).hexdigest()

def stage(zip_path:Path, root:Path, apply:bool)->int:
    if sha(zip_path.read_bytes()) != EXPECTED_SHA:raise ValueError("Unapproved ZIP")
    files=[]
    with ZipFile(zip_path) as z:
        manifest=json.loads(z.read("MANIFEST.json"))
        if manifest["approval"]!="DEV_APPROVED" or manifest["version"]!="0.7.0":
            raise ValueError("Unexpected approval/pack version")
        for entry in manifest["files"]:
            relative=PurePosixPath(entry["path"])
            if relative.is_absolute() or ".." in relative.parts or relative.parts[0] not in ALLOW:
                continue
            info=z.getinfo(entry["path"])
            raw=z.read(info)
            if len(raw)!=entry["bytes"] or sha(raw)!=entry["sha256"]:
                raise ValueError("Asset hash mismatch: "+entry["path"])
            dst=root/"public"/"brand"/"atlasbot"/"v0.7"/Path(*relative.parts)
            if dst.is_symlink() or dst.exists() and sha(dst.read_bytes())!=entry["sha256"]:
                raise FileExistsError("Existing staged asset differs: "+str(dst))
            files.append((dst,raw))
    if apply:
        for dst,raw in files:
            dst.parent.mkdir(parents=True,exist_ok=True)
            if not dst.exists():dst.write_bytes(raw)
    return len(files)

if __name__=="__main__":
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--archive",type=Path,required=True)
    ap.add_argument("--repo",type=Path,default=Path.cwd())
    ap.add_argument("--apply",action="store_true")
    ns=ap.parse_args()
    print(f'{"STAGED" if ns.apply else "VERIFIED"} {stage(ns.archive,ns.repo,ns.apply)} website files')
