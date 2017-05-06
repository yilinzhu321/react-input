/**
 * Created by zhuyilin on 16/12/7.
 * @description
 */
import React, { Component, PropTypes } from 'react';
import './input.css'
import InputCom from './es6/InputCom.js'

class Index extends Component {
    // 做验证，判断数据类型
    static PropTypes = {
    };
    // 数据初始化
    static defaultProps = {
    };

    constructor(props) {
        super(props);
        // state 本地数据只在当前页面有作用
        this.state = {
        };
    }

    ruler(numPhone) {
        const reg = /^1[34578]\d{9}$/;
        if (!reg.test(numPhone)) {
            return false;
        } else {
            return true;
        }
    }

    clickEvent() {
        alert("正在发送验证码");
    }

    onChangeHandle() {
        console.log("正在修改输入值");
    }

    onFocusHandle() {
        console.log('onFocusHandle')
    }

    onBlurHandle() {
        console.log('onBlur')
    }

    render() {
        return (
            <section>
                <InputCom
                    length="11"
                    InputText="手机号"
                    errorMsgNull="手机号不能为空！" //报错信息
                    errorMsgFalse="输入手机号有误，请重新输入！" // 报错信息
                    errorMsgSite="right-top" // 报错信息显示的位置
                    ruler={this.ruler.bind(this)} // 输入信息应符合的规则
                    InputAddAnimation // 动画效果
                    NeedDeleteSymbol // 需要删除符号
                    NeedAlertSymbol  // 需要警示符号
                    VCodeText="发送验证码" // 需要验证码，文本可自定义
                    clickVCode={this.clickEvent.bind(this)} // 点击发送验证码要执行的方法
                    onChangeHandle={this.onChangeHandle.bind(this)} // onChange时执行自定义的onChangeHandle方法
                    onFocusHandle={this.onFocusHandle.bind(this)}   // onFocus时执行自定义的onFocusHandle方法
                    onBlurHandle={this.onBlurHandle.bind(this)}     // onBlur时执行自定义的onBlurHandle方法
                    valueText={name}
                    ref={(input) => { this.inputName = input; }}
                />
            </section>
        );
    }
}
export default Index;
