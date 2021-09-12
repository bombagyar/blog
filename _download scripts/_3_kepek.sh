#!/bin/bash

# kiszedi az összes bombagyár bejegyzésből az összes képcímet
# ezeket külön töltöttem le, aza script nincs meg

for i in {1..2674}
do
cat $i.html | grep -Eo "resources/[a-zA-Z0-9./?=_%:-]*" | sort -u >> images.txt
done
