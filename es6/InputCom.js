/**
 * Created by zhuyilin on 16/12/7.
 * @description
 */

import React, { Component, PropTypes } from 'react';
import '../input.css';
import deleteImg from '../images/delete.png';
import errorImg from '../images/alert.png';

class InputCom extends Component {
    // 做验证，判断数据类型
    static PropTypes= {
        inputText: PropTypes.string, // placeholder
        errorMsgNull: PropTypes.string,
        errorMsgFalse: PropTypes.string,
        length: PropTypes.number,
        errorMsgSite: PropTypes.string,
        clickVCode: PropTypes.func,
    };
    // 数据初始化
    static defaultProps = {
        inputText: '',
        errorMsgNull: '',
        errorMsgFalse: '',
        length: '',
        errorMsgSite: '',
    };

    constructor(props) {
        super(props);
        // state 本地数据只在当前页面有作用
        const { maxLength } = props
        this.state = {
            isFocus: false,
            valueText: props.valueText || '',
            isDelete: false,
            isError: false,
            PromptText: '',
        };
        // this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const valueText =  nextProps.valueText;
        if (valueText && valueText !== this.state.valueText) {
            // this.setState({ isFocus: false, valueText });
            this.state.isFocus = false;
            this.state.valueText = valueText;
        }

    }
    onFocus() {
        this.setState({isFocus: true, isDelete: false});
        this.props.onFocusHandle && this.props.onFocusHandle();

    }

    onBlur() {
        const val1 = this.state.valueText;
        const PromptText = this.state.PromptText;
        let flag = false;
        if(!this.props.ruler) {
            this.setState({
                isFocus: false,
                isError: false,
                PromptText: '',
            });
            flag = true;
        } else if (!!val1) {
            // val1 存在
            if (this.props.ruler(val1) === false ) {
                // val1 false
                this.setState({
                    isFocus: false,
                    isError: true,
                    PromptText: this.props.errorMsgFalse || '',
                });
                flag = false;
            } else if (this.props.ruler(val1)) {
                // val1 true
                this.setState({
                    isFocus: false,
                    isError: false,
                    PromptText: '',
                });
                flag = true;
            }
        } else {
            // val1 不存在
            this.setState({
                isFocus: false,
                isError: true,
                PromptText: this.props.errorMsgNull || '',
            });
            flag = false;
        }

        this.props.onBlurHandle && this.props.onBlurHandle();
        return flag;
    }

    getValue() {
        return this.state.valueText;
    }

    setValue(val) {
        this.setState({
            valueText: val,
        });
    }

    onChange(e) {
        const length = this._input.maxLength;
        const text = length ? e.target.value.slice(0,length) :e.target.value;
        this.setState({
            valueText: text,
            isError: false,
            PromptText: ''
        });
        //this.props.onChangeHandle && this.props.onChangeHandle();

    }


    render() {
        const {
            inputText,
            length,
            inputAddAnimation,
            needDeleteSymbol,
            needWarningSymbol,
            errorMsgSite,
            addVcode,
            onDeleteHandle,
            type,
            } = this.props;

        const animate = (inputAddAnimation && (this.state.isFocus || this.state.valueText)) ? 'myfirst 0.5s forwards' : 'myfirst1 0.1s forwards';
        let animation = {},
            WebkitAnimation = {},
            MozAnimation = {},
            OAnimation = {};
        animation = WebkitAnimation = MozAnimation = OAnimation = animate;
        let PromptTextStyle = '', addDisplayClass = '';

        if (errorMsgSite) {
            if (addVcode) {
                PromptTextStyle = `PromptText-${errorMsgSite}-code`;
            } else {
                PromptTextStyle = `PromptText-${errorMsgSite}`;
            }
        } else {
            PromptTextStyle = "PromptText";
        }
        if (this.state.isError === true) {
            addDisplayClass = `${PromptTextStyle} showDisplay`;
        } else {
            addDisplayClass = `${PromptTextStyle} closeDisplay`;
        }
        return (
            <div className="ComInput">
                <input
                    type={type || "text"}
                    maxLength={length}
                    onFocus={::this.onFocus}
                    onBlur={::this.onBlur}
                    onChange={::this.onChange}
                    value={this.state.valueText}
                    ref={(input) => { this._input = input;}}
                    style={{ border: this.state.isError ? '1px solid #e60012' : this.state.isFocus ? '1px solid #4A90E2' : '1px solid #ccc' }}
                />
                <span
                    className="InputText"
                    onTouchStart={::this.onFocus}
                    style={{ animation, WebkitAnimation, MozAnimation, OAnimation }}
                >
                    { inputAddAnimation ? inputText : (this.state.isFocus ? '' : this.state.valueText ? '' : inputText )}
                </span>

                <p ref="PromptTextPlace" className={addDisplayClass}>{this.state.PromptText}</p>

                { needDeleteSymbol && this.state.isFocus &&
                <img className={ addVcode ? "vcode-img-right": "errorImg"} src={deleteImg} alt="delete" onTouchEnd={() => {
                        this.setState({
                            valueText: '',
                            isDelete: true,
                        });
                        onDeleteHandle && onDeleteHandle();
                    }}/>
                }

                {needWarningSymbol && this.state.isError &&
                <img className={ addVcode ? "vcode-img-right": "errorImg"} src={errorImg} alt="error"/>
                }

                {addVcode && <div className="fastClick-right">{this.props.children}</div>}
            </div>
        );
    }
}
export default InputCom;
