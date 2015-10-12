#!/bin/bash

cp /mnt/Buffer/Books/gitbook/* . -rf
gitbook build
cp ./_book/* ~/Documents/BlogSite/OnceMore2020/books/ -rf
cd ~/Documents/BlogSite/OnceMore2020/
git add --all
git commit -m"update notes"
git push origin gitcafe-pages
cd ~/Documents/BookNotes/
