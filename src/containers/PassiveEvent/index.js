import './style.css'
import React, { Component } from 'react'
import block from 'block.js'
import detectPassiveEvents from 'detect-passive-events';

export default class PassiveEvent extends Component {
    constructor(args) {
        super(args)

        this.checkPassiveEvent()

        this.emptyListener = false
        this.delayListener = false
        this.passiveListener = false
        this.delay = 400
        this.passiveDelay = 400

        this.addEvent = this.addRemoveEvent.bind(this, 'addEventListener')
        this.removeEvent = this.addRemoveEvent.bind(this, 'removeEventListener')
    }

    checkPassiveEvent() {
        if (!detectPassiveEvents.hasSupport) {
            alert('您的浏览器不支持 passive event listeners，请使用 Chrome 51 或更高版本的浏览器')
        }
    }

    render() {
        const {delay, passiveDelay} = this

        return (
            <div className="PassiveEvent">
                <dl className="PassiveEvent__Panels">
                    <dt><h3>控制面板</h3></dt>
                    <dd className="PassiveEvent__Panel">
                        <input type="checkbox" onClick={e => this.toggleEvent('emptyListener')} />
                        注册空 touchstart, wheel 监听器
                    </dd>
                    <dd className="PassiveEvent__Panel">
                        <input type="checkbox" onClick={e => this.toggleEvent('delayListener')} />
                        注册指定延时的 touchstart, wheel 监听器
                        <br />
                        <input type="text" defaultValue={delay} onChange={this.changeDelay} />
                        ms 延迟
                    </dd>
                    <dd className="PassiveEvent__Panel">
                        <input type="checkbox" onClick={e => this.toggleEvent('passiveListener')} />
                        注册指定延时的 passive touchstart, wheel 监听器
                        <br />
                        <input type="text" defaultValue={passiveDelay} onChange={this.changePassiveDelay} />
                        ms 延迟
                    </dd>
                </dl>
                <dl className="PassiveEvent__Items">
                    <dt><h3>可滚动区域</h3></dt>
                    <dd className="PassiveEvent__Item">item001</dd>
                    <dd className="PassiveEvent__Item">item002</dd>
                    <dd className="PassiveEvent__Item">item003</dd>
                    <dd className="PassiveEvent__Item">item004</dd>
                    <dd className="PassiveEvent__Item">item005</dd>
                    <dd className="PassiveEvent__Item">item006</dd>
                    <dd className="PassiveEvent__Item">item007</dd>
                    <dd className="PassiveEvent__Item">item008</dd>
                    <dd className="PassiveEvent__Item">item009</dd>
                    <dd className="PassiveEvent__Item">item010</dd>
                    <dd className="PassiveEvent__Item">item011</dd>
                    <dd className="PassiveEvent__Item">item012</dd>
                    <dd className="PassiveEvent__Item">item013</dd>
                    <dd className="PassiveEvent__Item">item014</dd>
                    <dd className="PassiveEvent__Item">item015</dd>
                    <dd className="PassiveEvent__Item">item016</dd>
                    <dd className="PassiveEvent__Item">item017</dd>
                    <dd className="PassiveEvent__Item">item018</dd>
                    <dd className="PassiveEvent__Item">item019</dd>
                    <dd className="PassiveEvent__Item">item020</dd>
                    <dd className="PassiveEvent__Item">item021</dd>
                    <dd className="PassiveEvent__Item">item022</dd>
                    <dd className="PassiveEvent__Item">item023</dd>
                    <dd className="PassiveEvent__Item">item024</dd>
                    <dd className="PassiveEvent__Item">item025</dd>
                    <dd className="PassiveEvent__Item">item026</dd>
                    <dd className="PassiveEvent__Item">item027</dd>
                    <dd className="PassiveEvent__Item">item028</dd>
                    <dd className="PassiveEvent__Item">item029</dd>
                    <dd className="PassiveEvent__Item">item030</dd>
                    <dd className="PassiveEvent__Item">item031</dd>
                    <dd className="PassiveEvent__Item">item032</dd>
                    <dd className="PassiveEvent__Item">item033</dd>
                    <dd className="PassiveEvent__Item">item034</dd>
                    <dd className="PassiveEvent__Item">item035</dd>
                    <dd className="PassiveEvent__Item">item036</dd>
                    <dd className="PassiveEvent__Item">item037</dd>
                    <dd className="PassiveEvent__Item">item038</dd>
                    <dd className="PassiveEvent__Item">item039</dd>
                    <dd className="PassiveEvent__Item">item040</dd>
                    <dd className="PassiveEvent__Item">item041</dd>
                    <dd className="PassiveEvent__Item">item042</dd>
                    <dd className="PassiveEvent__Item">item043</dd>
                    <dd className="PassiveEvent__Item">item044</dd>
                    <dd className="PassiveEvent__Item">item045</dd>
                    <dd className="PassiveEvent__Item">item046</dd>
                    <dd className="PassiveEvent__Item">item047</dd>
                    <dd className="PassiveEvent__Item">item048</dd>
                    <dd className="PassiveEvent__Item">item049</dd>
                    <dd className="PassiveEvent__Item">item050</dd>
                    <dd className="PassiveEvent__Item">item051</dd>
                    <dd className="PassiveEvent__Item">item052</dd>
                    <dd className="PassiveEvent__Item">item053</dd>
                    <dd className="PassiveEvent__Item">item054</dd>
                    <dd className="PassiveEvent__Item">item055</dd>
                    <dd className="PassiveEvent__Item">item056</dd>
                    <dd className="PassiveEvent__Item">item057</dd>
                    <dd className="PassiveEvent__Item">item058</dd>
                    <dd className="PassiveEvent__Item">item059</dd>
                    <dd className="PassiveEvent__Item">item060</dd>
                    <dd className="PassiveEvent__Item">item061</dd>
                    <dd className="PassiveEvent__Item">item062</dd>
                    <dd className="PassiveEvent__Item">item063</dd>
                    <dd className="PassiveEvent__Item">item064</dd>
                    <dd className="PassiveEvent__Item">item065</dd>
                    <dd className="PassiveEvent__Item">item066</dd>
                    <dd className="PassiveEvent__Item">item067</dd>
                    <dd className="PassiveEvent__Item">item068</dd>
                    <dd className="PassiveEvent__Item">item069</dd>
                    <dd className="PassiveEvent__Item">item070</dd>
                    <dd className="PassiveEvent__Item">item071</dd>
                    <dd className="PassiveEvent__Item">item072</dd>
                    <dd className="PassiveEvent__Item">item073</dd>
                    <dd className="PassiveEvent__Item">item074</dd>
                    <dd className="PassiveEvent__Item">item075</dd>
                    <dd className="PassiveEvent__Item">item076</dd>
                    <dd className="PassiveEvent__Item">item077</dd>
                    <dd className="PassiveEvent__Item">item078</dd>
                    <dd className="PassiveEvent__Item">item079</dd>
                    <dd className="PassiveEvent__Item">item080</dd>
                    <dd className="PassiveEvent__Item">item081</dd>
                    <dd className="PassiveEvent__Item">item082</dd>
                    <dd className="PassiveEvent__Item">item083</dd>
                    <dd className="PassiveEvent__Item">item084</dd>
                    <dd className="PassiveEvent__Item">item085</dd>
                    <dd className="PassiveEvent__Item">item086</dd>
                    <dd className="PassiveEvent__Item">item087</dd>
                    <dd className="PassiveEvent__Item">item088</dd>
                    <dd className="PassiveEvent__Item">item089</dd>
                    <dd className="PassiveEvent__Item">item090</dd>
                    <dd className="PassiveEvent__Item">item091</dd>
                    <dd className="PassiveEvent__Item">item092</dd>
                    <dd className="PassiveEvent__Item">item093</dd>
                    <dd className="PassiveEvent__Item">item094</dd>
                    <dd className="PassiveEvent__Item">item095</dd>
                    <dd className="PassiveEvent__Item">item096</dd>
                    <dd className="PassiveEvent__Item">item097</dd>
                    <dd className="PassiveEvent__Item">item098</dd>
                    <dd className="PassiveEvent__Item">item099</dd>
                    <dd className="PassiveEvent__Item">item100</dd>
                    <dd className="PassiveEvent__Item">item101</dd>
                    <dd className="PassiveEvent__Item">item102</dd>
                    <dd className="PassiveEvent__Item">item103</dd>
                    <dd className="PassiveEvent__Item">item104</dd>
                    <dd className="PassiveEvent__Item">item105</dd>
                    <dd className="PassiveEvent__Item">item106</dd>
                    <dd className="PassiveEvent__Item">item107</dd>
                    <dd className="PassiveEvent__Item">item108</dd>
                    <dd className="PassiveEvent__Item">item109</dd>
                    <dd className="PassiveEvent__Item">item110</dd>
                    <dd className="PassiveEvent__Item">item111</dd>
                    <dd className="PassiveEvent__Item">item112</dd>
                    <dd className="PassiveEvent__Item">item113</dd>
                    <dd className="PassiveEvent__Item">item114</dd>
                    <dd className="PassiveEvent__Item">item115</dd>
                    <dd className="PassiveEvent__Item">item116</dd>
                    <dd className="PassiveEvent__Item">item117</dd>
                    <dd className="PassiveEvent__Item">item118</dd>
                    <dd className="PassiveEvent__Item">item119</dd>
                    <dd className="PassiveEvent__Item">item120</dd>
                    <dd className="PassiveEvent__Item">item121</dd>
                    <dd className="PassiveEvent__Item">item122</dd>
                    <dd className="PassiveEvent__Item">item123</dd>
                    <dd className="PassiveEvent__Item">item124</dd>
                    <dd className="PassiveEvent__Item">item125</dd>
                    <dd className="PassiveEvent__Item">item126</dd>
                    <dd className="PassiveEvent__Item">item127</dd>
                    <dd className="PassiveEvent__Item">item128</dd>
                    <dd className="PassiveEvent__Item">item129</dd>
                    <dd className="PassiveEvent__Item">item130</dd>
                    <dd className="PassiveEvent__Item">item131</dd>
                    <dd className="PassiveEvent__Item">item132</dd>
                    <dd className="PassiveEvent__Item">item133</dd>
                    <dd className="PassiveEvent__Item">item134</dd>
                    <dd className="PassiveEvent__Item">item135</dd>
                    <dd className="PassiveEvent__Item">item136</dd>
                    <dd className="PassiveEvent__Item">item137</dd>
                    <dd className="PassiveEvent__Item">item138</dd>
                    <dd className="PassiveEvent__Item">item139</dd>
                    <dd className="PassiveEvent__Item">item140</dd>
                    <dd className="PassiveEvent__Item">item141</dd>
                    <dd className="PassiveEvent__Item">item142</dd>
                    <dd className="PassiveEvent__Item">item143</dd>
                    <dd className="PassiveEvent__Item">item144</dd>
                    <dd className="PassiveEvent__Item">item145</dd>
                    <dd className="PassiveEvent__Item">item146</dd>
                    <dd className="PassiveEvent__Item">item147</dd>
                    <dd className="PassiveEvent__Item">item148</dd>
                    <dd className="PassiveEvent__Item">item149</dd>
                    <dd className="PassiveEvent__Item">item150</dd>
                    <dd className="PassiveEvent__Item">item151</dd>
                    <dd className="PassiveEvent__Item">item152</dd>
                    <dd className="PassiveEvent__Item">item153</dd>
                    <dd className="PassiveEvent__Item">item154</dd>
                    <dd className="PassiveEvent__Item">item155</dd>
                    <dd className="PassiveEvent__Item">item156</dd>
                    <dd className="PassiveEvent__Item">item157</dd>
                    <dd className="PassiveEvent__Item">item158</dd>
                    <dd className="PassiveEvent__Item">item159</dd>
                    <dd className="PassiveEvent__Item">item160</dd>
                    <dd className="PassiveEvent__Item">item161</dd>
                    <dd className="PassiveEvent__Item">item162</dd>
                    <dd className="PassiveEvent__Item">item163</dd>
                    <dd className="PassiveEvent__Item">item164</dd>
                    <dd className="PassiveEvent__Item">item165</dd>
                    <dd className="PassiveEvent__Item">item166</dd>
                    <dd className="PassiveEvent__Item">item167</dd>
                    <dd className="PassiveEvent__Item">item168</dd>
                    <dd className="PassiveEvent__Item">item169</dd>
                    <dd className="PassiveEvent__Item">item170</dd>
                    <dd className="PassiveEvent__Item">item171</dd>
                    <dd className="PassiveEvent__Item">item172</dd>
                    <dd className="PassiveEvent__Item">item173</dd>
                    <dd className="PassiveEvent__Item">item174</dd>
                    <dd className="PassiveEvent__Item">item175</dd>
                    <dd className="PassiveEvent__Item">item176</dd>
                    <dd className="PassiveEvent__Item">item177</dd>
                    <dd className="PassiveEvent__Item">item178</dd>
                    <dd className="PassiveEvent__Item">item179</dd>
                    <dd className="PassiveEvent__Item">item180</dd>
                    <dd className="PassiveEvent__Item">item181</dd>
                    <dd className="PassiveEvent__Item">item182</dd>
                    <dd className="PassiveEvent__Item">item183</dd>
                    <dd className="PassiveEvent__Item">item184</dd>
                    <dd className="PassiveEvent__Item">item185</dd>
                    <dd className="PassiveEvent__Item">item186</dd>
                    <dd className="PassiveEvent__Item">item187</dd>
                    <dd className="PassiveEvent__Item">item188</dd>
                    <dd className="PassiveEvent__Item">item189</dd>
                    <dd className="PassiveEvent__Item">item190</dd>
                    <dd className="PassiveEvent__Item">item191</dd>
                    <dd className="PassiveEvent__Item">item192</dd>
                    <dd className="PassiveEvent__Item">item193</dd>
                    <dd className="PassiveEvent__Item">item194</dd>
                    <dd className="PassiveEvent__Item">item195</dd>
                    <dd className="PassiveEvent__Item">item196</dd>
                    <dd className="PassiveEvent__Item">item197</dd>
                    <dd className="PassiveEvent__Item">item198</dd>
                    <dd className="PassiveEvent__Item">item199</dd>
                    <dd className="PassiveEvent__Item">item200</dd>
                </dl>
            </div>
        )
    }

    componentDidMount() {
        this.items = document.querySelector('.PassiveEvent__Items')
    }

    toggleEvent = (listenerType) => {
        if (this[listenerType]) {
            this.removeEvent(listenerType)
        }
        else {
            this.addEvent(listenerType)
        }
        this[listenerType] = !this.listenerType
    }

    addRemoveEvent(action, listenerType) {
        if (listenerType === 'emptyListener') {
            this.items[action]('touchstart', this.emptyHandler, false)
            this.items[action]('wheel', this.emptyHandler, false)
        }
        else if (listenerType === 'delayListener') {
            this.items[action]('touchstart', this.delayHanlder, false)
            this.items[action]('wheel', this.delayHanlder, false)
        }
        else if (listenerType === 'passiveListener') {
            this.items[action]('touchstart', this.passiveHanler, detectPassiveEvents.hasSupport ? {capture: false, passive: true} : false)
            this.items[action]('wheel', this.passiveHanler, detectPassiveEvents.hasSupport ? {capture: false, passive: true} : false)
        }
    }

    emptyHandler = e => {
        console.log(e.type)
    }

    delayHanlder = e => {
        console.time('delay')
        block(this.delay)
        console.timeEnd('delay')
    }

    passiveHanler = e => {
        console.time('passive delay')
        block(this.passiveDelay)
        console.timeEnd('passive delay')
    }

    changeDelay = e => {
        const target = e.target
        this.delay = target.value
    }

    changePassiveDelay = e => {
        const target = e.target
        this.passiveDelay = target.value
    }
}