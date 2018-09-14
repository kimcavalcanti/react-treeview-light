# React-treeview [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.1.3&x2=0)](https://www.npmjs.com/package/react-treeview-light)

Easy and light treeview component made with React

## install

Npm:
```sh
npm i react-treeview-light -S
```

# API

#### &lt;TreeView />

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
```

## License

MIT.