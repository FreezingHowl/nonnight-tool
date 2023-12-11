module.exports = {
    // 环境配置
    env: {
        // 启用浏览器全局变量。
        browser: true,
        // 启用ES6的功能。
        es6: true,
        // Node.js全局变量和Node.js范围。
        node: true,
        // vue3 script中写setup的语法
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/essential',// 基本的校验
        'standard' // 初始化配置中选择的代码风格
    ],
    // 解析器选项
    parserOptions: {
        // ES的版本 默认是latest 但是我们只需要到es6即可
        ecmaVersion: 6,
        // 指定源代码存在的类型，script或者module，默认为script。
        sourceType: 'module',
        // ESLint使用Espree解析器
        parser: 'babel-eslint',
    },
    plugins: [
        'vue'
    ],
    // 可以自己配置一些规则
    rules: {
        // 正式环境不允许出现 console
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 正式环境不允许出现 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 下面是为了兼容vue3 关闭了一些校验规则
        'vue/no-v-model-argument': 'off',
        'vue/no-mutating-props': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off'
    }
}
