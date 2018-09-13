var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Minus from './assets/minus.svg';
import Plus from './assets/plus.svg';
import './TreeView.css';

var TreeView = function (_Component) {
    _inherits(TreeView, _Component);

    function TreeView(props) {
        _classCallCheck(this, TreeView);

        var _this = _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).call(this, props));

        _this.collapseHandler = function (e, data) {
            var visible = _this.findAncestor(e.target, 'collapse-info').style.visibility;
            if (visible === 'visible') {
                _this.hideCollapse(e, data);
            } else {
                _this.showCollapse(e, data);
            }
        };

        _this.showCollapse = function (e, data) {
            var el = e.target.parentNode.nextSibling;

            el.style.display = '';
            el.style.visibility = 'visible';
            el.style.opacity = 1;
            el.style.height = 'auto';

            var item = _this.findNode(data.id, _this.state.data);
            item.icon = Minus;
            _this.iterate(_this.state.data, 0);
            _this.setState(_this.state.data);
        };

        _this.hideCollapse = function (e, data) {
            var el = e.target.parentNode.nextSibling;

            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = 0;
            el.style.height = 0;

            var item = _this.findNode(data.id, _this.state.data);
            item.icon = Plus;
            _this.iterate(_this.state.data, 0);
            _this.setState(_this.state);
        };

        _this.iterate = function (current, depth) {
            var obj = _this.state;
            var childNodes = current.childNodes;
            var tree = '';
            obj.view = {};

            if (!current.hasOwnProperty('childNodes') && depth === 0) return;

            if (current.hasOwnProperty('childNodes')) {
                var nodes = [];
                var count = 0;
                for (var key in childNodes) {
                    var expandable = childNodes[key].hasOwnProperty('childNodes');
                    if (expandable) _this.iterate(childNodes[key], depth + 1);
                    var item = childNodes[key];
                    nodes.push(React.createElement(
                        'div',
                        { key: count++ },
                        expandable ? React.createElement(
                            'div',
                            null,
                            obj.view
                        ) : React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'lastChild' },
                                ' ',
                                item.value
                            )
                        )
                    ));
                }
                tree = React.createElement(
                    'div',
                    { className: 'collapse-info', style: { display: _this.props.collapsed ? '' : 'none', visibility: _this.state.visibility, opacity: _this.state.opacity, height: _this.state.height } },
                    nodes
                );
            }

            var body = '';
            for (var index in current) {
                if (index === 'childNodes') continue;

                if (!current.hasOwnProperty('icon')) {
                    current.icon = _this.props.collapsed ? Minus : Plus;
                }

                if (current.hasOwnProperty('childNodes')) {
                    body = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'collapse-button', onClick: function onClick(e) {
                                    return _this.collapseHandler(e, current);
                                }, style: { cursor: 'pointer' } },
                            React.createElement(
                                'div',
                                { className: 'lastChild' },
                                React.createElement(
                                    'span',
                                    { className: 'collapse-caret' },
                                    React.createElement('img', { src: current.icon, alt: '' })
                                ),
                                current.value
                            )
                        ),
                        tree
                    );
                }
            }

            obj.view = body;
        };

        _this.findAncestor = function (el, cls) {
            while (el.parentElement.nextSibling && (el = el.parentElement.nextSibling) && el.classList && !el.classList.contains(cls)) {}
            return el;
        };

        _this.findNode = function (id, currentNode) {
            var currentChild, result;
            // eslint-disable-next-line
            if (id == currentNode.id) {
                return currentNode;
            } else {
                if (!currentNode.hasOwnProperty('childNodes')) return false;

                for (var i = 0; i < currentNode.childNodes.length; i++) {

                    currentChild = currentNode.childNodes[i];
                    result = _this.findNode(id, currentChild);

                    if (result !== false) {
                        return result;
                    }
                }

                return false;
            }
        };

        _this.state = {
            height: _this.props.collapsed ? 'auto' : 0,
            visibility: _this.props.collapsed ? 'visible' : 'hidden',
            opacity: _this.props.collapsed ? 1 : 0,
            view: null,
            data: _this.props.data
        };
        return _this;
    }

    _createClass(TreeView, [{
        key: 'render',
        value: function render() {
            return this.state.view;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.iterate(this.state.data, 0);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ data: nextProps.data });
            this.iterate(nextProps.data, 0);
        }
    }]);

    return TreeView;
}(Component);

TreeView.propTypes = {
    collapsed: PropTypes.bool,
    data: PropTypes.object.isRequired
};

export default TreeView;