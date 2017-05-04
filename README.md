# react-input

# 简介
1. 只依赖 react/react-dom
2. 样式使用 css 编写, 兼容所有iphone5以上及所有Android常见浏览器

# 功能点
1. input框样式
2. 获取焦点时文本输入
3. 失去焦点得到input框里的值
4. 对输入信息进行规则验证（是否为空及自定义规则）
5. 点击删除符号删除input框里的值
6. 可控制报错信息显示的方式和位置
7. 动画效果：得到焦点时文本移到上边框上
8. 新增样式：右侧添加'发送验证码'／'button'等，根据自定义子组件方式传入
9. onChange/onFocus/onBlur/onDelete时可传入自定义方法
10. getValue() //获取input里的值
11. setValue() //设置input里的值


# 使用说明

1. 引入组件：
    import InputCom from './Components/InputCom';
2. 引入css：
    import '../styles/input.css';
3. js页面操作：

```js
export class App extends Component{
    //获取信息
    setInformation() {
          const isPhoneNoV = this.inputPhoneNo.getValue(), //获取input里的值
                isPhoneNoSetV = this.inputPhoneNo.setValue('123'), //设置input里的值为123
                isPhoneNo = this.inputPhoneNo.onBlur();
          if (!!(isPhoneNo)) {
          // 信息提交
                loginApp1(isPhoneNoV);
          }
     }

    ruler(numPhone) {
    // 示例：验证手机号
        const reg = /^1[34578]\d{9}$/;
        if (!reg.test(numPhone)) {
            return false;
        } else {
            return true;
        }
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
    
    onDeleteHandle() {
        console.log('onDelete')
    }

    render() {
        return (
            <InputCom
                length="11"
                InputText="手机号"
                InputAddAnimation //动画
                errorMsgNull="手机号不能为空！" //报错信息
                errorMsgFalse="输入手机号有误，请重新输入！" // 报错信息
                errorMsgSite="right-top" // 报错信息显示的位置
                ruler={this.ruler.bind(this)} // 输入信息应符合的规则
                NeedDeleteSymbol // 需要删除符号
                NeedWarningSymbol  // 需要警示符号
                onDeleteHandle={this.onDeleteHandle.bind(this)} // 点击删除符号时执行自定义的onDeleteHandle方法
                onChangeHandle={this.onChangeHandle.bind(this)} // onChange时执行自定义的onChangeHandle方法
                onFocusHandle={this.onFocusHandle.bind(this)}   // onFocus时执行自定义的onFocusHandle方法
                onBlurHandle={this.onBlurHandle.bind(this)}     // onBlur时执行自定义的onBlurHandle方法          
                valueText={name} // name 是reduce里面传过来的默认值
                ref={(input) => { this.inputPhoneNo = input; }} // this.inputPhoneNo.getValue():获取input里的值 
                                                                // this.inputPhoneNo.getValue(val):设置input里的值为val
                addVcode // 添加验证码／button/自定义
            >
                <Btn /> //自定义子组件
            </InputCom>
            <div className="btn" onTouchTap={::this.setInformation}>免费领取</div>

        );
    }
}
```

# 参数说明：
<table>
<tr><td>参数</td> <td>说明</td>	<td>默认值</td>	是否必须存在<td>备注</td></tr>
<tr><td>type</td>	<td>input框类型</td>	<td>text</td>	<td>是</td> <td>隐藏：不写</td></tr>
<tr><td>length</td>	<td>可输入字符长度</td>	<td>无</td>	<td>否</td> <td>隐藏：不写</td></tr>
<tr><td>InputText</td>	<td>input框默认显示字样</td>	<td>无</td>	<td>否</td> <td>不写：无默认字样</td></tr>
<tr><td>InputAddAnimation</td>	<td>添加动画：onFocus时文本显示在上边框上</td>	<td>无</td>	<td>否</td> <td>不写： 默认样式</td></tr>
<tr><td>errorMsgNull</td>	<td>输入信息为空时，显示的警告信息</td>	<td>手机号不能为空！</td> <td>否</td><td>隐藏：不写</td></tr>	
<tr><td>errorMsgFalse</td>	<td>输入信息不符合要求时，显示的警告信息</td>	<td>输入手机号有误，请重新输入！</td> <td>否</td> <td>隐藏：不写</td></tr>	
<tr><td>errorMsgSite</td>	<td>报错信息以会话框的样式呈现，并可以控制其位置</td>	<td>无</td> <td>否</td> <td>不写：以基本形式呈现报错信息</td></tr>	
<tr><td>NeedDeleteSymbol</td>	<td>信息输入或者修改时，点击删除符号，就会清空input里的值</td>	<td>无</td> <td>否</td> <td>不写：没有删除符号</td></tr>	
<tr><td>NeedWarningSymbol</td>	<td>输入信息不符合规则，报错时，弹出警告符号</td>	<td>无</td> <td>否</td> <td>不写：没有警告符号</td></tr>	
<tr><td>onDeleteHandle</td>	<td>点击删除符号时先执行默认方法再执行自定义方法</td>	<td>无</td> <td>否</td> <td>不写：只执行默认方法</td></tr>	
<tr><td>onChangeHandle</td>	<td>onChange时先执行默认方法再执行自定义方法</td>	<td>实时改变输入框里值</td> <td>否</td> <td>不写：onChenge时执行默认方法</td></tr>	
<tr><td>onFocusHandle</td>	<td>onFocus时执行先执行默认方法再自定义方法</td>	<td>获取焦点时可以改变输入框里的值</td> <td>否</td> <td>不写：onFocus时执行默认方法</td></tr>	
<tr><td>onBlurHandle</td>	<td>onBlur时执行先执行默认方法再自定义方法</td>	<td>失去焦点时显示输入框里的值</td> <td>否</td> <td>不写：onBlur时执行默认方法</td></tr>	
<tr><td>ruler</td>	<td>输入信息应附和的规则</td>	<td>function(text){}</td>	<td>是</td> <td>text 为input框里输入的文本，主要是自定义文本应符合的规则，return true/false;</td></tr>
<tr><td>ref</td>	<td>标记</td>	 <td>ref={(input) => { this.inputName = input; }</td>	<td>否</td> <td>用于拿到组件input框输入的值</td></tr>
<tr><td>addVcode</td>	<td>input框右边挤出一定的区域放子组件</td>	<td>无</td> <td>否</td> <td>不写：显示基本样式</td></tr>	
<tr><td>Btn</td>	<td>自定义子组件</td>	 <td>无</td>	<td>否</td> <td>自定义子组件，需要时要添加addVcode</td></tr>
</table>


# License
MIT
