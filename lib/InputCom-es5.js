'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../input.css');

var _delete = require('../images/delete.png');

var _delete2 = _interopRequireDefault(_delete);

var _alert = require('../images/alert.png');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhuyilin on 16/12/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InputCom = function (_Component) {
    _inherits(InputCom, _Component);

    // 做验证，判断数据类型
    function InputCom(props) {
        _classCallCheck(this, InputCom);

        // state 本地数据只在当前页面有作用
        var _this = _possibleConstructorReturn(this, (InputCom.__proto__ || Object.getPrototypeOf(InputCom)).call(this, props));

        var maxLength = props.maxLength;

        _this.state = {
            isFocus: false,
            valueText: props.valueText || '',
            isDelete: false,
            isError: false,
            PromptText: ''
        };
        // this.onChange = this.onChange.bind(this);
        _this.getValue = _this.getValue.bind(_this);
        _this.setValue = _this.setValue.bind(_this);

        return _this;
    }
    // 数据初始化


    _createClass(InputCom, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var valueText = nextProps.valueText;
            if (valueText && valueText !== this.state.valueText) {
                // this.setState({ isFocus: false, valueText });
                this.state.isFocus = false;
                this.state.valueText = valueText;
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ isFocus: true, isDelete: false });
            this.props.onFocusHandle && this.props.onFocusHandle();
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            var val1 = this.state.valueText;
            var PromptText = this.state.PromptText;
            var flag = false;
            if (!this.props.ruler) {
                this.setState({
                    isFocus: false,
                    isError: false,
                    PromptText: ''
                });
                flag = true;
            } else if (!!val1) {
                // val1 存在
                if (this.props.ruler(val1) === false) {
                    // val1 false
                    this.setState({
                        isFocus: false,
                        isError: true,
                        PromptText: this.props.errorMsgFalse || ''
                    });
                    flag = false;
                } else if (this.props.ruler(val1)) {
                    // val1 true
                    this.setState({
                        isFocus: false,
                        isError: false,
                        PromptText: ''
                    });
                    flag = true;
                }
            } else {
                // val1 不存在
                this.setState({
                    isFocus: false,
                    isError: true,
                    PromptText: this.props.errorMsgNull || ''
                });
                flag = false;
            }

            this.props.onBlurHandle && this.props.onBlurHandle();
            return flag;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.valueText;
        }
    }, {
        key: 'setValue',
        value: function setValue(val) {
            this.setState({
                valueText: val
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var length = this._input.maxLength;
            var text = length ? e.target.value.slice(0, length) : e.target.value;
            this.setState({
                valueText: text,
                isError: false,
                PromptText: ''
            });
            //this.props.onChangeHandle && this.props.onChangeHandle();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                inputText = _props.inputText,
                length = _props.length,
                inputAddAnimation = _props.inputAddAnimation,
                needDeleteSymbol = _props.needDeleteSymbol,
                needWarningSymbol = _props.needWarningSymbol,
                errorMsgSite = _props.errorMsgSite,
                addVcode = _props.addVcode,
                onDeleteHandle = _props.onDeleteHandle,
                type = _props.type;


            var animate = inputAddAnimation && (this.state.isFocus || this.state.valueText) ? 'myfirst 0.5s forwards' : 'myfirst1 0.1s forwards';
            var animation = {},
                WebkitAnimation = {},
                MozAnimation = {},
                OAnimation = {};
            animation = WebkitAnimation = MozAnimation = OAnimation = animate;
            var PromptTextStyle = '',
                addDisplayClass = '';

            if (errorMsgSite) {
                if (addVcode) {
                    PromptTextStyle = 'PromptText-' + errorMsgSite + '-code';
                } else {
                    PromptTextStyle = 'PromptText-' + errorMsgSite;
                }
            } else {
                PromptTextStyle = "PromptText";
            }
            if (this.state.isError === true) {
                addDisplayClass = PromptTextStyle + ' showDisplay';
            } else {
                addDisplayClass = PromptTextStyle + ' closeDisplay';
            }
            return _react2.default.createElement(
                'div',
                { className: 'ComInput' },
                _react2.default.createElement('input', {
                    type: type || "text",
                    maxLength: length,
                    onFocus: this.onFocus.bind(this),
                    onBlur: this.onBlur.bind(this),
                    onChange: this.onChange.bind(this),
                    value: this.state.valueText,
                    ref: function ref(input) {
                        _this2._input = input;
                    },
                    style: { border: this.state.isError ? '1px solid #e60012' : this.state.isFocus ? '1px solid #4A90E2' : '1px solid #ccc' }
                }),
                _react2.default.createElement(
                    'span',
                    {
                        className: 'InputText',
                        onTouchStart: this.onFocus.bind(this),
                        style: { animation: animation, WebkitAnimation: WebkitAnimation, MozAnimation: MozAnimation, OAnimation: OAnimation }
                    },
                    inputAddAnimation ? inputText : this.state.isFocus ? '' : this.state.valueText ? '' : inputText
                ),
                _react2.default.createElement(
                    'p',
                    { ref: 'PromptTextPlace', className: addDisplayClass },
                    this.state.PromptText
                ),
                needDeleteSymbol && this.state.isFocus && _react2.default.createElement('img', { className: addVcode ? "vcode-img-right" : "errorImg", src: _delete2.default, alt: 'delete', onTouchEnd: function onTouchEnd() {
                        _this2.setState({
                            valueText: '',
                            isDelete: true
                        });
                        onDeleteHandle && onDeleteHandle();
                    } }),
                needWarningSymbol && this.state.isError && _react2.default.createElement('img', { className: addVcode ? "vcode-img-right" : "errorImg", src: _alert2.default, alt: 'error' }),
                addVcode && _react2.default.createElement(
                    'div',
                    { className: 'fastClick-right' },
                    this.props.children
                )
            );
        }
    }]);

    return InputCom;
}(_react.Component);

InputCom.PropTypes = {
    inputText: _react.PropTypes.string, // placeholder
    errorMsgNull: _react.PropTypes.string,
    errorMsgFalse: _react.PropTypes.string,
    length: _react.PropTypes.number,
    errorMsgSite: _react.PropTypes.string,
    clickVCode: _react.PropTypes.func
};
InputCom.defaultProps = {
    inputText: '',
    errorMsgNull: '',
    errorMsgFalse: '',
    length: '',
    errorMsgSite: ''
};
exports.default = InputCom;
