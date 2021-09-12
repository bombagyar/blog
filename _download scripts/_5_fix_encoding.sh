#!/bin/bash

# iso-8559-2 encodingrol utf-8-ra vált illetve fixálja hogy csak a bejegyzés képei legyenek lecserélve hiány esetén

for i in {1..2674}
do
echo $i
iconv -f iso-8859-2 -t utf8 $i.html | sed "s/iso-8859-2/utf-8/g" | sed "s/naturalWidth == 0/naturalWidth==0 \&\& images\[i\].src.toString\(\).includes\(\'resources\/pictures\'\) /" > $i.htm; rm $i.html; mv $i.htm $i.html
done
