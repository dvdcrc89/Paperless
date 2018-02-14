'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownContent = exports.DropdownTrigger = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownTrigger = require('./DropdownTrigger.js');

var _DropdownTrigger2 = _interopRequireDefault(_DropdownTrigger);

var _DropdownContent = require('./DropdownContent.js');

var _DropdownContent2 = _interopRequireDefault(_DropdownContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this._onWindowClick);
      window.addEventListener('touchstart', this._onWindowClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._onWindowClick);
      window.removeEventListener('touchstart', this._onWindowClick);
    }
  }]);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

    _this.state = {
      active: false
    };

    _this._onWindowClick = _this._onWindowClick.bind(_this);
    _this._onToggleClick = _this._onToggleClick.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'isActive',
    value: function isActive() {
      return typeof this.props.active === 'boolean' ? this.props.active : this.state.active;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      this.setState({
        active: false
      }, function () {
        if (_this2.props.onHide) {
          _this2.props.onHide();
        }
      });
    }
  }, {
    key: 'show',
    value: function show() {
      var _this3 = this;

      this.setState({
        active: true
      }, function () {
        if (_this3.props.onShow) {
          _this3.props.onShow();
        }
      });
    }
  }, {
    key: '_onWindowClick',
    value: function _onWindowClick(event) {
      var dropdownElement = (0, _reactDom.findDOMNode)(this);
      if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
        this.hide();
      }
    }
  }, {
    key: '_onToggleClick',
    value: function _onToggleClick(event) {
      event.preventDefault();
      if (this.isActive()) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this,
          _arguments = arguments;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var disabled = _props.disabled;
      var removeElement = _props.removeElement;
      // create component classes

      var active = this.isActive();
      var dropdownClasses = (0, _classnames2.default)({
        dropdown: true,
        'dropdown--active': active,
        'dropdown--disabled': disabled
      });
      // stick callback on trigger element
      var boundChildren = _react2.default.Children.map(children, function (child) {
        if (child.type === _DropdownTrigger2.default) {
          (function () {
            var originalOnClick = child.props.onClick;
            child = (0, _react.cloneElement)(child, {
              ref: 'trigger',
              onClick: function onClick(event) {
                if (!disabled) {
                  _this4._onToggleClick(event);
                  if (originalOnClick) {
                    originalOnClick.apply(child, _arguments);
                  }
                }
              }
            });
          })();
        } else if (child.type === _DropdownContent2.default && removeElement && !active) {
          child = null;
        }
        return child;
      });
      var cleanProps = _extends({}, this.props);
      delete cleanProps.active;
      delete cleanProps.onShow;
      delete cleanProps.onHide;
      delete cleanProps.removeElement;

      return _react2.default.createElement(
        'div',
        _extends({}, cleanProps, {
          className: dropdownClasses + ' ' + className }),
        boundChildren
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  onHide: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  removeElement: _propTypes2.default.bool,
  style: _propTypes2.default.object
};

Dropdown.defaultProps = {
  className: ''
};

exports.DropdownTrigger = _DropdownTrigger2.default;
exports.DropdownContent = _DropdownContent2.default;
exports.default = Dropdown;