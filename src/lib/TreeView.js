import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Minus from './assets/minus.svg';
import Plus from './assets/plus.svg';
import './TreeView.css';

class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.collapsed ? 'auto' : 0,
            visibility: this.props.collapsed ? 'visible' : 'hidden',
            opacity: this.props.collapsed ? 1 : 0,
            view: null,
            data: this.props.data,
        }
    }

    render() {
        return this.state.view;
    }

    componentWillMount() {
        this.iterate(this.state.data, 0);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
        this.iterate(nextProps.data, 0);
    }

    collapseHandler = (e, data) => {
        let visible = this.findAncestor(e.target, 'collapse-info').style.visibility;
        if (visible === 'visible') {
            this.hideCollapse(e, data);
        } else {
            this.showCollapse(e, data);
        }
    }

    showCollapse = (e, data) => {
        let el = e.target.parentNode.nextSibling;

        el.style.display = '';
        el.style.visibility = 'visible';
        el.style.opacity = 1;
        el.style.height = 'auto';

        var item = this.findNode(data.id, this.state.data);
        item.icon = Minus;
        this.iterate(this.state.data, 0);
        this.setState(this.state.data);
    }

    hideCollapse = (e, data) => {
        let el = e.target.parentNode.nextSibling;

        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = 0;
        el.style.height = 0;

        var item = this.findNode(data.id, this.state.data);
        item.icon = Plus;
        this.iterate(this.state.data, 0);
        this.setState(this.state);
    }

    iterate = (current, depth) => {
        let obj = this.state;
        let childNodes = current.childNodes;
        let tree = '';
        obj.view = {};

        if (!current.hasOwnProperty('childNodes') && depth === 0) return;

        if (current.hasOwnProperty('childNodes')) {
            let nodes = [];
            let count = 0;
            for (var key in childNodes) {
                let expandable = childNodes[key].hasOwnProperty('childNodes');
                if (expandable) this.iterate(childNodes[key], depth + 1);
                let item = childNodes[key];
                nodes.push(
                    <div key={count++}>
                        {expandable ? <div>{obj.view}</div> : <div><div className="lastChild"> {item.value}</div></div>}
                    </div>
                );
            }
            tree = (
                <div className="collapse-info" style={{ display: this.props.collapsed ? '' : 'none', visibility: this.state.visibility, opacity: this.state.opacity, height: this.state.height }}>
                    {nodes}
                </div>
            )
        }

        let body = '';
        for (var index in current) {
            if (index === 'childNodes') continue;

            if (!current.hasOwnProperty('icon')) {
                current.icon = this.props.collapsed ? Minus : Plus;
            }

            if (current.hasOwnProperty('childNodes')) {
                body = (
                    <div>
                        <div className="collapse-button" onClick={(e) => this.collapseHandler(e, current)} style={{ cursor: 'pointer' }}>
                            <div className="lastChild">
                                <span className="collapse-caret"><img src={current.icon} alt=""/></span>{current.value}
                            </div>
                        </div>
                        {tree}
                    </div>
                );
            }

        }

        obj.view = body;
    }

    findAncestor = (el, cls) => {
        while ((el.parentElement.nextSibling) && (el = el.parentElement.nextSibling) && (el.classList) && !el.classList.contains(cls));
        return el;
    }

    findNode = (id, currentNode) => {
        var currentChild,
            result;
        // eslint-disable-next-line
        if (id == currentNode.id) {
            return currentNode;
        } else {
            if (!currentNode.hasOwnProperty('childNodes')) return false;

            for (var i = 0; i < currentNode.childNodes.length; i++) {

                currentChild = currentNode.childNodes[i];
                result = this.findNode(id, currentChild);

                if (result !== false) {
                    return result;
                }
            }

            return false;
        }
    }
}

TreeView.propTypes = {
    collapsed: PropTypes.bool,
    data: PropTypes.object.isRequired
};

export default TreeView;