# Placeholder Image Generator
A simple node application to generate SVG or PNG images of a given dimension and colour to be used as placeholders.

### Running (on port 3456)
    node placeholders.js 3456

### Usage

```
http://<domain>:<port>/<width>x<height>/<background-colour>/<text-colour>/<text>[.png]
```

#### Examples

A 400x100 SVG image with a red background.
```html
<img src="http://localhost:3456/400x100/FF0000"/>
```

A 200x50 PNG image with a light blue background.
```html
<img src="http://localhost:3456/200x50/CCDDFF.png"/>
```

A 200x30 PNG image with a green background displaying the text "Hello World" in magenta.
```html
<img src="http://localhost:3456/200x30/00FF00/FF00FF/Hello%20World.png"/>
```
