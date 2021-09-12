#!/bin/bash

# minden bgy bejegyzés aljára rakja az extra.txt-ben lévő javascriptet
# script: ha nem tölt be az adott kép, akkor megváltoztatja az src-jét a /resources/pictures/-re
# mert abba dumpoltam az összes képet és így akkor betölt

for i in {1..2674}
do
cat extra.txt >> $i.html
done
