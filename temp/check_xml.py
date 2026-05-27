import xml.etree.ElementTree as ET

path = "template.xml"
try:
    ET.parse(path)
    print("OK")
except ET.ParseError as e:
    print(e)
