# Placeholder Image Generator
A simple node application to generate SVG or PNG images of a given dimension and colour to be used as placeholders.

### Running (on port 3456)
    node placeholders.js 3456

### Usage
A 400x100 SVG image with a red background.

```html
<img src="http://localhost:3456/400x100/FF0000"/>
```

A 200x50 PNG image with a light blue background.

```html
<img src="http://localhost:3456/200x50/CCDDFF.png"/>
```
