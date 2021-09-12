#!/bin/bash

# ez a gabucino.hu által üzemeltetett tor bombagyár mirror, innét lett letöltve az oldal.

# végigloopolás a bejegyzéseken
for i in  {1..2674}
do
  curl "http://c26i3k3ti76lh4kqkbb7uqmaakvejbxqb6o6fvsitswf3m2lfjrcndid.onion.pet/index.php?post="$i > $i.html
done
