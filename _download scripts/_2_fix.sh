#!/bin/bash

# a kép címek fixálása, a letöltött oldalról eltávolítjuk az eredeti url-t
# az avatárokat eltüntetem, mert úgysem tölt be
# hozzáadom az index.html-hez a bejegyzést, úgy, hogy lekérdem a címét a _2_title.py-vel

echo "<meta charset='iso-8559-2'>" > _index.html
echo "<h1>Bombagyar.hu blog - teljes archivum</h1>" >> _index.html

for i in {1..2674}
do
if ! grep -q -a "Nincs ilyen blogbejegyz" "$i.html"; then
	title=$(python3 _2_title.py $i.html)
	sed -i 's/\/\/c26i3k3ti76lh4kqkbb7uqmaakvejbxqb6o6fvsitswf3m2lfjrcndid\.onion\.pet\//\.\//g' $i.html
	sed -i 's/\/\/c26i3k3ti76lh4kqkbb7uqmaakvejbxqb6o6fvsitswf3m2lfjrcndid.onion.pet\//.\//g' $i.html
	echo "<style>.avatar{visibility:hidden;} img[attribute='Kommentálás joga']{ display: none;}</style>" >> $i.html
	echo "<a href='$i.html'>$title</a><br>" >> _index.html
fi
done
