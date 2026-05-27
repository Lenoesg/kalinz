from pathlib import Path

path = Path("template.xml")
start = 4105
end = 4135

lines = path.read_text(encoding="utf-8").splitlines()
for i in range(start, min(end, len(lines)) + 1):
    print(f"{i}: {lines[i-1]}")
