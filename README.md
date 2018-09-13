# React-treeview [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.1.0&x2=0)](https://www.npmjs.com/package/react-treeview)

Easy and light treeview component made with React

## install

Npm:
```sh
npm i react-treeview -S

# API

#### &lt;TreeView />
The component accepts [these props](https://github.com/chenglou/react-treeview/blob/f75fb4e2706f3e9087bcf371308e85154a1946da/src/react-treeview.jsx#L6-L12).

- `data`: content to show inside the treeview. (Required)
- `collapsed`: whether the tree is collapsed or not. (Optional)

## Data Example

```sh
{
    id: 0,
    value: 'Parent',
    childNodes: [{
        id: 1,
        value: 'A'
    },
    {
        value: 'B',
        id: 2,
        childNodes: [{
            id: 3,
            value: 'Ba'
        },
        {
            id: 4,
            value: 'Bb'
        }]
    }]
}

## License

MIT.