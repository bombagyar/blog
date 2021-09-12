# lekéri egy bgy bejegyzés címét mivel nincs title tag, egy megfelelő helyről bányássza ki a kódból
# magic.

import sys

f = open(sys.argv[1],"r", errors="surrogateescape")

for line in f:
    if "postheader" in line:
        data = line.split("postheader")
        data = data[4].split(">")
        data = data[1].split("<")
        data = data[0].split(".")
        print(data[0],end=" - ")

f.seek(0)

for line in f:
    if "document.title" in line:
        data = line.split("document.title=\"")
        data = data[1].split("\"")
        title = (data[0].split(":: "))[1]
        print(title)
