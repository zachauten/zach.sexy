#!/bin/bash

DOC=$1
TITLE=$(cat $DOC.md | sed -n -e 's/^title: //p')
# parse out date
SUMMARY=$(sed '5q;d' $DOC.md)
DATE=$(date -u +"%Y-%m-%d")
echo $DATE_ISO
DATE_PRETTY=$(date -u +"%d %b %Y")

sed '/<\/article>/ a\
   <article>\
      <div class="title">\
        <h1><a href="/blog/'"$DOC"'.html">'"$TITLE"'<\/a><\/h1>\
        <p>'"$SUMMARY"'<\/p>\
        <time datetime='"$DATE"'>'"$DATE_PRETTY"'<\/time>\
        <span class="tags"><\/span>\
      <\/div>\
   <\/article>\
' ./index.html > ./new_index.html

pandoc -s -c /style.css --template template.html $DOC.md > blog/$DOC.html
